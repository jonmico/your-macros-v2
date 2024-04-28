import { useState } from 'react';
import styled from 'styled-components';
import { Macros } from '../../types/macros';
import { PurpleWideButton } from '../button/button';
import { useUser } from '../../hooks/useUser';
import { useAuth } from '../../hooks/useAuth';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  min-width: 20rem;
  max-width: 30rem;
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface SettingsMacroFormProps {
  macros: Macros;
  calories: number;
}

export default function SettingsMacroForm({
  macros,
  calories,
}: SettingsMacroFormProps) {
  const { updateMacros } = useUser();
  const {
    authState: { userId },
  } = useAuth();
  const [formCalories, setFormCalories] = useState(String(calories));
  const [formFat, setFormFat] = useState(String(macros.fat));
  const [formCarbs, setFormCarbs] = useState(String(macros.carbs));
  const [formProtein, setFormProtein] = useState(String(macros.protein));

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const updatedCaloriesAndMacros = {
      calories: Number(formCalories),
      macros: {
        fat: Number(formFat),
        carbs: Number(formCarbs),
        protein: Number(formProtein),
      },
    };

    if (userId === null) return;

    await updateMacros(
      userId,
      updatedCaloriesAndMacros.calories,
      updatedCaloriesAndMacros.macros
    );
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormHeader>
          <h2>Daily Intake Settings</h2>
        </FormHeader>
        <FormInputContainer>
          <label htmlFor='calories'>Calories</label>
          <input
            id={'calories'}
            type='number'
            value={String(formCalories)}
            onChange={(evt) => setFormCalories(evt.target.value)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='fat'>Fat</label>
          <input
            id={'fat'}
            type='number'
            value={formFat}
            onChange={(evt) => setFormFat(evt.target.value)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='carbs'>Carbs</label>
          <input
            id={'carbs'}
            type='number'
            value={formCarbs}
            onChange={(evt) => setFormCarbs(evt.target.value)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='protein'>Protein</label>
          <input
            id={'protein'}
            type='number'
            value={formProtein}
            onChange={(evt) => setFormProtein(evt.target.value)}
          />
        </FormInputContainer>
        <PurpleWideButton>Update</PurpleWideButton>
      </Form>
    </div>
  );
}
