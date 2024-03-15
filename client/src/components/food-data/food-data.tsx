import { FaXmark } from 'react-icons/fa6';
import { useFood } from '../../hooks/useFood';
import { ExitButton } from '../button/button';

export default function FoodData() {
  const { selectedFood, dispatch } = useFood();

  if (!selectedFood) {
    return <div>No food currently selected.</div>;
  }

  return (
    <div>
      {selectedFood.name}
      <ExitButton onClick={() => dispatch({ type: 'food/clearSelectedFood' })}>
        <FaXmark />
      </ExitButton>
    </div>
  );
}
