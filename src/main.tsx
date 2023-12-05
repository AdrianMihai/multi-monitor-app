import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './types.d';

const appRoot = createRoot(document.getElementById('root'));

appRoot.render(<App />);
