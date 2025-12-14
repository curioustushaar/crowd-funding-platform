# Crowd-Funding Platform

A full-stack Web3 decentralized crowdfunding application (dApp) built with React, Solidity, and thirdweb. Create campaigns, donate to projects, and manage funds directly on the blockchain using smart contracts.

## Overview

This project is a learning-focused dApp that demonstrates blockchain integration, smart contract deployment, and Web3 wallet connectivity. Users can create fundraising campaigns, donate to existing campaigns, and view campaign details—all powered by Ethereum smart contracts on the Sepolia testnet.

**Perfect for:** Portfolio building, Web3 learning, understanding dApp architecture, and smart contract interaction.

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library with functional components and hooks
- **Vite** - Lightning-fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework for responsive design
- **PostCSS** - CSS transformation and optimization

### Web3 & Blockchain
- **thirdweb SDK** - Simplified smart contract interaction and wallet management
- **ethers.js** - Ethereum library for contract calls and transactions
- **Solidity** - Smart contract language (0.8.0+)
- **Hardhat** - Development framework for Ethereum smart contracts

### Network & Wallet
- **Sepolia Testnet** - Ethereum test network for development
- **MetaMask** - Web3 wallet for transaction signing and account management

---

## ✨ Features

- **Create Campaigns** - Launch new fundraising campaigns with title, description, target amount, and deadline
- **Browse Campaigns** - View all active campaigns in a responsive grid layout
- **Campaign Details** - See detailed information about individual campaigns including raised amount and donor count
- **Donate to Campaigns** - Contribute ETH directly to projects you believe in
- **User Profile** - View your created campaigns and donation history
- **Wallet Integration** - Connect MetaMask to interact with smart contracts
- **Real-time Updates** - View current campaign balances and transaction status

---

## 📁 Folder Structure

```
crowd-funding-platform/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DisplayCampaigns.jsx
│   │   │   ├── FundCard.jsx
│   │   │   ├── CustomButton.jsx
│   │   │   └── ...
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── CreateCampaign.jsx
│   │   │   ├── CampaignDetails.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/                 # State management (Web3 context)
│   │   ├── constants/               # App constants
│   │   ├── utils/                   # Helper functions
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   ├── package.json
│   └── index.html                   # HTML template
│
├── web3/                            # Smart contracts & deployment
│   ├── contracts/
│   │   └── CrowdFunding.sol         # Main smart contract
│   ├── artifacts/                   # Compiled contract ABIs
│   ├── hardhat.config.js            # Hardhat configuration
│   ├── deploy.js                    # Deployment script
│   └── package.json
│
└── README.md                         # This file
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MetaMask Extension** - [Install](https://metamask.io/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/curioustushaar/crowd-funding-platform.git
cd crowd-funding-platform
```

### Step 2: Install Frontend Dependencies

```bash
cd client
npm install
# or
yarn install
```

### Step 3: Install Web3 Dependencies

```bash
cd ../web3
npm install
# or
yarn install
```

---

## 🌍 Environment Variables

Create a `.env` file in both `client/` and `web3/` directories with the following structure:

### `client/.env.example`
```env
# Thirdweb SDK Configuration
VITE_TEMPLATE_CLIENT_ID=your_thirdweb_client_id
VITE_CONTRACT_ADDRESS=0x...your_deployed_contract_address
VITE_NETWORK_ID=11155111  # Sepolia testnet chain ID

# Optional: RPC Provider (for ethers.js)
VITE_INFURA_KEY=your_infura_api_key
```

### `web3/.env.example`
```env
# Hardhat Network Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_infura_api_key
DEPLOYER_PRIVATE_KEY=0x...your_private_key  # ⚠️ Never commit this!

# Thirdweb Configuration (optional)
THIRDWEB_API_KEY=your_thirdweb_api_key
```

**⚠️ Security:** Never commit `.env` files. They contain sensitive information like private keys.

---

## ▶️ Running the Project Locally

### Start the Development Server

```bash
# From the client directory
cd client
npm run dev
# or
yarn dev
```

The application will start at `http://localhost:5173/` (Vite default).

