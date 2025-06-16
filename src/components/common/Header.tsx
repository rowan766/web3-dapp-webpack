import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Wallet, 
  Home, 
  FileText, 
  BookOpen, 
  Menu, 
  X, 
  Code, 
  ChevronDown,
  Copy,
  ExternalLink,
  LogOut,
  AlertCircle
} from 'lucide-react';

import { useWeb3React } from '@web3-react/core';
import { connectorsByName } from '@/connections/connectors';
import { ethers } from 'ethers';

interface WalletInfo {
  balance: string;
  shortAddress: string;
  networkName: string;
}

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    balance: '0',
    shortAddress: '',
    networkName: 'Unknown'
  });

  const { account, isActive, provider, chainId, deactivate } = useWeb3React();

  // 网络配置
  const networkNames: { [key: number]: string } = {
    1: 'Ethereum',
    3: 'Ropsten',
    4: 'Rinkeby',
    5: 'Goerli',
    42: 'Kovan',
    11155111: 'Sepolia',
    1337: 'Localhost'
  };

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/abis', label: 'ABIs', icon: FileText },
    { path: '/course', label: '课程', icon: BookOpen },
    { path: '/code', label: '代码审查', icon: Code },
  ];

  // 获取钱包余额和信息
  useEffect(() => {
    const fetchWalletInfo = async () => {
      if (isActive && account && provider) {
        try {
          const balance = await provider.getBalance(account);
          const formattedBalance = parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
          
          setWalletInfo({
            balance: formattedBalance,
            shortAddress: `${account.slice(0, 6)}...${account.slice(-4)}`,
            networkName: networkNames[chainId || 1] || 'Unknown Network'
          });
        } catch (error) {
          console.error('获取钱包信息失败:', error);
        }
      }
    };

    fetchWalletInfo();
  }, [isActive, account, provider, chainId]);

  // 监听连接状态变化
  useEffect(() => {
    console.log('连接状态:', isActive);
    console.log('当前账户:', account);
    console.log('当前网络:', chainId);
    
    if (isActive) {
      setConnectionError(null);
    }
  }, [isActive, account, chainId]);

  // 连接钱包
  const handleConnectWallet = async (walletName: 'MetaMask' | 'WalletConnect') => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      const connector = connectorsByName[walletName];
      await connector.activate();
      console.log(`已连接到 ${walletName}`);
    } catch (error: any) {
      console.error('钱包连接失败:', error);
      setConnectionError(error.message || '连接失败，请重试');
    } finally {
      setIsConnecting(false);
    }
  };

  // 断开连接
  const handleDisconnect = () => {
    try {
      deactivate();
      setWalletInfo({
        balance: '0',
        shortAddress: '',
        networkName: 'Unknown'
      });
      setIsWalletDropdownOpen(false);
      console.log('钱包已断开连接');
    } catch (error) {
      console.error('断开连接失败:', error);
    }
  };

  // 复制地址
  const copyAddress = async () => {
    if (account) {
      try {
        await navigator.clipboard.writeText(account);
        // 可以添加一个 toast 提示
        console.log('地址已复制到剪贴板');
      } catch (error) {
        console.error('复制失败:', error);
      }
    }
  };

  // 钱包连接按钮组件
  const WalletButton = () => {
    if (isActive && account) {
      return (
        <div className="relative">
          <button
            onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg font-medium text-sm hover:bg-green-100 transition-all duration-200"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{walletInfo.shortAddress}</span>
            <ChevronDown size={14} className={`transition-transform ${isWalletDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* 钱包下拉菜单 */}
          {isWalletDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">钱包地址</span>
                  <button
                    onClick={copyAddress}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Copy size={14} className="text-gray-500" />
                  </button>
                </div>
                <div className="text-xs text-gray-600 font-mono break-all">
                  {account}
                </div>
              </div>
              
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">余额</span>
                  <span className="text-sm font-bold text-gray-900">{walletInfo.balance} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">网络</span>
                  <span className="text-sm text-gray-600">{walletInfo.networkName}</span>
                </div>
              </div>

              <div className="px-2 py-1">
                <button
                  onClick={() => window.open(`https://etherscan.io/address/${account}`, '_blank')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>在 Etherscan 查看</span>
                </button>
                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <LogOut size={14} />
                  <span>断开连接</span>
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={() => handleConnectWallet('MetaMask')}
          disabled={isConnecting}
          className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Wallet size={16} />
          <span>{isConnecting ? '连接中...' : '连接钱包'}</span>
        </button>

        {/* 连接错误提示 */}
        {connectionError && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm z-50">
            <div className="flex items-start space-x-2">
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              <span>{connectionError}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 移动端钱包按钮
  const MobileWalletButton = () => {
    if (isActive && account) {
      return (
        <div className="px-2 pb-3 border-t border-gray-200">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-700">已连接</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-xs text-green-600 font-mono mb-2">
              {walletInfo.shortAddress}
            </div>
            <div className="flex justify-between text-xs text-green-600 mb-3">
              <span>余额: {walletInfo.balance} ETH</span>
              <span>{walletInfo.networkName}</span>
            </div>
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
            >
              <LogOut size={14} />
              <span>断开连接</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="px-2 pb-3 border-t border-gray-200">
        <button
          onClick={() => handleConnectWallet('MetaMask')}
          disabled={isConnecting}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
        >
          <Wallet size={16} />
          <span>{isConnecting ? '连接中...' : '连接钱包'}</span>
        </button>
        {connectionError && (
          <div className="mt-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-2 text-xs">
            <div className="flex items-start space-x-2">
              <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
              <span>{connectionError}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown')) {
        setIsWalletDropdownOpen(false);
      }
    };

    if (isWalletDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWalletDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo 区域 */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">W3</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Web3 DAPP
              </h1>
            </Link>
          </div>

          {/* 桌面端导航菜单 */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent
                    size={16}
                    className={`${
                      isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                    } transition-colors`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* 右侧按钮区域 */}
          <div className="flex items-center space-x-3">
            {/* 账户信息显示（连接后） */}
            {isActive && account && (
              <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg border">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">账户</span>
                  <span className="text-sm font-mono font-medium text-gray-900">
                    {walletInfo.shortAddress}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">余额</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {walletInfo.balance} ETH
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">网络</span>
                  <span className="text-xs font-medium text-blue-600">
                    {walletInfo.networkName}
                  </span>
                </div>
              </div>
            )}
            
            {/* 连接钱包按钮 */}
            <div className="wallet-dropdown">
              <WalletButton />
            </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent
                      size={16}
                      className={isActive ? 'text-blue-600' : 'text-gray-500'}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* 移动端钱包按钮 */}
            <MobileWalletButton />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;