import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export const Context = createContext<any | null>(null)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

