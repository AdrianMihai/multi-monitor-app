import React, { useContext, useEffect, useState } from 'react';
import { StyledFormCloseButton, StyledFormattingButton, StyledToolsMenu } from './StyledComponents';
import Close from '../../../../assets/xmark.svg';
import Bold from '../../../../assets/bold.svg';
import Italic from '../../../../assets/italic.svg';
import Strikethrough from '../../../../assets/strikethrough.svg';
import { ClientRequestContext } from '../ClientRequestContext';
import { TextFormatting } from '../../../models/markdown/MarkdownTypes';

export const MarkupToolsMenu = ({ onFormattingApplied }) => {
  const { stopReplying } = useContext(ClientRequestContext);
  const [canApplyFormatting, setCanApplyFormatting] = useState(false);

  useEffect(() => {
    const onTextSelectionChange = () => setCanApplyFormatting(!document.getSelection().isCollapsed);

    document.addEventListener('selectionchange', onTextSelectionChange);

    return () => document.removeEventListener('selectionchange', onTextSelectionChange);
  }, []);

  return (
    <StyledToolsMenu>
      <StyledFormCloseButton onClick={stopReplying}>
        <Close />
      </StyledFormCloseButton>
      <StyledFormattingButton disabled={!canApplyFormatting} onClick={() => onFormattingApplied(TextFormatting.bold)}>
        <Bold />
      </StyledFormattingButton>
      <StyledFormattingButton disabled={!canApplyFormatting} onClick={() => onFormattingApplied(TextFormatting.italic)}>
        <Italic />
      </StyledFormattingButton>
      <StyledFormattingButton
        disabled={!canApplyFormatting}
        onClick={() => onFormattingApplied(TextFormatting.strikethrough)}
      >
        <Strikethrough />
      </StyledFormattingButton>
    </StyledToolsMenu>
  );
};
