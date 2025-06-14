import './index.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// 引入页面组件 - 改为相对路径
import Home from '@/pages/codeRevi/codeRevi';
import Abis from '@/pages/Abis';

const Layout = () => {
    const location = useLocation();
    
    const navItems = [
        { path: '/', label: '首页', icon: '🏠' },
        { path: '/abis', label: 'ABIs', icon: '📄' }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* 顶部导航栏 */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-xl font-bold text-gray-900">Web3 DAPP</h1>
                            </div>
                        </div>
                        
                        {/* 导航菜单 - 使用 Link 替代 button */}
                        <div className="flex space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        location.pathname === item.path
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-1">{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* 主要内容区域 */}
            <main className="max-w-7xl mx-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/abis" element={<Abis />} />
                </Routes>
            </main>
        </div>
    );
};

// App 组件包裹 Router
const App = () => {
    return (
        <Router>
            <Layout />
        </Router>
    );
};

const container = document.getElementById('app');
if (!container) {
    throw new Error('Failed to find the root element');
}
const root = createRoot(container);

root.render(<App />);