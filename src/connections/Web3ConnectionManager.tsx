import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/connections/connectors';

interface Web3ConnectionManagerProps {
  children: React.ReactNode;
}

const Web3ConnectionManager: React.FC<Web3ConnectionManagerProps> = ({ children }) => {
  const { account, isActive } = useWeb3React();
  const [eagerConnectionTried, setEagerConnectionTried] = useState(false);

  // 页面加载时尝试急切连接
  useEffect(() => {
    const tryEagerConnection = async () => {
      try {
        // 检查是否用户主动断开过连接
        const wasDisconnected = localStorage.getItem('walletDisconnected') === 'true';
        const wasConnected = localStorage.getItem('walletConnected') === 'true';
        
        if (wasDisconnected) {
          console.log('检测到用户主动断开连接，跳过急切连接');
          // 清除断开连接的标记，但保持不连接状态
          localStorage.removeItem('walletDisconnected');
          return;
        }
        
        if (wasConnected) {
          console.log('检测到之前的连接，尝试急切连接...');
          
          // 尝试急切连接
          if (metaMask.connectEagerly) {
            await metaMask.connectEagerly();
            console.log('急切连接成功');
          }
        } else {
          console.log('未检测到之前的连接记录');
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

  // 监听账户变化，更新连接状态
  useEffect(() => {
    if (isActive && account) {
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('lastConnectedAccount', account);
      // 连接成功时清除断开连接标记
      localStorage.removeItem('walletDisconnected');
    } else {
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('lastConnectedAccount');
    }
  }, [isActive, account]);

  // 监听MetaMask账户变化
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('账户变化:', accounts);
        if (accounts.length === 0) {
          // 用户断开了所有账户
          localStorage.removeItem('walletConnected');
          localStorage.removeItem('lastConnectedAccount');
        }
      };

      const handleChainChanged = (chainId: string) => {
        console.log('网络变化:', chainId);
        // 网络变化时刷新页面（MetaMask推荐做法）
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum) {
          // 使用 off 方法而不是 removeListener
          if (window.ethereum.off) {
            window.ethereum.off('accountsChanged', handleAccountsChanged);
            window.ethereum.off('chainChanged', handleChainChanged);
          } else if (window.ethereum.removeListener) {
            // 备用方案：某些版本可能有 removeListener
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
          }
        }
      };
    }
  }, []);

  return <>{children}</>;
};

export default Web3ConnectionManager;