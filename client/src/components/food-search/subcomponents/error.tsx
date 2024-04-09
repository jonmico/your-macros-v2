import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
`;

const AddMealLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  border: 1px solid var(--color-green-600);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  background-color: var(--color-green-300);
  transition: border-radius 0.25s ease-in-out,
    background-color 0.25s ease-in-out;

  &:hover {
    border-radius: 20px;
  }
`;

const ErrorText = styled.div`
  color: var(--color-gray-700);
  font-weight: 700;
  font-size: 1.25rem;
`;

interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps) {
  return (
    <StyledError>
      <ErrorText>{error}</ErrorText>
      <AddMealLinkContainer>
        Can't find what you're looking for?
        <StyledLink to={'/app/add-food'}>Add a food to the database</StyledLink>
      </AddMealLinkContainer>
    </StyledError>
  );
}
