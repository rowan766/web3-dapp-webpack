import { useRoutes } from 'react-router-dom';
import routes from '@/routes/index';

import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

const App = () => {
  const routing = useRoutes(routes);
    return <>
        {routing}
    </>;
};

export default App;
