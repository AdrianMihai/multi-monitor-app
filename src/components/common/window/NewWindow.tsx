import { useEffect, useState } from 'react';

export const NewWindow = ({ documentPath, windowName, windowFeatures, onClose }) => {
  const [windowObj, setWindowObj] = useState<WindowProxy | null>(null);

  useEffect(() => {
    if (windowObj !== null) return;

    const newWindow = window.open(documentPath, windowName, windowFeatures);

    if (!newWindow) {
      onClose(null);

      return;
    }

    newWindow.addEventListener('beforeunload', onClose);
    setWindowObj(newWindow);
  }, []);

  return null;
};
