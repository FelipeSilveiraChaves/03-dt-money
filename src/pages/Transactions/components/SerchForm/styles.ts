import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    border-radius: 6px;
    padding: 1rem;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['green-300']}; // Corrigido
    font-weight: bold;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme['green-500']}; // Corrigido
      border: 1px solid ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      transition: all 0.2s;
    }
  }
`
