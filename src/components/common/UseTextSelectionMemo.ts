import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { calculateTextCoordinates } from '../../utils/TextSelectionUtils';

export const useTextSelectionMemo = (container: React.MutableRefObject<HTMLElement | null>) => {
  const lastMemoizedCoordinates = useRef(null);

  useLayoutEffect(() => {
    if (!container.current || !lastMemoizedCoordinates.current) return;

    const { start, end } = lastMemoizedCoordinates.current;
    const newRange = document.createRange();

    if (start === 0 && end === 0) {
      newRange.setStart(container.current, 0);
      newRange.setEnd(container.current, 0);
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(newRange);

      return;
    }

    const textNodesWalker = document.createTreeWalker(container.current, NodeFilter.SHOW_TEXT);
    let currentTextNode = textNodesWalker.nextNode();
    let charsCount = 0;

    while (currentTextNode !== null) {
      if (charsCount + currentTextNode.textContent.length >= start && newRange.startContainer === document) {
        newRange.setStart(currentTextNode, start - charsCount);
      }

      if (charsCount + currentTextNode.textContent.length >= end && newRange.endContainer === document) {
        newRange.setEnd(currentTextNode, end - charsCount);
      }

      charsCount += currentTextNode.textContent.length;
      currentTextNode = textNodesWalker.nextNode();
    }

    document.getSelection().removeAllRanges();
    document.getSelection().addRange(newRange);
    lastMemoizedCoordinates.current = null;
  });

  const memoizeCoordinates = useCallback(() => {
    if (!container.current) {
      return;
    }

    lastMemoizedCoordinates.current = calculateTextCoordinates(container.current);
  }, [container]);

  const forceNextCoordinates = useCallback((nextCoordinates) => {
    lastMemoizedCoordinates.current = nextCoordinates;
  }, []);

  return {
    memoizeCoordinates,
    forceNextCoordinates,
  };
};
