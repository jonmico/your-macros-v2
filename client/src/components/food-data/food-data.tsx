import { useFood } from '../../hooks/useFood';

export default function FoodData() {
  const { selectedFood, dispatch } = useFood();

  if (!selectedFood) {
    return <div>No food!</div>;
  }

  return <div>{selectedFood.name}</div>;
}
