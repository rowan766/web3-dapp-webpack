import Header from '@components/common/Header';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="mx-auto px-4">
        <Outlet />
      </main>
    </>
  );
};
// MainLayout.whyDidYouRender = true;  // 性能调试库识别不必要的组件重新渲染 需要安装 @welldone-software/why-did-you-render
export default memo(MainLayout);
