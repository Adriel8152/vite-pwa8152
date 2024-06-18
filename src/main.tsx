import { registerSW } from 'virtual:pwa-register';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.ts';
import './index.css'

registerSW({
  immediate: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
