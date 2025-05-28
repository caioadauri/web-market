import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "header"
    "content";

  > main {
    grid-area: content;
    overflow-y: auto;
    padding: 24px;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;

  h1 {
    font-size: 28px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    margin-bottom: 24px;
  }
`;

export const ChartWrapper = styled.div`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

  canvas {
    width: 100% !important;
    height: 400px !important;
  }
`;

export const InfoBox = styled.div`
  margin-top: 32px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
  padding: 16px;
  border-radius: 8px;

  p {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 16px;
  }

  strong {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 18px;
  }
`;