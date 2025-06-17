import { useState } from 'react';
import { useImmer } from '@/hooks/useImmer';

const Home = () => {
  // 使用 useImmer 替代 useState，支持 immer 的不可变更新
  const [data, setData] = useImmer({ info: '大家好' });

  return (
    <div className="p-8" data-cy="home-container">
      <h1 className="text-4xl font-bold mb-4" data-cy="main-title">我的web3-DAPP</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-cy="content-grid">
        
        {/* 主要交互卡片 */}
        <div className="bg-white rounded-lg shadow p-6" data-cy="welcome-card">
          <h3 className="text-lg font-semibold mb-2" data-cy="welcome-title">欢迎使用</h3>
          <p
            className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
            data-cy="greeting-text"
            onClick={() => {
              // 使用 immer 的草稿模式更新状态
              setData(draft => {
                draft.info = '同学们好';
              });
            }}
          >
            {data.info}
          </p>

          {/* 添加一些额外的交互示例 */}
          <div className="mt-4 space-x-2" data-cy="button-group">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              data-cy="change-greeting-btn"
              onClick={() =>
                setData(draft => {
                  draft.info = '欢迎大家！';
                })
              }
            >
              更改问候语
            </button>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              data-cy="learning-mode-btn"
              onClick={() =>
                setData(draft => {
                  draft.info = '学习Web3开发';
                })
              }
            >
              学习模式
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              data-cy="reset-btn"
              onClick={() => setData({ info: '重置状态' })} // 直接设置新状态
            >
              重置
            </button>
          </div>
        </div>

        {/* 显示当前状态的调试信息 */}
        <div className="bg-gray-100 rounded-lg shadow p-6" data-cy="debug-card">
          <h3 className="text-lg font-semibold mb-2" data-cy="debug-title">状态调试</h3>
          <pre 
            className="text-sm text-gray-700" 
            data-cy="debug-json"
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

// 开发环境下的性能调试工具
Home.whyDidYouRender = true;

export default Home;