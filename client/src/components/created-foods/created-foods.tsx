import { Link, Outlet } from 'react-router-dom';
import { useFetchCreatedFoods } from '../../hooks/useFetchCreatedFoods';
import styled from 'styled-components';
import { Spinner } from '../spinner/spinner';

const StyledCreatedFoods = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export default function CreatedFoods() {
  const { createdFoods, isLoading: isFetchingFoods } = useFetchCreatedFoods();

  const createdFoodsList = createdFoods.map((food) => (
    <li key={food._id}>
      <Link to={`${food._id}`}>{food.name}</Link>
    </li>
  ));

  const output = isFetchingFoods ? (
    <CreatedFoodsSpinner />
  ) : (
    <ul>{createdFoodsList}</ul>
  );

  return (
    <StyledCreatedFoods>
      <div>
        <h2>Created Foods</h2>
        {output}
      </div>
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
