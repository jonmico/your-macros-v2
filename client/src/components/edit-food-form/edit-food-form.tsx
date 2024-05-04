import { SetStateAction, useState } from 'react';
import { Food } from '../../types/food';
import { SettingsInput as EditInput } from '../../ui/input/input';
import { apiEditFood } from '../../services/food-api';
import { useFood } from '../../hooks/useFood';
import styled from 'styled-components';
import { Spinner } from '../spinner/spinner';

const StyledEditFoodForm = styled.div`
  position: relative;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;

interface EditFoodFormProps {
  food: Food;
  setFood: React.Dispatch<React.SetStateAction<Food | null>>;
}

export default function EditFoodForm({ food, setFood }: EditFoodFormProps) {
  const [name, setName] = useState(food.name);
  const [brand, setBrand] = useState(food.brand);
  const [servingSize, setServingSize] = useState(food.servingSize);
  const [fat, setFat] = useState(String(food.macros.fat));
  const [carbs, setCarbs] = useState(String(food.macros.carbs));
  const [protein, setProtein] = useState(String(food.macros.protein));
  const [formError, setFormError] = useState('');
  const {
    dispatch: foodDispatch,
    foodState: { isLoading },
  } = useFood();

  const fatNum = Number(fat);
  const carbsNum = Number(carbs);
  const proteinNum = Number(protein);

  const calories = fatNum * 9 + carbsNum * 4 + proteinNum * 4;

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!name || !brand || !servingSize) {
      setFormError('All fields must be complete.');
      return;
    }

    if (fatNum < 0 || carbsNum < 0 || proteinNum < 0) {
      setFormError('Macros cannot be negative.');
      return;
    }

    const foodEdit: Food = {
      name,
      brand,
      servingSize,
      calories: Number(calories),
      macros: {
        fat: fatNum,
        carbs: carbsNum,
        protein: proteinNum,
      },
    };

    if (!food._id) return;

    foodDispatch({ type: 'food/loading' });
    const data = await apiEditFood(food._id, foodEdit);

    if ('editFood' in data) {
      foodDispatch({
        type: 'food/editCreatedFood',
        payload: { food: data.editFood },
      });
      setFood(data.editFood);
    } else {
      foodDispatch({ type: 'food/error', payload: data.errorMessage });
    }
  }

  function handleOnChange(
    evt: React.ChangeEvent<HTMLInputElement>,
    stateFn: React.Dispatch<SetStateAction<string>>
  ) {
    if (formError) setFormError('');
    stateFn(evt.target.value);
  }

  return (
    <StyledEditFoodForm>
      {isLoading && (
        <SpinnerContainer>
          <Spinner></Spinner>
        </SpinnerContainer>
      )}

      <form onSubmit={handleSubmit}>
        {formError}
        <h2>Edit Food Form</h2>
        <div>
          <label htmlFor='name'>Name</label>
          <EditInput
            name={'name'}
            id={'name'}
            value={name}
            onChange={(evt) => handleOnChange(evt, setName)}
          />
        </div>
        <div>
          <label htmlFor='brand'>Brand</label>
          <EditInput
            value={brand}
            name={'brand'}
            id={'brand'}
            onChange={(evt) => handleOnChange(evt, setBrand)}
          />
        </div>
        <div>
          <label htmlFor='servingSize'>Serving Size</label>
          <EditInput
            value={servingSize}
            name={'servingSize'}
            id={'servingSize'}
            onChange={(evt) => handleOnChange(evt, setServingSize)}
          />
        </div>
        <div>
          <label htmlFor='calories'>Calories</label>
          <EditInput value={calories} disabled={true} />
        </div>
        <div>
          <label htmlFor='fat'>Fat</label>
          <EditInput
            value={fat}
            name={'fat'}
            id={'fat'}
            onChange={(evt) => handleOnChange(evt, setFat)}
          />
        </div>
        <div>
          <label htmlFor='carbs'>Carbs</label>
          <EditInput
            value={carbs}
            name={'carbs'}
            id={'carbs'}
            onChange={(evt) => handleOnChange(evt, setCarbs)}
          />
        </div>
        <div>
          <label htmlFor='protein'>Protein</label>
          <EditInput
            value={protein}
            name={'protein'}
            id={'protein'}
            onChange={(evt) => handleOnChange(evt, setProtein)}
          />
        </div>
        <button type={'submit'}>Save</button>
      </form>
    </StyledEditFoodForm>
  );
}
