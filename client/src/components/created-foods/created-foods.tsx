import { Link, Outlet } from 'react-router-dom';
import { useFetchCreatedFoods } from '../../hooks/useFetchCreatedFoods';
import styled from 'styled-components';

const StyledCreatedFoods = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export default function CreatedFoods() {
  const { createdFoods, isLoading: isFetchingFoods } = useFetchCreatedFoods();

  const createdFoodsList = createdFoods.map((f) => (
    <li>
      <Link to={`${f._id}`}>{f.name}</Link>
    </li>
  ));

  return (
    <StyledCreatedFoods>
      <div>
        <h2>Created Foods</h2>
        {isFetchingFoods ? <div>FETCHING</div> : <ul>{createdFoodsList}</ul>}
      </div>
      <Outlet />
    </StyledCreatedFoods>
  );
}
