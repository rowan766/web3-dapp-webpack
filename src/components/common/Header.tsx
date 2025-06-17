import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BookOpen, Menu, X, Code, Wallet,Coins  } from 'lucide-react';
import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/connections/connectors';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [eagerConnectionTried, setEagerConnectionTried] = useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/abis', label: 'ABIs', icon: FileText },
    { path: '/ydcoin', label: '代币', icon: Coins },
    { path: '/course', label: '课程', icon: BookOpen },
    { path: '/code', label: '代码审查', icon: Code },
  ];

  const { account, isActive, provider, chainId } = useWeb3React();
  const [balance, setBalance] = useState('0');

  // 急切连接 - 页面加载时尝试自动连接
  useEffect(() => {
    const tryEagerConnection = async () => {
      try {
        // 只有当localStorage中有连接记录时才尝试急切连接
        const wasConnected = localStorage.getItem('walletConnected') === 'true';
        
        if (wasConnected && metaMask.connectEagerly) {
          console.log('检测到之前的连接，尝试急切连接...');
          await metaMask.connectEagerly();
          console.log('急切连接尝试完成');
        } else {
          console.log('未检测到之前的连接记录，跳过急切连接');
        }
      } catch (error) {
        console.log('急切连接失败:', error);
        // 如果急切连接失败，清除localStorage中的连接状态
        localStorage.removeItem('walletConnected');
      } finally {
        setEagerConnectionTried(true);
      }
    };

    if (!eagerConnectionTried) {
      tryEagerConnection();
    }
  }, [eagerConnectionTried]);

  // 手动连接钱包
  const connectWallet = async () => {
    try {
      console.log('连接钱包');
      await metaMask.activate();
      console.log('connected to metamask');
      // 保存连接状态到localStorage
      localStorage.setItem('walletConnected', 'true');
    } catch (error) {
      console.error('连接钱包失败:', error);
    }
  };

  // 断开连接
  const disconnectWallet = () => {
    try {
      // 先清除连接状态，防止急切连接
      localStorage.removeItem('walletConnected');
      localStorage.setItem('walletDisconnected', 'true');
      
      if (metaMask.deactivate) {
        metaMask.deactivate();
      } else {
        metaMask.resetState();
      }
      
      console.log('钱包已断开连接');
    } catch (error) {
      console.error('断开连接失败:', error);
    }
  };

  useEffect(() => {
    console.log('连接状态:', isActive);
    console.log('当前账户:', account);
    console.log('当前网络:', chainId);
    
    // 当连接状态改变时，更新localStorage
    if (isActive && account) {
      localStorage.setItem('walletConnected', 'true');
    } else {
      localStorage.removeItem('walletConnected');
    }
  }, [isActive, account, chainId]);

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
              const isActivePage = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 group ${
                    isActivePage
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent
                    size={16}
                    className={`${
                      isActivePage ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                    } transition-colors`}
                  />
                  <span>{item.label}</span>
                  {isActivePage && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* 右侧按钮区域 */}
          <div className="flex items-center space-x-3">
            {/* 连接状态显示 */}
            {isActive && account && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
              </div>
            )}
            
            {/* 连接/断开钱包按钮 */}
            <button 
              onClick={isActive ? disconnectWallet : connectWallet} 
              disabled={!eagerConnectionTried}
              className={`hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 ${
                !eagerConnectionTried
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : isActive 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              <Wallet size={16} />
              <span>
                {!eagerConnectionTried ? '检查中...' : isActive ? '断开连接' : '连接钱包'}
              </span>
            </button>

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
                const isActivePage = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActivePage
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent
                      size={16}
                      className={isActivePage ? 'text-blue-600' : 'text-gray-500'}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* 移动端连接状态和按钮 */}
            <div className="px-2 pb-3 border-t border-gray-200">
              {isActive && account && (
                <div className="mb-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700">已连接</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-green-600 font-mono">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </div>
                </div>
              )}
              
              <button 
                onClick={isActive ? disconnectWallet : connectWallet} 
                disabled={!eagerConnectionTried}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  !eagerConnectionTried
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : isActive 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                <Wallet size={16} />
                <span>
                  {!eagerConnectionTried ? '检查中...' : isActive ? '断开连接' : '连接钱包'}
                </span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;