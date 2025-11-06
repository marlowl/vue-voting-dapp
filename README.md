# Vue Voting dApp - Modernized

<p align="center">
  <img src="https://github.com/marlowl/vue-truffle-starter-dapp/blob/master/logo.PNG">
</p>

A modern, decentralized voting application built with Vue 3, TypeScript, and Ethereum blockchain technology.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, responsive design with dark mode support
- ⚡ **Vue 3 + Composition API** - Latest Vue.js features for better performance and developer experience
- 🎯 **TypeScript** - Full type safety throughout the application
- 🎨 **Tailwind CSS** - Utility-first styling with custom design system
- 🔐 **Web3 Integration** - Seamless MetaMask wallet connection with ethers.js
- 📦 **Pinia State Management** - Modern, intuitive state management
- ⚡ **Vite** - Lightning-fast development and build tooling
- 🔔 **Toast Notifications** - Real-time feedback for user actions
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Technology Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - Vue state management
- **Vue Router 4** - Official router for Vue 3

### Blockchain
- **Ethereum** - Decentralized blockchain platform
- **Solidity** - Smart contract programming language
- **ethers.js** - Ethereum wallet implementation
- **Truffle** - Development framework for Ethereum
- **MetaMask** - Crypto wallet browser extension

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask browser extension
- Infura account (for deploying contracts)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marlowl/vue-voting-dapp/
   cd vue-voting-dapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the contract address if needed:
   ```env
   VITE_CONTRACT_ADDRESS=0x9828F99985a337c41fE3Ef1B72932365d3EA4e58
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔧 Smart Contract Development

### Prerequisites for Contract Deployment

1. **Install Truffle globally**
   ```bash
   npm install -g truffle
   ```

2. **Set up Infura**
   - Create an account at [Infura](https://infura.io/)
   - Create a new project
   - Copy your API key

3. **Configure deployment**

   Update `.env` with your credentials:
   ```env
   MNEMONIC=your-wallet-mnemonic-here
   INFURA_API_KEY=your-infura-api-key-here
   ```

### Compiling Contracts

```bash
truffle compile
```

### Deploying to Testnet

Deploy to Sepolia testnet (recommended):
```bash
truffle migrate --network sepolia
```

Or deploy to other networks as configured in `truffle-config.js`

### Using Your Own Contract

After deploying your contract:

1. Update the `.env` file with your contract address:
   ```env
   VITE_CONTRACT_ADDRESS=0xYourContractAddressHere
   ```

2. Restart the development server

## 📖 How to Use

1. **Install MetaMask**
   - Install the [MetaMask browser extension](https://metamask.io/)
   - Create or import a wallet
   - Switch to the network where the contract is deployed (e.g., Sepolia testnet)

2. **Get Test ETH**
   - For Sepolia: Use [Sepolia Faucet](https://sepoliafaucet.com/)
   - For other testnets: Search for "{network} faucet"

3. **Connect Your Wallet**
   - Click "Connect Wallet" in the app
   - Approve the connection in MetaMask

4. **Vote**
   - Select your preferred candidate
   - Click "Submit Vote"
   - Confirm the transaction in MetaMask
   - Wait for the transaction to be confirmed

## 🎨 Key Improvements from Original

### Architecture
- ✅ Migrated from Vue 2 to Vue 3 with Composition API
- ✅ Replaced class components with modern script setup syntax
- ✅ Replaced Vuex with Pinia for simpler state management
- ✅ Replaced Vue CLI with Vite for faster builds

### Web3 Integration
- ✅ Replaced Web3.js beta with stable ethers.js v6
- ✅ Proper wallet connection management with auto-reconnect
- ✅ Better error handling and user feedback
- ✅ Support for account and network changes

### UI/UX
- ✅ Complete redesign with Tailwind CSS
- ✅ Dark mode support with system preference detection
- ✅ Responsive design for all screen sizes
- ✅ Loading states and skeleton screens
- ✅ Toast notifications for user feedback
- ✅ Smooth animations and transitions

### Developer Experience
- ✅ Full TypeScript support with strict mode
- ✅ Composables for reusable logic
- ✅ Better project structure and organization
- ✅ Modern ESLint and Prettier configuration
- ✅ Improved build performance with Vite

## 📁 Project Structure

```
vue-voting-dapp/
├── contracts/          # Solidity smart contracts
├── src/
│   ├── assets/        # CSS and static assets
│   ├── components/    # Vue components
│   ├── composables/   # Reusable composition functions
│   ├── stores/        # Pinia stores
│   ├── types/         # TypeScript type definitions
│   ├── views/         # Page components
│   ├── App.vue        # Root component
│   ├── main.ts        # Application entry point
│   └── router.ts      # Vue Router configuration
├── public/            # Static files
└── build/             # Compiled contract artifacts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Original project by marlowl
- Built with Vue.js, Ethereum, and Truffle
- UI components inspired by modern web3 applications


