import * as React from 'react';
import { createRoot } from 'react-dom/client'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import App from './App'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);