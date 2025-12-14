import React, { useContext, createContext, useEffect, useState } from 'react';
import { useAddress, useMetamask, useSigner } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

// Contract ABI (simplified - includes only the functions we need)
const CONTRACT_ABI = [
  'function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256)',
  'function donateToCampaign(uint256 _id) public payable',
  'function getCampaigns() public view returns (tuple(address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations)[])',
  'function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory)',
];

const CONTRACT_ADDRESS = '0x044D10256de654FE5F0267F8Afe52aAfBBDbbAf8';

export const StateContextProvider = ({ children }) => {
  const address = useAddress();
  const connect = useMetamask();
  const signer = useSigner();
  const [contract, setContract] = useState(null);
  const [contractReady, setContractReady] = useState(false);

  // Initialize contract once signer is available
  useEffect(() => {
    if (signer && address) {
      try {
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(contractInstance);
        setContractReady(true);
        console.log('✅ Contract initialized with ethers.js:', CONTRACT_ADDRESS);
      } catch (error) {
        console.error('❌ Failed to initialize contract:', error);
        setContractReady(false);
      }
    } else {
      console.log('⏳ Waiting for signer and address...');
      setContractReady(false);
    }
  }, [signer, address]);

  // Publish Campaign
  const publishCampaign = async (form) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized. Please ensure wallet is connected.');
      }

      if (!address) {
        throw new Error('Please connect your wallet first');
      }

      // Convert target from ETH to Wei
      const targetInWei = ethers.utils.parseEther(form.target);
      const deadline = new Date(form.deadline).getTime();

      console.log('🚀 Creating campaign with:', {
        owner: address,
        title: form.title,
        description: form.description,
        target: targetInWei.toString(),
        deadline,
        image: form.image,
      });

      // Call contract function
      const tx = await contract.createCampaign(
        address,
        form.title,
        form.description,
        targetInWei,
        deadline,
        form.image
      );

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log('✅ Campaign created successfully. Tx:', receipt.transactionHash);
      return receipt;
    } catch (error) {
      console.error('❌ Campaign creation failed:', error);
      throw error;
    }
  };

  // Get all campaigns
  const getCampaigns = async () => {
    try {
      if (!contract) {
        console.warn('Contract not ready for getCampaigns');
        return [];
      }

      const campaigns = await contract.getCampaigns();

      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i,
      }));

      return parsedCampaigns;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return [];
    }
  };

  // Get user's campaigns
  const getUserCampaigns = async () => {
    try {
      if (!address) {
        console.warn('User not connected');
        return [];
      }

      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner.toLowerCase() === address.toLowerCase()
      );

      return filteredCampaigns;
    } catch (error) {
      console.error('Error fetching user campaigns:', error);
      return [];
    }
  };

  // Donate to campaign
  const donate = async (pId, amount) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      if (!address) {
        throw new Error('Please connect your wallet');
      }

      const amountInWei = ethers.utils.parseEther(amount);

      console.log('💰 Donating to campaign:', { pId, amount: amountInWei.toString() });

      const tx = await contract.donateToCampaign(pId, { value: amountInWei });
      const receipt = await tx.wait();

      console.log('✅ Donation successful. Tx:', receipt.transactionHash);
      return receipt;
    } catch (error) {
      console.error('❌ Donation failed:', error);
      throw error;
    }
  };

  // Get donations for a campaign
  const getDonations = async (pId) => {
    try {
      if (!contract) {
        console.warn('Contract not ready for getDonations');
        return [];
      }

      const [donators, donations] = await contract.getDonators(pId);

      const parsedDonations = donators.map((donator, i) => ({
        donator,
        donation: ethers.utils.formatEther(donations[i].toString()),
      }));

      return parsedDonations;
    } catch (error) {
      console.error('Error fetching donations:', error);
      return [];
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        contractReady,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);