import React from 'react';
import { createRoot } from 'react-dom/client';
import './types.d';
import { SidePanel } from './components/requests-area/SidePanel';

const appRoot = createRoot(document.getElementById('root'));

appRoot.render(<SidePanel />);
