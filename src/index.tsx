import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import TodoApp from './TodoApp';
import './styles/index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <TodoApp />
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
