import { createContext } from 'react';

interface PanelsContextData {
  activePanel: string;
  toggleActivePanel: (panelId: string) => void;
}

export const PanelComponentsContext = createContext<PanelsContextData>({
  activePanel: '',
  toggleActivePanel: (_) => {},
});
