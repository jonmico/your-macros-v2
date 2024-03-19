import { useState } from 'react';
import { useFood } from '../../hooks/useFood';
import SearchBar from '../search-bar/search-bar';
import { Food } from '../../types/food';
import { FoodActions } from '../../types/action-types/food-actions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface StyledFoodSearchProps {
  $isSearchedFoods: boolean;
}

const StyledFoodSearch = styled.div<StyledFoodSearchProps>`
  padding: 1.5rem;
  border: 1px solid var(--color-indigo-500);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListContainer = styled.div`
  border-radius: 4px;
  background-color: var(--color-blue-100);
  border: 1px solid var(--color-blue-400);
`;

const SearchText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 5rem;
  font-weight: 500;
  color: var(--color-gray-700);
  font-size: 1rem;
  padding: 1rem;
`;

export default function FoodSearch() {
  const [searchText, setSearchText] = useState('');
  const {
    error,
    searchedFoods,
    searchFoodsByText,
    dispatch: foodDispatch,
  } = useFood();

  const isSearchedFoods = !!searchedFoods.length;

  function handleSearchBarChange(evt: React.ChangeEvent<HTMLInputElement>) {
    foodDispatch({ type: 'food/clearError' });
    setSearchText(evt.target.value);
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!searchText) return;
    await searchFoodsByText(searchText);
  }

  return (
    <StyledFoodSearch $isSearchedFoods={isSearchedFoods}>
      <form onSubmit={handleSubmit}>
        <SearchBar
          name={'searchText'}
          id={'searchText'}
          value={searchText}
          onChangeFn={handleSearchBarChange}
          placeholder={'Search foods'}
        />
      </form>
      <ListContainer>
        {!searchedFoods.length && !error ? (
          <SearchText>
            Search the database for foods and add them to a meal
          </SearchText>
        ) : (
          <SearchedFoodsList
            foodDispatch={foodDispatch}
            searchedFoods={searchedFoods}
            error={error}
          />
        )}
      </ListContainer>
    </StyledFoodSearch>
  );
}

const StyledListItem = styled.li`
  padding: 1rem;

  &:hover {
    cursor: pointer;
    background-color: var(--color-blue-200);
  }

  &:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:first-of-type {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

interface SearchedFoodsListProps {
  searchedFoods: Food[];
  error: string;
  foodDispatch: React.Dispatch<FoodActions>;
}

function SearchedFoodsList({
  searchedFoods,
  error,
  foodDispatch,
}: SearchedFoodsListProps) {
  const searchedFoodsList = searchedFoods.map((food) => (
    <StyledListItem
      onClick={() =>
        foodDispatch({ type: 'food/setSelectedFood', payload: food })
      }
      key={food._id}
    >
      {food.name}
    </StyledListItem>
  ));

  if (error) {
    return <Error error={error} />;
  }

  return <ul>{searchedFoodsList}</ul>;
}

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

function Error({ error }: ErrorProps) {
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
