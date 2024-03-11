import { useState } from 'react';
import { useFood } from '../../hooks/useFood';

export default function AddMeal() {
  const [searchText, setSearchText] = useState('');
  const { error, searchedFoods, searchFoodsByText } = useFood();

  const searchedFoodsList = searchedFoods.map((food) => (
    <li key={food._id}>{food.name}</li>
  ));

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    await searchFoodsByText(searchText);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name={'searchText'}
          id={'searchText'}
          value={searchText}
          onChange={(evt) => setSearchText(evt.target.value)}
        />
        <button type={'submit'}>submit</button>
      </form>
      <div>
        {error && <div>{error}</div>}
        {searchedFoods && <ul>{searchedFoodsList}</ul>}
      </div>
    </div>
  );
}
