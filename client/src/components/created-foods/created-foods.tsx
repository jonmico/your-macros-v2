import { Link, Outlet } from 'react-router-dom';
import { useFetchCreatedFoods } from '../../hooks/useFetchCreatedFoods';

export default function CreatedFoods() {
  const {
    error: fetchFoodsError,
    createdFoods,
    isLoading: isFetchingFoods,
  } = useFetchCreatedFoods();

  const createdFoodsList = createdFoods.map((f) => (
    <li>
      <Link to={`${f._id}`}>{f.name}</Link>
    </li>
  ));

  return (
    <div>
      <h1>This is the CreatedFoods Component.</h1>
      {isFetchingFoods ? <div>FETCHING</div> : <ul>{createdFoodsList}</ul>}
      <Outlet />
    </div>
  );
}
