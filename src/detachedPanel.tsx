import React from 'react';
import { createRoot } from 'react-dom/client';
import './types.d';
import { DetachedPanelApp } from './components/DetachedPanelApp';

const appRoot = createRoot(document.getElementById('root'));

appRoot.render(<DetachedPanelApp />);
