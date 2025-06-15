import { useState } from 'react';
import { useImmer } from '@/hooks/useImmer';

const Home = () => {
  // const [data, setData] = useState({ info: '大家好' });
  const [data, setData] = useImmer({ info: '大家好' });
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">我的web3-DAPP</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">欢迎使用</h3>
          <p className="text-gray-600 cursor-pointer" onClick={()=>{
            setData(draft=>{draft.info='同学们好'})
          }}>{data.info}</p>
        </div>
      </div>
    </div>
  );
};
Home.whyDidYouRender = true;
export default Home;
