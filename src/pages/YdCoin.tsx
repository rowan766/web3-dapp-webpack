import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract, formatEther, parseEther } from 'ethers';
import { 
  Coins, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  DollarSign,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// 导入 ABI 和类型
import YDTokenABI from '@/abis/YDToken.sol/YDToken.json';
import type { YDToken } from '@/types/YDToken';

// 合约地址（需要替换为实际部署的地址）
const CONTRACT_ADDRESS = "0x23941b01e2F0fDF214d4d440FB4654C00deBb52D"; // 请替换为实际的合约地址

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: bigint;
  totalSupply: bigint;
  tokenPrice: bigint;
  saleActive: boolean;
  maxTokensPerTransaction: bigint;
  contractETHBalance: bigint;
  userBalance: bigint;
}

export default function YDTokenContract() {
  const { account, provider, isActive } = useWeb3React();
  
  // 状态管理
  const [contract, setContract] = useState<YDToken | null>(null);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // 表单状态
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  // 初始化合约
  useEffect(() => {
    if (provider && isActive) {
      try {
        const signer = provider.getSigner();
        const contractInstance = new Contract(
          CONTRACT_ADDRESS,
          YDTokenABI.abi,
          signer
        ) as YDToken;
        setContract(contractInstance);
      } catch (err) {
        setError('合约初始化失败');
        console.error('Contract initialization error:', err);
      }
    }
  }, [provider, isActive]);

  // 获取代币信息
  const fetchTokenInfo = async () => {
    if (!contract || !account) return;

    setLoading(true);
    setError(null);

    try {
      const [
        name,
        symbol,
        decimals,
        totalSupply,
        tokenPrice,
        saleActive,
        maxTokensPerTransaction,
        contractETHBalance,
        userBalance
      ] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
        contract.tokenPrice(),
        contract.saleActive(),
        contract.maxTokensPerTransaction(),
        contract.contractETHBalance(),
        contract.balanceOf(account)
      ]);

      setTokenInfo({
        name,
        symbol,
        decimals,
        totalSupply,
        tokenPrice,
        saleActive,
        maxTokensPerTransaction,
        contractETHBalance,
        userBalance
      });
    } catch (err: any) {
      setError(`获取代币信息失败: ${err.message}`);
      console.error('Fetch token info error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载和定期刷新
  useEffect(() => {
    if (contract && account) {
      fetchTokenInfo();
    }
  }, [contract, account]);

  // 购买代币
  const handleBuyTokens = async () => {
    if (!contract || !buyAmount) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const ethAmount = parseEther(buyAmount);
      const tx = await contract.buyTokens({ value: ethAmount });
      await tx.wait();
      
      setSuccess(`成功购买代币！交易哈希: ${tx.hash}`);
      setBuyAmount('');
      await fetchTokenInfo();
    } catch (err: any) {
      setError(`购买失败: ${err.message}`);
      console.error('Buy tokens error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 卖出代币
  const handleSellTokens = async () => {
    if (!contract || !sellAmount) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const tokenAmount = parseEther(sellAmount);
      const tx = await contract.sellTokens(tokenAmount);
      await tx.wait();
      
      setSuccess(`成功卖出代币！交易哈希: ${tx.hash}`);
      setSellAmount('');
      await fetchTokenInfo();
    } catch (err: any) {
      setError(`卖出失败: ${err.message}`);
      console.error('Sell tokens error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 转账代币
  const handleTransfer = async () => {
    if (!contract || !transferTo || !transferAmount) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const amount = parseEther(transferAmount);
      const tx = await contract.transfer(transferTo, amount);
      await tx.wait();
      
      setSuccess(`转账成功！交易哈希: ${tx.hash}`);
      setTransferTo('');
      setTransferAmount('');
      await fetchTokenInfo();
    } catch (err: any) {
      setError(`转账失败: ${err.message}`);
      console.error('Transfer error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 计算可购买的代币数量
  const calculateTokenAmount = (ethAmount: string) => {
    if (!ethAmount || !tokenInfo) return '0';
    try {
      const eth = parseEther(ethAmount);
      const tokens = (eth * (10n ** tokenInfo.decimals)) / tokenInfo.tokenPrice;
      return formatEther(tokens);
    } catch {
      return '0';
    }
  };

  // 如果钱包未连接
  if (!isActive || !account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">请先连接钱包</h2>
          <p className="text-gray-600">需要连接钱包才能与 YD Token 合约交互</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">YD Token 合约交互</h1>
          <p className="text-gray-600">购买、卖出和管理您的 YD Token</p>
        </div>

        {/* 错误和成功消息 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* 代币信息卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  代币信息
                </h2>
                <button
                  onClick={fetchTokenInfo}
                  disabled={loading}
                  className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                  刷新
                </button>
              </div>

              {tokenInfo ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">代币名称</p>
                    <p className="font-semibold text-gray-900">{tokenInfo.name}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">代币符号</p>
                    <p className="font-semibold text-gray-900">{tokenInfo.symbol}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">当前价格</p>
                    <p className="font-semibold text-gray-900">{formatEther(tokenInfo.tokenPrice)} ETH</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">销售状态</p>
                    <p className={`font-semibold ${tokenInfo.saleActive ? 'text-green-600' : 'text-red-600'}`}>
                      {tokenInfo.saleActive ? '开启' : '关闭'}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">总供应量</p>
                    <p className="font-semibold text-gray-900">{formatEther(tokenInfo.totalSupply)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">您的余额</p>
                    <p className="font-semibold text-blue-600">{formatEther(tokenInfo.userBalance)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">合约 ETH 余额</p>
                    <p className="font-semibold text-gray-900">{formatEther(tokenInfo.contractETHBalance)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">单次最大购买</p>
                    <p className="font-semibold text-gray-900">{formatEther(tokenInfo.maxTokensPerTransaction)}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">加载中...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 交互功能区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 购买代币 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 text-green-500 mr-2" />
              购买代币
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ETH 数量
                </label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="输入 ETH 数量"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {buyAmount && tokenInfo && (
                  <p className="text-sm text-gray-500 mt-1">
                    约可购买: {calculateTokenAmount(buyAmount)} {tokenInfo.symbol}
                  </p>
                )}
              </div>
              <button
                onClick={handleBuyTokens}
                disabled={loading || !buyAmount || !tokenInfo?.saleActive}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Coins className="h-4 w-4 mr-2" />
                {loading ? '购买中...' : '购买代币'}
              </button>
            </div>
          </div>

          {/* 卖出代币 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
              卖出代币
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  代币数量
                </label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="输入代币数量"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {tokenInfo && (
                  <p className="text-sm text-gray-500 mt-1">
                    余额: {formatEther(tokenInfo.userBalance)} {tokenInfo.symbol}
                  </p>
                )}
              </div>
              <button
                onClick={handleSellTokens}
                disabled={loading || !sellAmount || !tokenInfo?.saleActive}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                {loading ? '卖出中...' : '卖出代币'}
              </button>
            </div>
          </div>

          {/* 转账代币 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              转账代币
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  接收地址
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  转账数量
                </label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="输入代币数量"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleTransfer}
                disabled={loading || !transferTo || !transferAmount}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {loading ? '转账中...' : '转账代币'}
              </button>
            </div>
          </div>
        </div>

        {/* 合约地址信息 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">合约信息</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">合约地址:</p>
            <p className="font-mono text-sm text-gray-900 break-all">{CONTRACT_ADDRESS}</p>
          </div>
        </div>
      </div>
    </div>
  );
}