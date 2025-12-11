<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DnIJWZmE1D2eUrszVlk_QpghbsNBGH2N

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` and set the `GEMINI_API_KEY` to your Gemini API key
3. Run the app:
   `npm run dev`

## User Manual

To interact with this application, you will need a Web3 wallet and some testnet ETH.

1. **Install MetaMask**:
   - Download and install the [MetaMask](https://metamask.io/) browser extension.
   - Create a new wallet or import an existing one.

2. **Switch to Sepolia Testnet**:
   - Open MetaMask and click on the network dropdown at the top left.
   - Enable "Show test networks" in settings if you don't see Sepolia.
   - Select **Sepolia** from the list of networks.

3. **Get Testnet ETH**:
   - You need Sepolia ETH to pay for gas fees.
   - Visit the [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).
   - Enter your wallet address and request funds.

4. **Interact with the App**:
   - Connect your wallet using the "Connect MetaMask" button in the top right.
   - Create posts, comment, or report content. All actions are recorded on the blockchain!
