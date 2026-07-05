import { useEffect } from 'react';
import { getInstanceId } from '../../../broadcast/Domain';

export const NewWindow = ({ documentPath, windowName, windowFeatures, onClose, onOpen }) => {
  const triggerWindow = () => {
    const newWindow = window.open(documentPath, windowName, windowFeatures);

    if (!newWindow) {
      onClose(null);

      return null;
    }

    newWindow.INSTANCE_ID = getInstanceId();
    newWindow.addEventListener('beforeunload', () => {
      onClose(newWindow);
    });
    onOpen(newWindow);
  };

  useEffect(() => {
    const newWindow = triggerWindow();

    if (!newWindow) return;

    return () => newWindow.close()
  }, []);

  return null;
};
