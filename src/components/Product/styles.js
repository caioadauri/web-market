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
  position: relative;

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

  > h2 {
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

export const EditIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.COLORS.GREEN};
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  }
`;

export const DeleteIcon = styled.div`
  background: ${({ theme }) => theme.COLORS.RED};
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  }
`;