import { Link, Outlet } from 'react-router-dom';
import { useFetchCreatedFoods } from '../../hooks/useFetchCreatedFoods';
import styled from 'styled-components';
import { Spinner } from '../spinner/spinner';

const StyledCreatedFoods = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const List = styled.ul`
  border: 1px solid var(--color-indigo-300);
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLink = styled(Link)`
  padding: 0.75rem;
  border-radius: 8px;
  display: block;
  color: var(--color-gray-800);
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;

  &:hover {
    background-color: var(--color-blue-200);
    color: var(--color-gray-900);
  }
`;

const CreatedFoodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CreatedFoodsHeader = styled.h2`
  color: var(--color-gray-800);
`;

export default function CreatedFoods() {
  const { createdFoods, isLoading: isFetchingFoods } = useFetchCreatedFoods();

  const createdFoodsList = createdFoods.map((food) => (
    <li key={food._id}>
      <StyledLink to={`${food._id}`}>{food.name}</StyledLink>
    </li>
  ));

  const output = isFetchingFoods ? (
    <CreatedFoodsSpinner />
  ) : (
    <List>{createdFoodsList}</List>
  );

  return (
    <StyledCreatedFoods>
      <CreatedFoodsContainer>
        <CreatedFoodsHeader>Created Foods</CreatedFoodsHeader>
        {output}
      </CreatedFoodsContainer>
      <Outlet />
    </StyledCreatedFoods>
  );
}

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;

function CreatedFoodsSpinner() {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
}
