import { useCallback } from 'react';
import { DecoratedText } from '../../../models/markdown/MarkdownTypes';
import { calculateTextCoordinates } from '../../../utils/TextSelectionUtils';
import { DecoratedTextCollection } from '../../../models/markdown/DecoratedTextCollection';
import { TextCoordinates } from '../../../models/TextMarkup';

export const useBeforeInputHandling = (decoratedTextTokens: DecoratedText[]) => {
  const shouldHandleInput = useCallback(
    (ev: InputEvent, coordinates: TextCoordinates) => {
      if (ev.inputType === 'deleteContentBackward') {
        return coordinates.start !== coordinates.end || coordinates.start > 0;
      }

      return true;
    },
    [decoratedTextTokens]
  );

  return useCallback(
    (ev: InputEvent) => {
      const coordinates = calculateTextCoordinates(ev.target as HTMLElement);

      if (!shouldHandleInput(ev, coordinates)) {
        return;
      }

      if (ev.inputType === 'insertText') {
        return {
          updatedTextTokens: new DecoratedTextCollection(decoratedTextTokens).addNewText(
            ev.data,
            coordinates.start === -1 ? 0 : coordinates.start
          ),
          textSelectionCoordinates: { start: coordinates.start + 1, end: coordinates.end + 1 },
        };
      }

      if (ev.inputType === 'deleteContentBackward') {
        if (coordinates.start === coordinates.end) {
          coordinates.start -= 1;
        }

        let { start: from, end: to } = coordinates;

        if (from > to) {
          [from, to] = [to, from];
        }

        return {
          updatedTextTokens: new DecoratedTextCollection(decoratedTextTokens).deleteText(from, to),
          textSelectionCoordinates: { start: from, end: from },
        };
      }
    },
    [shouldHandleInput, decoratedTextTokens]
  );
};
