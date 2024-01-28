import { TextFormatting } from './markdown/MarkdownTypes';

const applyBold = (text: string) => `**${text}**`;

const applyItalic = (text: string) => `*${text}*`;

const applyStrikethrough = (text: string) => `~~${text}~~`;

export const getFormattingStrategy = (formatting: TextFormatting) => {
  if (formatting === TextFormatting.bold) {
    return applyBold;
  }

  if (formatting === TextFormatting.italic) {
    return applyItalic;
  }

  if (formatting === TextFormatting.strikethrough) {
    return applyStrikethrough;
  }
};

// export const applyFormattingOntoText = (
//   text: string,
//   formatting: TextFormatting,
//   at: { start: number; end: number }
// ) => {
//   const { start, end } = orderTextCoordinates(at.start, at.end);
//   const textToFormat = text.slice(start, end);

//   return `${text.slice(0, start)}${getFormattingStrategy(formatting)(textToFormat)}${text.slice(end, text.length)}`;
// };
