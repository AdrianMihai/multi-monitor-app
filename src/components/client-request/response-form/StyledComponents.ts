import styled from 'styled-components';
import { SimpleButton } from '../../common/button/SimpleButton';

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
`;

export const StyledToolsMenu = styled.div`
  display: flex;
  margin: 5px auto;
  width: 100%;
`;

export const StyledFormCloseButton = styled(SimpleButton)`
  margin-right: 10px;
`;

export const StyledFormattingButton = styled(SimpleButton)`
  border: none;
  margin-right: 5px;
`;

export const StyledInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: middle;
  width: 100%;
`;

export const StyledResponseInput = styled.div.attrs({ contentEditable: true })`
  width: calc(100% - 40px);
  max-height: 50px;
  border-radius: 2px;
  border: 1px solid #696b70;
  padding: 2px;
  outline: none;
  white-space: pre-wrap;

  &:focus {
    border-color: #1e0559;
  }

  & p {
    margin: 0;
  }
`;

export const StyledSendButton = styled(SimpleButton)`
  height: 100%;
  justify-content: center;
`;
