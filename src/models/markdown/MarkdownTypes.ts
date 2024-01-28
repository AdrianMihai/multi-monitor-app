import { isEmptyArray } from '../../utils/ArrayUtils';
import { TextCoordinates } from '../TextMarkup';

export enum TextFormatting {
  bold = 'bold',
  italic = 'italic',
  strikethrough = 'strikethrough',
}
export interface RawText {
  text: string;
}

export interface FormattedText extends RawText {
  textFormatting: TextFormatting[];
}

export type DecoratedText = RawText | FormattedText;

export type TextSearchResult = {
  index: number;
  localCursorPosition: number;
  result: DecoratedText;
};

export const isRawText = (token: DecoratedText) => isEmptyArray((token as FormattedText).textFormatting);

export const isWholeTextSelected = (token: DecoratedText, coordinates: TextCoordinates) =>
  coordinates.start === 0 && coordinates.end === token.text.length;

export const cloneText = (token: DecoratedText) => {
  if (isRawText(token)) {
    return { text: token.text };
  }

  return {
    text: token.text,
    textFormatting: [...(token as FormattedText).textFormatting],
  };
};

export const pushNewFormatting = (token: DecoratedText, ...formatting: TextFormatting[]): DecoratedText => {
  if (isRawText(token)) {
    return {
      ...token,
      textFormatting: formatting,
    };
  }

  const newFormatting = formatting.filter((value) => !(token as FormattedText).textFormatting.includes(value));
  const result = cloneText(token);
  result.textFormatting.push(...newFormatting);

  return result;
};

export const applyFormattingToText = (
  token: DecoratedText,
  coordinates: TextCoordinates,
  formatting: TextFormatting
): DecoratedText[] => {
  if (coordinates.start === 0 && coordinates.end === token.text.length) {
    return [pushNewFormatting(token, formatting)];
  }

  const targetedText = token.text.slice(coordinates.start, coordinates.end);
  const formattedToken = pushNewFormatting(token, formatting);
  formattedToken.text = targetedText;

  const result = [];

  if (coordinates.start > 0) {
    const startToken = cloneText(token);
    startToken.text = token.text.slice(0, coordinates.start);
    result.push(startToken);
  }

  result.push(formattedToken);

  if (coordinates.end < token.text.length) {
    const endToken = cloneText(token);
    endToken.text = token.text.slice(coordinates.end);
    result.push(endToken);
  }

  return result;
};
