import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { applyTheme, prefsStore } from './store/prefs';
import './index.css';

applyTheme(prefsStore.get().theme);
// Follow the device when the person chose "system".
matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => applyTheme(prefsStore.get().theme));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
