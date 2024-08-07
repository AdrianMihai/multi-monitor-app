import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { StyledFormContainer, StyledInputRow, StyledResponseInput, StyledSendButton } from './StyledComponents';
import { generateMarkup } from '../../../models/TextMarkup';
import { MarkupToolsMenu } from './MarkupToolsMenu';
import { useTextSelectionMemo } from '../../common/UseTextSelectionMemo';
import { calculateTextCoordinates } from '../../../utils/TextSelectionUtils';
import { DecoratedText, TextFormatting } from '../../../models/markdown/MarkdownTypes';
import { DecoratedTextCollection } from '../../../models/markdown/DecoratedTextCollection';
import { useBeforeInputHandling } from './UseBeforeInputHandling';
import { ClientRequestContext } from '../ClientRequestContext';
import { SVGIcon } from '../../common/icon/SVGIcon';
import { Icons } from '../../../resources/Icons';

export const ResponseForm = () => {
  const responseInput = useRef<HTMLDivElement | null>(null);
  const [markupTextTokens, setMarkupTextTokens] = useState<DecoratedText[]>([]);
  const { memoizeCoordinates, forceNextCoordinates } = useTextSelectionMemo(responseInput);
  const handleInputEvent = useBeforeInputHandling(markupTextTokens);
  const { sendReply } = useContext(ClientRequestContext);

  useLayoutEffect(() => {
    if (!responseInput.current) return;

    (responseInput.current as HTMLElement).focus();
  }, []);

  useLayoutEffect(() => {
    if (!responseInput.current) return;

    const inputElement = responseInput.current;

    console.log('input registered on', inputElement);

    const onBeforeInput = (ev) => {
      console.log(ev.inputType, ev.data);
      ev.preventDefault();
      const result = handleInputEvent(ev);

      if (!result) return;

      forceNextCoordinates(result.textSelectionCoordinates);
      setMarkupTextTokens(result.updatedTextTokens);
    };

    inputElement.addEventListener('beforeinput', onBeforeInput);

    return () => inputElement.removeEventListener('beforeinput', onBeforeInput);
  }, [handleInputEvent, forceNextCoordinates]);

  console.log(markupTextTokens);

  const onFormattingApplied = (textFormatting: TextFormatting) => {
    let { start, end } = calculateTextCoordinates(responseInput.current);

    if (start > end) {
      [start, end] = [end, start];
    }

    memoizeCoordinates();
    setMarkupTextTokens(new DecoratedTextCollection(markupTextTokens).applyFormatting({ start, end }, textFormatting));
  };

  return (
    <StyledFormContainer>
      <MarkupToolsMenu onFormattingApplied={onFormattingApplied} />
      <StyledInputRow>
        <StyledResponseInput
          ref={responseInput}
          dangerouslySetInnerHTML={{
            __html: generateMarkup(new DecoratedTextCollection(markupTextTokens).getCorrespondingMarkdown()),
          }}
        />
        <StyledSendButton
          onClick={() => sendReply(new DecoratedTextCollection(markupTextTokens).getCorrespondingMarkdown())}
        >
          <SVGIcon iconName={Icons.send} />
        </StyledSendButton>
      </StyledInputRow>
    </StyledFormContainer>
  );
};
