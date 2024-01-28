import { Marked } from 'marked';

export type TextCoordinates = {
  start: number;
  end: number;
};

const markedInstance = new Marked();

export const generateMarkup = (sourceText: string) => markedInstance.parse(sourceText);
