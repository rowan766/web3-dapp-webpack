import React from 'react';

const Abis = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">ABIs 管理</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">智能合约 ABI 文件</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium">Token.json</h4>
            <p className="text-sm text-gray-600">ERC-20 代币合约 ABI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abis;