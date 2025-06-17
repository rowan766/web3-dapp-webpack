import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract, formatEther, parseEther } from 'ethers';
import { 
  BookOpen, 
  ShoppingCart, 
  PlusCircle, 
  Users, 
  DollarSign,
  Clock,
  Star,
  Edit,
  Eye,
  Play,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  User,
  Calendar,
  TrendingUp
} from 'lucide-react';

// 导入 ABI 和类型
import YDCoursePlatformABI from '@/abis/YDCoursePlatform.sol/YDCoursePlatform.json';
import type { YDCoursePlatform } from '@/types/YDCoursePlatform';

// 合约地址（需要替换为实际部署的地址）
const CONTRACT_ADDRESS = "0x8b6c07428974669354b46c5e32c9258689348E88"; // 请替换为实际的合约地址

interface Course {
  id: bigint;
  title: string;
  description: string;
  contentHash: string;
  price: bigint;
  instructor: string;
  isActive: boolean;
  createdAt: bigint;
  totalSales: bigint;
}

interface PlatformStats {
  totalCourses: bigint;
  activeCourses: bigint;
  totalSales: bigint;
}

interface Purchase {
  courseId: bigint;
  buyer: string;
  purchaseTime: bigint;
  pricePaid: bigint;
}

export default function YDCoursePlatform() {
  const { account, provider, isActive } = useWeb3React();
  
  // 状态管理
  const [contract, setContract] = useState<YDCoursePlatform | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<bigint[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // 表单状态
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'mycourses' | 'stats'>('browse');
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    contentHash: '',
    price: '',
    instructor: account || ''
  });

  // 初始化合约
  useEffect(() => {
    if (provider && isActive) {
      try {
        const signer = provider.getSigner();
        const contractInstance = new Contract(
          CONTRACT_ADDRESS,
          YDCoursePlatformABI.abi,
          signer
        ) as YDCoursePlatform;
        setContract(contractInstance);
      } catch (err) {
        setError('合约初始化失败');
        console.error('Contract initialization error:', err);
      }
    }
  }, [provider, isActive]);

  // 更新表单中的instructor地址
  useEffect(() => {
    if (account) {
      setCreateForm(prev => ({ ...prev, instructor: account }));
    }
  }, [account]);

  // 获取所有活跃课程
  const fetchCourses = async () => {
    if (!contract) return;

    setLoading(true);
    setError(null);

    try {
      const activeCourses = await contract.getAllActiveCourses();
      setCourses(activeCourses);
    } catch (err: any) {
      setError(`获取课程失败: ${err.message}`);
      console.error('Fetch courses error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 获取用户已购买的课程
  const fetchUserCourses = async () => {
    if (!contract || !account) return;

    try {
      const purchased = await contract.getUserCourses(account);
      setUserCourses(purchased);
    } catch (err: any) {
      console.error('Fetch user courses error:', err);
    }
  };

  // 获取平台统计信息
  const fetchPlatformStats = async () => {
    if (!contract) return;

    try {
      const stats = await contract.getPlatformStats();
      setPlatformStats({
        totalCourses: stats[0],
        activeCourses: stats[1],
        totalSales: stats[2]
      });
    } catch (err: any) {
      console.error('Fetch platform stats error:', err);
    }
  };

  // 初始加载数据
  useEffect(() => {
    if (contract && account) {
      fetchCourses();
      fetchUserCourses();
      fetchPlatformStats();
    }
  }, [contract, account]);

  // 创建课程
  const handleCreateCourse = async () => {
    if (!contract || !createForm.title || !createForm.price) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const priceInWei = parseEther(createForm.price);
      const tx = await contract.createCourse(
        createForm.title,
        createForm.description,
        createForm.contentHash,
        priceInWei,
        createForm.instructor
      );
      await tx.wait();
      
      setSuccess(`课程创建成功！交易哈希: ${tx.hash}`);
      setCreateForm({
        title: '',
        description: '',
        contentHash: '',
        price: '',
        instructor: account || ''
      });
      await fetchCourses();
      await fetchPlatformStats();
    } catch (err: any) {
      setError(`创建课程失败: ${err.message}`);
      console.error('Create course error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 购买课程
  const handlePurchaseCourse = async (courseId: bigint) => {
    if (!contract) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const tx = await contract.purchaseCourse(courseId);
      await tx.wait();
      
      setSuccess(`课程购买成功！交易哈希: ${tx.hash}`);
      await fetchUserCourses();
      await fetchCourses();
      await fetchPlatformStats();
    } catch (err: any) {
      setError(`购买课程失败: ${err.message}`);
      console.error('Purchase course error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 检查用户是否已购买课程
  const hasUserPurchased = (courseId: bigint): boolean => {
    return userCourses.some(id => id === courseId);
  };

  // 获取课程内容
  const getCourseContent = async (courseId: bigint) => {
    if (!contract) return;

    try {
      const content = await contract.getCourseContent(courseId);
      alert(`课程内容: ${content}`);
    } catch (err: any) {
      setError(`获取课程内容失败: ${err.message}`);
    }
  };

  // 格式化时间戳
  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  // 如果钱包未连接
  if (!isActive || !account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">请先连接钱包</h2>
          <p className="text-gray-600">需要连接钱包才能使用课程平台</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">YD 课程平台</h1>
          <p className="text-gray-600">去中心化在线学习平台</p>
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

        {/* 平台统计 */}
        {platformStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">总课程数</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.totalCourses.toString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">活跃课程</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.activeCourses.toString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">总销售额</p>
                  <p className="text-2xl font-bold text-gray-900">{formatEther(platformStats.totalSales)} YD</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 导航标签 */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'browse', label: '浏览课程', icon: BookOpen },
              { id: 'create', label: '创建课程', icon: PlusCircle },
              { id: 'mycourses', label: '我的课程', icon: User },
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 浏览课程标签内容 */}
        {activeTab === 'browse' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">所有课程</h2>
              <button
                onClick={fetchCourses}
                disabled={loading}
                className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                刷新
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id.toString()} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        活跃
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User size={14} className="mr-2" />
                        <span className="font-mono">{course.instructor.slice(0, 8)}...{course.instructor.slice(-6)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-2" />
                        <span>{formatDate(course.createdAt)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={14} className="mr-2" />
                        <span>{course.totalSales.toString()} 已购买</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">
                        {formatEther(course.price)} YD
                      </span>
                      
                      {hasUserPurchased(course.id) ? (
                        <button
                          onClick={() => getCourseContent(course.id)}
                          className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium"
                        >
                          <Play size={14} className="mr-1" />
                          查看内容
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchaseCourse(course.id)}
                          disabled={loading}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                        >
                          <ShoppingCart size={14} className="mr-1" />
                          立即购买
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {courses.length === 0 && !loading && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无课程</h3>
                <p className="text-gray-500">平台上还没有发布的课程</p>
              </div>
            )}
          </div>
        )}

        {/* 创建课程标签内容 */}
        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">创建新课程</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    课程标题 *
                  </label>
                  <input
                    type="text"
                    placeholder="输入课程标题"
                    value={createForm.title}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    课程描述
                  </label>
                  <textarea
                    rows={4}
                    placeholder="详细描述您的课程内容..."
                    value={createForm.description}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    内容哈希 (IPFS)
                  </label>
                  <input
                    type="text"
                    placeholder="QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    value={createForm.contentHash}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, contentHash: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">课程内容的 IPFS 哈希值</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    课程价格 (YD Token) *
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    placeholder="1.0"
                    value={createForm.price}
                    onChange={(e) => setCreateForm(price => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    讲师地址
                  </label>
                  <input
                    type="text"
                    value={createForm.instructor}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, instructor: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">默认为当前连接的钱包地址</p>
                </div>

                <button
                  onClick={handleCreateCourse}
                  disabled={loading || !createForm.title || !createForm.price}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {loading ? '创建中...' : '创建课程'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 我的课程标签内容 */}
        {activeTab === 'mycourses' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">我购买的课程</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => hasUserPurchased(course.id))
                .map((course) => (
                  <div key={course.id.toString()} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          已购买
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <User size={14} className="mr-2" />
                          <span className="font-mono">{course.instructor.slice(0, 8)}...{course.instructor.slice(-6)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-2" />
                          <span>{formatDate(course.createdAt)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => getCourseContent(course.id)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                      >
                        <Play size={14} className="mr-1" />
                        开始学习
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {userCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">还没有购买课程</h3>
                <p className="text-gray-500 mb-4">去浏览页面发现感兴趣的课程吧</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <BookOpen size={16} className="mr-2" />
                  浏览课程
                </button>
              </div>
            )}
          </div>
        )}

        {/* 合约地址信息 */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">合约信息</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">课程平台合约地址:</p>
            <p className="font-mono text-sm text-gray-900 break-all">{CONTRACT_ADDRESS}</p>
          </div>
        </div>
      </div>
    </div>
  );
}