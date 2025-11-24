import React from 'react';
import ReactDOM from 'react-dom/client';
import PremiumSalesPage from '@/pages/PremiumSalesPage';
import '@/theme/global.css'; // keep if you have global night defaults

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PremiumSalesPage />
  </React.StrictMode>
);