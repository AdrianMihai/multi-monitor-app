import React, { useContext, useEffect, useState } from 'react';
import { StyledFormCloseButton, StyledFormattingButton, StyledToolsMenu } from './StyledComponents';
import { ClientRequestContext } from '../ClientRequestContext';
import { TextFormatting } from '../../../models/markdown/MarkdownTypes';
import { SVGIcon } from '../../common/icon/SVGIcon';
import { Icons } from '../../../resources/Icons';

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
        <SVGIcon iconName={Icons.xmark} />
      </StyledFormCloseButton>
      <StyledFormattingButton disabled={!canApplyFormatting} onClick={() => onFormattingApplied(TextFormatting.bold)}>
        <SVGIcon iconName={Icons.bold} />
      </StyledFormattingButton>
      <StyledFormattingButton disabled={!canApplyFormatting} onClick={() => onFormattingApplied(TextFormatting.italic)}>
        <SVGIcon iconName={Icons.italic} />
      </StyledFormattingButton>
      <StyledFormattingButton
        disabled={!canApplyFormatting}
        onClick={() => onFormattingApplied(TextFormatting.strikethrough)}
      >
        <SVGIcon iconName={Icons.strikethrough} />
      </StyledFormattingButton>
    </StyledToolsMenu>
  );
};
