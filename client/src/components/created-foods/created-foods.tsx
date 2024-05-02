import { Link, NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useFood } from '../../hooks/useFood';
import { Spinner } from '../spinner/spinner';

const StyledCreatedFoods = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  padding: 0.75rem;
  display: block;
  color: var(--color-gray-800);
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  &.active {
    background-color: var(--color-indigo-100);
  }

  &:hover {
    background-color: var(--color-indigo-200);
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
  const {
    foodState: { createdFoods, isFetching: isFetchingFoods },
  } = useFood();

  const listOutput =
    createdFoods.length === 0 ? (
      <NoCreatedFoods />
    ) : (
      <List>
        {createdFoods.map((food) => (
          <li key={food._id}>
            <StyledNavLink to={`${food._id}`}>{food.name}</StyledNavLink>
          </li>
        ))}
      </List>
    );

  const output = isFetchingFoods ? <CreatedFoodsSpinner /> : listOutput;

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

const StyledNoCreatedFoods = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-gray-700);
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: var(--color-indigo-600);
  color: var(--color-slate-100);
  border-radius: 4px;
  transition: background-color 200ms ease-in-out,
    border-radius 200ms ease-in-out;

  &:hover {
    background-color: var(--color-indigo-700);
    border-radius: 16px;
  }
`;

function NoCreatedFoods() {
  return (
    <StyledNoCreatedFoods>
      <div>You haven't created any foods yet.</div>
      <StyledLink to={'/app/add-food'}>Create a food</StyledLink>
    </StyledNoCreatedFoods>
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
