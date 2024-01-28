import { styled } from 'styled-components';

export const StyledNavItem = styled.li<{ $isActive: boolean }>`
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.6')};
`;

export const StyledNavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 43px;
  box-sizing: border-box;
  padding: 7px;
  border-left: 2px solid gray;
`;

export const StyledPanelsNavbarItemsList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  list-style-type: none;
`;