### Hot Module Replacement
Vite supports HMR, so changes to React components will reflect instantly without page refresh.

### Access the Application
1. Open your browser to `http://localhost:5173/`
2. Connect your MetaMask wallet
3. Ensure you're on the **Sepolia testnet**
4. Get test ETH from a Sepolia faucet (see section below)
5. Start creating or donating to campaigns!

---

## 🔗 Smart Contract & Network Information

### Sepolia Testnet Details
- **Chain ID:** 11155111
- **RPC URL:** `https://sepolia.infura.io/v3/{INFURA_KEY}`
- **Block Explorer:** [Sepolia Etherscan](https://sepolia.etherscan.io/)

### CrowdFunding Smart Contract
Located in `web3/contracts/CrowdFunding.sol`

**Key Functions:**
- `createCampaign()` - Create a new fundraising campaign
- `donateToCampaign()` - Donate ETH to a campaign
- `getCampaigns()` - Fetch all campaigns
- `getCampaignDonators()` - Get list of donors for a campaign

### Get Test ETH
Before deploying or testing, get free Sepolia test ETH from these faucets:
- [Sepolia Faucet by Infura](https://www.infura.io/faucet/sepolia)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [QuickNode Faucet](https://faucet.quicknode.com/ethereum/sepolia)

### Deploying the Contract
```bash
cd web3
npx hardhat run deploy.js --network sepolia
```

This will deploy the contract and output the contract address to use in your `.env` file.

---

## 🔧 Common Issues & Troubleshooting

### Issue 1: MetaMask Wallet Not Connected
**Problem:** "Please connect your wallet" message appears.

**Solution:**
1. Click the MetaMask extension icon
2. Ensure you're logged in
3. Click "Connect" when the site requests permission
4. Refresh the page

### Issue 2: Wrong Network Selected
**Problem:** You see an error about being on the wrong network.

**Solution:**
1. Open MetaMask
2. Click the network dropdown (top of MetaMask popup)
3. Select "Sepolia test network"
4. If not visible, enable "Show test networks" in MetaMask settings

### Issue 3: Insufficient Balance
**Problem:** Transaction fails with "insufficient funds" error.

**Solution:**
1. Get test ETH from a Sepolia faucet (links above)
2. Wait a few minutes for the transaction to confirm
3. Refresh your MetaMask to see the new balance

### Issue 4: Contract Address Not Set
**Problem:** Campaign creation fails with undefined contract error.

**Solution:**
1. Deploy the smart contract: `npx hardhat run deploy.js --network sepolia`
2. Copy the contract address from the console output
3. Add it to `client/.env` as `VITE_CONTRACT_ADDRESS`
4. Restart the development server

### Issue 5: CORS or Network Errors
**Problem:** Frontend can't communicate with blockchain.

**Solution:**
1. Verify your `.env` RPC URLs are correct
2. Check that your Infura/QuickNode API key is valid
3. Restart the development server after updating `.env`

---

## 📚 Learning Resources

- **Web3 Basics:** [Ethereum.org Docs](https://ethereum.org/en/developers/)
- **Solidity:** [Solidity Documentation](https://docs.soliditylang.org/)
- **Hardhat:** [Hardhat Docs](https://hardhat.org/docs)
- **ethers.js:** [ethers.js Docs](https://docs.ethers.org/)
- **Thirdweb:** [Thirdweb Docs](https://docs.thirdweb.com/)

---

## 📝 License

This project is open source and available under the MIT License. See LICENSE.md for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs by opening an issue
- Submit pull requests with improvements
- Share feedback and suggestions

---

## 👤 Author

**Tushar Kumar**
- GitHub: [@curioustushaar](https://github.com/curioustushaar)
- Project Repository: [crowd-funding-platform](https://github.com/curioustushaar/crowd-funding-platform)

---

## 🎓 Disclaimer

This is a **learning project** designed for educational purposes. While the smart contract is functional, always audit contracts before mainnet deployment and never use real funds with unaudited contracts.

---

**Happy building! 🚀 If you found this helpful, consider giving it a star ⭐**
