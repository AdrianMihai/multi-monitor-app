import React, { isValidElement, useCallback, useEffect, useState } from 'react';
import { PanelComponentsContext } from './PanelComponentsContext';
import { StyledPanelElementsContainer } from './StyledComponents';

interface PanelProps {
  activePanel?: string;
  onPanelChange?: (panelId: string) => void;
  navbar: React.JSX.Element;
  children: JSX.Element[] | JSX.Element;
}

const Panel = ({ activePanel: defaultActivePanel, onPanelChange, children, navbar }: PanelProps) => {
  const [activePanel, setActivePanel] = useState(defaultActivePanel || '');

  useEffect(() => {
    setActivePanel(defaultActivePanel || '');
  }, [defaultActivePanel]);

  const toggleActivePanel = useCallback(
    (panelId) => {
      const newActivePanel = panelId === activePanel ? '' : panelId;

      if (onPanelChange) {
        onPanelChange(newActivePanel);
      }

      if (defaultActivePanel === undefined) {
        setActivePanel(newActivePanel);
      }
    },
    [activePanel, defaultActivePanel, onPanelChange]
  );

  return (
    <PanelComponentsContext.Provider value={{ activePanel, toggleActivePanel }}>
      <StyledPanelElementsContainer>
        {children}
        {!isValidElement(navbar) ? null : navbar}
      </StyledPanelElementsContainer>
    </PanelComponentsContext.Provider>
  );
};

export default Panel;
