import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  border: none;
  border-radius: 10px;
  padding: 22px;
  margin-bottom: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  > img {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
  }

  > h1 {
    font-weight: 700;
    font-size: 20px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    margin-top: 8px;
  }

  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`;