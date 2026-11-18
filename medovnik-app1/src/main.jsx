import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

// Защита на снимките: без десен клик / дълго натискане ("Запази/Отвори снимката") и без влачене.
// Забележка: това спира обикновеното теглене, не и някой, който нарочно го заобикаля.
const isImg = (e) => e.target instanceof Element && e.target.closest('img, picture, video');
document.addEventListener('contextmenu', (e) => { if (isImg(e)) e.preventDefault(); });
document.addEventListener('dragstart', (e) => { if (isImg(e)) e.preventDefault(); });

// Mount React. Once it boots, fade the inline #boot splash.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

requestAnimationFrame(() => {
  const boot = document.getElementById('boot');
  if (!boot) return;
  boot.classList.add('gone');
  setTimeout(() => boot.remove(), 500);
});
