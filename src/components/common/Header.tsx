import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Home, FileText, BookOpen, Menu, X, Code} from 'lucide-react';

const Header = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { path: '/', label: '首页', icon: Home },
        { path: '/abis', label: 'ABIs', icon: FileText },
        { path: '/course', label: '课程', icon: BookOpen },
        { path: '/code',label: '代码审查', icon: Code },
    ];

    const handleConnectWallet = () => {
        // 钱包连接功能稍后实现
        console.log('连接钱包');
    };

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
                        {navItems.map((item) => {
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
                                    <IconComponent size={16} className={`${
                                        isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                                    } transition-colors`} />
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
                        {/* 连接钱包按钮 */}
                        <button
                            onClick={handleConnectWallet}
                            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                        >
                            <Wallet size={16} />
                            <span>连接钱包</span>
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
                            {navItems.map((item) => {
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
                                        <IconComponent size={16} className={
                                            isActive ? 'text-blue-600' : 'text-gray-500'
                                        } />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                        
                        {/* 移动端连接钱包按钮 */}
                        <div className="px-2 pb-3">
                            <button
                                onClick={handleConnectWallet}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                            >
                                <Wallet size={16} />
                                <span>连接钱包</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;