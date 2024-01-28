import { isEmptyArray } from '../../utils/ArrayUtils';
import { getFormattingStrategy } from '../FormattingMarkdown';
import { DecoratedText, FormattedText } from './MarkdownTypes';

export const preProcessRawText = (sourceText: string) => sourceText.replace(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g, '\\$&');

export const convertTextToMarkdown = (token: DecoratedText): string => {
  const rawText = preProcessRawText(token.text);

  const formatting = (token as FormattedText).textFormatting;

  if (isEmptyArray(formatting)) {
    return rawText;
  }

  formatting.reverse();
  let formattedText = rawText;

  for (const appliedFormatting of formatting) {
    formattedText = getFormattingStrategy(appliedFormatting)(formattedText);
  }

  return formattedText;
};
