import React, { useState } from 'react';
import styled from 'styled-components';
import { useFood } from '../../hooks/useFood';
import { Food } from '../../types/food';
import SearchBar from '../search-bar/search-bar';
import Error from './subcomponents/error';
import SearchedFoodListItem from './subcomponents/searched-food-list-item';

const StyledFoodSearch = styled.div`
  padding: 1.5rem;
  border: 1px solid var(--color-indigo-500);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: min-content;
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

const SearchedFoodsList = styled.ul`
  max-height: 20rem;
  overflow: auto;
`;

interface FoodSearchProps {
  foods: { food: Food; servings: number }[];
  handleAddClick: (
    evt: React.MouseEvent<HTMLButtonElement>,
    food: Food
  ) => void;
}

export default function FoodSearch({ foods, handleAddClick }: FoodSearchProps) {
  const [searchText, setSearchText] = useState('');
  const { foodState, searchFoodsByText, dispatch: foodDispatch } = useFood();
  const { searchedFoods, error } = foodState;

  // Renders the list of searched foods.
  const searchedFoodsListItems = searchedFoods.map((food) => (
    <SearchedFoodListItem
      handleAddClick={handleAddClick}
      foods={foods}
      food={food}
      key={food._id}
    />
  ));

  // Handles situation where there is an error.
  const searchedFoodsOutput = error ? (
    <Error error={error} />
  ) : (
    <SearchedFoodsList>{searchedFoodsListItems}</SearchedFoodsList>
  );

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
    <StyledFoodSearch>
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
          searchedFoodsOutput
        )}
      </ListContainer>
    </StyledFoodSearch>
  );
}
