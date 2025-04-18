import { TextCoordinates } from '../TextMarkup';
import {
  DecoratedText,
  TextSearchResult,
  applyFormattingToText,
  TextFormatting,
  isWholeTextSelected,
} from './MarkdownTypes';
import { convertTextToMarkdown } from './TextToMarkdownAdapter';

export class DecoratedTextCollection {
  constructor(private textCollection: DecoratedText[]) { }

  findTextAt = (coordinate: number): TextSearchResult | void => {
    let textLength = 0;
    let currentTokenIndex = -1;

    for (const token of this.textCollection) {
      const currentLength = textLength + token.text.length;
      currentTokenIndex += 1;

      if (coordinate >= textLength && coordinate <= currentLength) {
        return {
          localCursorPosition: coordinate - textLength,
          index: currentTokenIndex,
          result: token,
        };
      }

      textLength = currentLength;
    }
  };

  collectTokensBetween = (start: number, end: number): TextSearchResult[] => {
    const collectedResults = [];
    let textLength = 0;
    let currentTokenIndex = -1;

    for (const token of this.textCollection) {
      const currentLength = textLength + token.text.length;
      currentTokenIndex += 1;

      if (start >= textLength && start <= currentLength) {
        collectedResults.push({
          localCursorPosition: start - textLength,
          index: currentTokenIndex,
          result: token,
        });
      }

      if (start < textLength && end > currentLength) {
        collectedResults.push({
          localCursorPosition: -1,
          index: currentTokenIndex,
          result: token,
        });
      }

      if (end >= textLength && end <= currentLength) {
        collectedResults.push({
          localCursorPosition: end - textLength,
          index: currentTokenIndex,
          result: token,
        });
      }

      textLength = currentLength;
    }

    return collectedResults;
  };

  deleteText = (from: number, to: number) => {
    const allTokens = this.collectTokensBetween(from, to);

    if (allTokens[0].localCursorPosition === allTokens[0].result.text.length) {
      allTokens.shift();
    }

    if (allTokens[allTokens.length - 1].localCursorPosition === 0) {
      allTokens.pop();
    }

    if (allTokens.length === 2 && allTokens[0].index === allTokens[1].index) {
      if (
        isWholeTextSelected(allTokens[0].result, {
          start: allTokens[0].localCursorPosition,
          end: allTokens[1].localCursorPosition,
        })
      ) {
        this.textCollection.splice(allTokens[0].index, 1);
      } else {
        const updatedText = `${allTokens[0].result.text.slice(
          0,
          allTokens[0].localCursorPosition
        )}${allTokens[0].result.text.slice(allTokens[1].localCursorPosition)}`;
        this.textCollection.splice(allTokens[0].index, 1, { ...allTokens[0].result, text: updatedText });
      }

      return [...this.textCollection];
    }

    return (this.textCollection = this.textCollection.reduce((collection, currentToken, index) => {
      if (index < allTokens[0].index || index > allTokens[allTokens.length - 1].index) {
        return [...collection, currentToken];
      }

      if (index === allTokens[0].index) {
        return [
          ...collection,
          { ...allTokens[0].result, text: allTokens[0].result.text.slice(0, allTokens[0].localCursorPosition) },
        ];
      }

      if (index === allTokens[allTokens.length - 1].index) {
        const token = allTokens[allTokens.length - 1];

        return [...collection, { ...token.result, text: token.result.text.slice(token.localCursorPosition) }];
      }

      return collection;
    }, []));
  };

  addNewText = (value: string, cursorPosition: number) => {
    const existingToken = this.findTextAt(cursorPosition) as TextSearchResult;

    if (!existingToken) {
      this.textCollection.push({ text: value });

      return [...this.textCollection];
    }

    const updatedText = `${existingToken.result.text.slice(
      0,
      existingToken.localCursorPosition
    )}${value}${existingToken.result.text.slice(existingToken.localCursorPosition)}`;
    this.textCollection.splice(existingToken.index, 1, { ...existingToken.result, text: updatedText });

    return [...this.textCollection];
  };

  getCorrespondingMarkdown = (): string => {
    let result = '';

    for (const token of this.textCollection) {
      result += convertTextToMarkdown(token);
    }

    return result;
  };

  applyFormatting = (coordinates: TextCoordinates, textFormatting: TextFormatting) => {
    const allTokens = this.collectTokensBetween(coordinates.start, coordinates.end);

    if (allTokens.length === 2 && allTokens[0].index === allTokens[1].index) {
      const formattedTokens = applyFormattingToText(
        allTokens[0].result,
        {
          start: allTokens[0].localCursorPosition,
          end: allTokens[1].localCursorPosition,
        },
        textFormatting
      );

      this.textCollection = this.textCollection.reduce((newCollection, currentValue, index) => {
        if (index !== allTokens[0].index) {
          newCollection.push(currentValue);
        } else {
          newCollection.push(...formattedTokens);
        }

        return newCollection;
      }, [])

      return this.textCollection;
    }
  };

  extractTextFrom = (tokenIndex: number, cursorPosition: number, end?: number): string | null => {
    const textToken = this.textCollection[tokenIndex];

    if (!textToken) return null;

    return textToken.text.slice(cursorPosition, end);
  };
}
