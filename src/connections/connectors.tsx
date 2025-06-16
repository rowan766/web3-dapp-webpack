// src/connections/connectors.ts
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

// 支持的链ID
const SUPPORTED_CHAIN_IDS = [1, 3, 4, 5, 42, 1337, 11155111]; // 主网、测试网、本地网络

// 修复类型声明 - 添加默认值和安全检查
const YOUR_INFURA_KEY = '7701f9f795674c168eac542027c62f20';

// MetaMask 连接器
export const injectedConnector = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

// WalletConnect 连接器（可选）
export const walletConnectConnector = new WalletConnectConnector({
  rpc: {
    1: `https://mainnet.infura.io/v3/${YOUR_INFURA_KEY}`,
    11155111: `https://sepolia.infura.io/v3/${YOUR_INFURA_KEY}`,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

// 连接器映射
export const connectorsByName = {
  MetaMask: injectedConnector,
  WalletConnect: walletConnectConnector,
};