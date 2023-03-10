import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './services/store';

const rootElement: HTMLElement | null = document.getElementById('root');
if (!rootElement) {
  throw new Error('root element not found');
}

const root: ReactDOM.Root = ReactDOM.createRoot(
  rootElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
