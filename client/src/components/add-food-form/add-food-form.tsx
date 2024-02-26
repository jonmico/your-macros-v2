import styled from 'styled-components';
import { PrimaryButton } from '../button/button';
import { useState } from 'react';
import { Input } from '../input/input';

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

type FormStateType = {
  brand: string;
  name: string;
  servingSize: string;
  carbs: string;
  fat: string;
  protein: string;
  calories: string;
};

export default function AddFoodForm() {
  const [formState, setFormState] = useState<FormStateType>({
    brand: '',
    name: '',
    servingSize: '',
    carbs: '',
    fat: '',
    protein: '',
    calories: '',
  });

  const [errors, setErrors] = useState<FormStateType>({
    brand: '',
    name: '',
    servingSize: '',
    carbs: '',
    fat: '',
    protein: '',
    calories: '',
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
      calories: '',
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

    console.log('You tried to submit the form!');
  }

  return (
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
        {errors.brand && <div>{errors.brand}</div>}
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
        {errors.name && <div>{errors.name}</div>}
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
        {errors.servingSize && <div>{errors.servingSize}</div>}
      </FormInputContainer>

      <PrimaryButton type={'submit'}>Create</PrimaryButton>
    </StyledForm>
  );
}
