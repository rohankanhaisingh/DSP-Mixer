import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import "./styles/utilities/default-styles.scss";
import "./styles/utilities/font-families.scss";
import "./styles/utilities/variables.scss";

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
