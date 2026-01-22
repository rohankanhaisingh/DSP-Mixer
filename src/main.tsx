import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import WindowProvider from './providers/WindowProvider.tsx';

import App from './App.tsx';

import nl from "./assets/languages/nl.yaml";
import en from "./assets/languages/en.yaml";

import "./styles/utilities/default-styles.scss";
import "./styles/utilities/font-families.scss";
import "./styles/utilities/variables.scss";

import './index.css';
import I18nProvider from './providers/I18nProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <I18nProvider initialLocale="en" dictionaries={{nl, en}}>
            <WindowProvider>
                <App />
            </WindowProvider>
        </I18nProvider>
    </StrictMode>,
)
