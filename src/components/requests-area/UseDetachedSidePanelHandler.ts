import { useCallback } from 'react';
import PanelsStore from '../../stores/PanelsStore';

export const useDetachedSidePanelHandler = () => {
  const onOpen = useCallback(() => {
    PanelsStore.update((data) => {
      data.isDetached = true;
    });
  }, []);

  const computeDetachedWindowFeatures = useCallback(() => 'resizable,scrollbars,width=500,height=500', []);

  const onClose = useCallback(() => {
    PanelsStore.update((data) => {
      data.isDetached = false;
    });
  }, []);

  return {
    onOpen,
    computeDetachedWindowFeatures,
    onClose,
  };
};
