import { useFetchFood } from '../../hooks/useFetchFood';

export default function CreatedFood() {
  const { food, isLoading: isFetchFoodLoading } = useFetchFood();

  return (
    <div>
      <h1>This is the CreatedFood Component.</h1>
      <div>
        {isFetchFoodLoading ? (
          <div>We are loading</div>
        ) : (
          <div>{food?.name}</div>
        )}{' '}
      </div>
    </div>
  );
}
