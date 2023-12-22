import { useEffect, useState } from 'react';
import { getInstanceId } from '../../../broadcast/Domain';

export const NewWindow = ({ documentPath, windowName, windowFeatures, onClose, onOpen }) => {
  const [windowObj, setWindowObj] = useState<WindowProxy | null>(null);

  useEffect(() => {
    if (windowObj !== null) return;

    const newWindow = window.open(documentPath, windowName, windowFeatures);

    if (!newWindow) {
      onClose(null);

      return;
    }

    newWindow.INSTANCE_ID = getInstanceId();
    newWindow.addEventListener('beforeunload', () => {
      onClose(newWindow);
    });
    setWindowObj(newWindow);
    onOpen(newWindow);
  }, []);

  return null;
};
