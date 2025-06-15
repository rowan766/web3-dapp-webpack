import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@pages/App';

const container = document.getElementById('app');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>,
);
