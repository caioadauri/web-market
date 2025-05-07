import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 16px;

  input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #498222;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    transition: background 0.2s ease;

    &:checked {
      background-color: #498222;
    }

    &:checked::after {
      content: '✓';
      color: white;
      position: absolute;
      top: 1px;
      left: 4px;
      font-size: 14px;
    }
  }

  span {
    color: #498222;
    user-select: none;
  }
`;
