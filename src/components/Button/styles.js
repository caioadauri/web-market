import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  background-color: ${( { theme }) => theme.COLORS.GREEN };
  color: ${( { theme }) => theme.COLORS.BACKGROUD_800 };

  height: 56px;
  border: 0;
  pad: 0 16px;
  margin-top: 16px;
  border-radius: 10px;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
  }
`;