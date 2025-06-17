import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App'; // Обрати внимание, что теперь импортируем AppWrapper

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);