import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { connectors } from '../connections/connectors';
import Web3ConnectionManager from '../connections/Web3ConnectionManager';

import Header from '@components/common/Header';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
     <Web3ReactProvider connectors={connectors}>
      <Web3ConnectionManager>
        <Header />
          <main className="mx-auto px-4">
          <Outlet />
        </main>
      </Web3ConnectionManager>
      </Web3ReactProvider>
    </>
  );
};
// MainLayout.whyDidYouRender = true;  // 性能调试库识别不必要的组件重新渲染 需要安装 @welldone-software/why-did-you-render
export default memo(MainLayout);
