import { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../../hooks/useUser';
import { apiCreateFood } from '../../services/food-api';
import { Food } from '../../types/food';
import { ErrorText } from '../../ui/error-text/error-text';
import { FormInputContainer } from '../../ui/form-input-container/form-input-container';
import { Input } from '../../ui/input/input';
import { calcCalories } from '../../utils/calcCalories';
import { PrimaryButton } from '../button/button';
import { Spinner } from '../spinner/spinner';
import Toast from '../toast/toast';

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
`;

const LoadingContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-indigo-500);
  background-color: var(--color-gray-200);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  gap: 0.25rem;
`;

type FormStateType = {
  brand: string;
  name: string;
  servingSize: string;
  carbs: string;
  fat: string;
  protein: string;
};

export default function AddFoodForm() {
  const { userId, dispatch: userDispatch } = useUser();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    const data: {
      food?: Food;
      errorMessage?: string;
    } = await apiCreateFood(food, userId);
    setIsLoading(false);

    if (data.errorMessage) {
      setIsToastOpen(true);
      setToastText(data.errorMessage);
      return;
    }

    if (data.food) {
      setIsToastOpen(true);
      setToastText(`Successfully created food: ${data.food.name}!`);
      setFormState({
        brand: '',
        name: '',
        servingSize: '',
        carbs: '',
        fat: '',
        protein: '',
      });

      if (data.food._id) {
        userDispatch({ type: 'user/setCreatedFoods', payload: data.food._id });
      }
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        {isLoading && (
          <LoadingContainer>
            <SpinnerContainer>
              <Spinner />
              <div>Creating food...</div>
            </SpinnerContainer>
          </LoadingContainer>
        )}
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
