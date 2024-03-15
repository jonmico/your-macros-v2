import { useState } from 'react';
import { useFood } from '../../hooks/useFood';
import SearchBar from '../search-bar/search-bar';

export default function FoodSearch() {
  const [searchText, setSearchText] = useState('');
  const {
    error,
    searchedFoods,
    searchFoodsByText,
    dispatch: foodDispatch,
  } = useFood();

  const searchedFoodsList = searchedFoods.map((food) => (
    <li
      onClick={() =>
        foodDispatch({ type: 'food/setSelectedFood', payload: food })
      }
      key={food._id}
    >
      {food.name}
    </li>
  ));

  function handleSearchBarChange(evt: React.ChangeEvent<HTMLInputElement>) {
    foodDispatch({ type: 'food/clearError' });
    setSearchText(evt.target.value);
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!searchText) return;

    foodDispatch({ type: 'food/clearSearchedFoods' });
    await searchFoodsByText(searchText);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SearchBar
          name={'searchText'}
          id={'searchText'}
          value={searchText}
          onChangeFn={handleSearchBarChange}
        />
      </form>
      <div>
        {error && <div>{error}</div>}
        {searchedFoods && <ul>{searchedFoodsList}</ul>}
      </div>
    </>
  );
}
