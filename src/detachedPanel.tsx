import React from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import './types.d';
import { DetachedPanelApp } from './components/DetachedPanelApp';

document.addEventListener('readystatechange', () => {
  if (document.readyState !== 'complete') return;

  setTimeout(() => {
    const appRoot = createRoot(document.getElementById('root'));

    appRoot.render(<DetachedPanelApp />);
  }, 1000);
});
