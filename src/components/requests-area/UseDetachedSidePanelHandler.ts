import { useCallback, useEffect, useMemo, useRef } from 'react';
import PanelsStore, { PanelsData } from '../../stores/PanelsStore';
import { isDetachedWindow } from '../../broadcast/Domain';

export const useDetachedSidePanelHandler = (panelsData: PanelsData) => {
  const detachedWindowRef = useRef<any>();

  const onOpen = useCallback((windowObj) => {
    detachedWindowRef.current = windowObj;
  }, []);

  const detachedPanelWindowFeatures = useMemo(
    () =>
      `resizable,scrollbars,top=${panelsData.detachedWindowFeatures.top},left=${panelsData.detachedWindowFeatures.left},width=${panelsData.detachedWindowFeatures.width},height=${panelsData.detachedWindowFeatures.height}`,
    [panelsData.detachedWindowFeatures]
  );

  const onClose = useCallback((windowRef) => {
    PanelsStore.saveDetachedPanelWindowFeatures(windowRef);
    PanelsStore.onDeteachedPanelClose();
  }, []);

  useEffect(() => {
    if (isDetachedWindow()) return;

    const onDocumentClick = () => {
      if (!PanelsStore.isDetached || !detachedWindowRef.current) return;

      if (detachedWindowRef.current.innerHeight === 0) {
        onClose(detachedWindowRef.current);
      }
    };

    document.addEventListener('click', onDocumentClick);

    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  useEffect(() => {
    const onMainWindowUnload = () => {
      if (!PanelsStore.isDetached || !detachedWindowRef.current) return;

      PanelsStore.programaticallyCloseDetachedPanel(detachedWindowRef.current);
      detachedWindowRef.current.close();
    };

    window.addEventListener('beforeunload', onMainWindowUnload);

    return () => window.removeEventListener('beforeunload', onMainWindowUnload);
  }, []);

  return {
    onOpen,
    detachedPanelWindowFeatures,
    onClose,
  };
};
