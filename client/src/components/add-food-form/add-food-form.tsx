import styled from 'styled-components';
import { PrimaryButton } from '../button/button';
import { useState } from 'react';
import { Input } from '../input/input';
import { calcCalories } from '../../utils/calcCalories';
import { Food } from '../../types/food';
import { apiCreateFood } from '../../services/food-api';
import Toast from '../toast/toast';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ErrorText = styled.div`
  color: var(--color-red-500);
  font-size: 0.9rem;
`;

type FormStateType = {
  brand: string;
  name: string;
  servingSize: string;
  carbs: string;
  fat: string;
  protein: string;
};

// TODO: Make loading spinner
// TODO: Make some type of toast message that tells user their food was created

export default function AddFoodForm() {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastText, setToastText] = useState('');
  const [formState, setFormState] = useState<FormStateType>({
    brand: '',
    name: '',
    servingSize: '',
    carbs: '',
    fat: '',
    protein: '',
  });

  const [errors, setErrors] = useState<FormStateType>({
    brand: '',
    name: '',
    servingSize: '',
    carbs: '',
    fat: '',
    protein: '',
  });

  function handleFormStateChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));

    setErrors((prevState) => {
      if (errors[evt.target.name as keyof FormStateType]) {
        return { ...prevState, [evt.target.name]: '' };
      }
      return prevState;
    });
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const errors: FormStateType = {
      brand: '',
      name: '',
      servingSize: '',
      carbs: '',
      fat: '',
      protein: '',
    };

    let hasErrors = false;

    for (const key in formState) {
      if (formState[key as keyof FormStateType] === '') {
        errors[key as keyof FormStateType] = 'Required.';
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(errors);
      return;
    }

    const numMacros = {
      carbs: parseInt(formState.carbs),
      protein: parseInt(formState.protein),
      fat: parseInt(formState.fat),
    };

    const calories = calcCalories(numMacros);

    const food: Food = {
      brand: formState.brand,
      name: formState.name,
      servingSize: formState.servingSize,
      macros: numMacros,
      calories,
    };

    const userId = '65d809272881dbdd5706bf94';

    const data: { food?: Food; errorMessage?: string } = await apiCreateFood(
      food,
      userId
    );

    if (data.errorMessage) {
      setIsToastOpen(true);
      setToastText(data.errorMessage);
      return;
    }

    if (data.food) {
      setIsToastOpen(true);
      setToastText(`Successfully created food: ${data.food.name}`);
      // TODO: What if request fails?
      setFormState({
        brand: '',
        name: '',
        servingSize: '',
        carbs: '',
        fat: '',
        protein: '',
      });
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Create a Food</h2>
        <FormInputContainer>
          <label htmlFor='brand'>Brand</label>
          <Input
            type='text'
            name={'brand'}
            id={'brand'}
            placeholder={'Required field'}
            value={formState.brand}
            onChange={handleFormStateChange}
          />
          {errors.brand && <ErrorText>{errors.brand}</ErrorText>}
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='name'>Name</label>
          <Input
            type='text'
            name={'name'}
            id={'name'}
            placeholder={'Required field'}
            value={formState.name}
            onChange={handleFormStateChange}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='servingSize'>Serving Size</label>
          <Input
            type='text'
            name={'servingSize'}
            id={'servingSize'}
            placeholder={'Required field'}
            value={formState.servingSize}
            onChange={handleFormStateChange}
          />
          {errors.servingSize && <ErrorText>{errors.servingSize}</ErrorText>}
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='fat'>Fat (g)</label>
          <Input
            type='number'
            name={'fat'}
            id={'fat'}
            placeholder={'Required field'}
            value={formState.fat}
            onChange={handleFormStateChange}
          />
          {errors.fat && <ErrorText>{errors.fat}</ErrorText>}
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='carbs'>Carbs (g)</label>
          <Input
            type='number'
            name={'carbs'}
            id={'carbs'}
            placeholder={'Required field'}
            value={formState.carbs}
            onChange={handleFormStateChange}
          />
          {errors.carbs && <ErrorText>{errors.carbs}</ErrorText>}
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='protein'>Protein (g)</label>
          <Input
            type='number'
            name={'protein'}
            id={'protein'}
            placeholder={'Required field'}
            value={formState.protein}
            onChange={handleFormStateChange}
          />
          {errors.protein && <ErrorText>{errors.protein}</ErrorText>}
        </FormInputContainer>

        <PrimaryButton type={'submit'}>Create</PrimaryButton>
      </StyledForm>
      {isToastOpen && (
        <Toast closeToastWindow={() => setIsToastOpen(false)}>
          {toastText}
        </Toast>
      )}
    </>
  );
}
