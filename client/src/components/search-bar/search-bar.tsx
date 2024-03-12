import styled from 'styled-components';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const StyledSearchBar = styled.div`
  position: relative;

  & svg {
    position: absolute;
    font-size: 1.5rem;
    top: 8px;
    left: 12px;
    color: var(--color-gray-500);
  }
`;

const StyledInput = styled.input`
  height: 2.5rem;
  border-radius: 20px;
  border: 1px solid var(--color-gray-400);
  width: 100%;
  padding: 0.25rem 0.25rem 0.25rem 2.75rem;
  background-color: inherit;
  transition: background-color 0.25s ease-in-out;

  &:focus-visible {
    outline: 1.5px solid var(--color-indigo-600);
    background-color: var(--color-slate-200);
  }
`;

interface SearchBarProps {
  name: string;
  id: string;
  value: string;
  onChangeFn: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  name,
  id,
  value,
  onChangeFn,
}: SearchBarProps) {
  return (
    <StyledSearchBar>
      <FaMagnifyingGlass />

      <StyledInput
        type='text'
        name={name}
        id={id}
        value={value}
        onChange={onChangeFn}
      />
    </StyledSearchBar>
  );
}
