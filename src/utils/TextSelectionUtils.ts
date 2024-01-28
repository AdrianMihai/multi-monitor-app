import { TextCoordinates } from '../models/TextMarkup';

export const calculateTextCoordinates = (parentContainer: HTMLElement): TextCoordinates => {
  const textSelection = document.getSelection();

  if (textSelection.focusNode.nodeType === Node.ELEMENT_NODE && textSelection.type === 'Caret') {
    return { start: 0, end: 0 };
  }

  const textNodesWalker = document.createTreeWalker(parentContainer, NodeFilter.SHOW_TEXT);
  const nextCoordinates = { start: -1, end: -1 };
  let charsCount = 0;
  let currentTextNode = textNodesWalker.nextNode();

  while (currentTextNode !== null && (nextCoordinates.start === -1 || nextCoordinates.end !== -1)) {
    if (textSelection.anchorNode === currentTextNode) {
      nextCoordinates.start = charsCount + textSelection.anchorOffset;
    }

    if (textSelection.focusNode === currentTextNode) {
      nextCoordinates.end = charsCount + textSelection.focusOffset;
    }

    charsCount += currentTextNode.textContent.length;
    currentTextNode = textNodesWalker.nextNode();
  }

  return nextCoordinates;
};
