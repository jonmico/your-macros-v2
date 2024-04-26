import { useState } from 'react';
import styled from 'styled-components';
import { Macros } from '../../types/macros';
import { PurpleWideButton } from '../button/button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
`;

interface SettingsMacroFormProps {
  macros: Macros;
  calories: number;
}

export default function SettingsMacroForm({
  macros,
  calories,
}: SettingsMacroFormProps) {
  const [formCalories, setFormCalories] = useState(calories);
  const [formFat, setFormFat] = useState(macros.fat);
  const [formCarbs, setFormCarbs] = useState(macros.carbs);
  const [formProtein, setFormProtein] = useState(macros.protein);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const updatedCaloriesAndMacros = {
      calories: formCalories,
      macros: {
        fat: formFat,
        carbs: formCarbs,
        protein: formProtein,
      },
    };

    console.log(updatedCaloriesAndMacros);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='calories'>Calories</label>
          <input
            id={'calories'}
            type='number'
            value={formCalories}
            onChange={(evt) => setFormCalories(Number(evt.target.value))}
          />
        </div>
        <div>
          <label htmlFor='fat'>Fat</label>
          <input
            id={'fat'}
            type='number'
            value={formFat}
            onChange={(evt) => setFormFat(Number(evt.target.value))}
          />
        </div>
        <div>
          <label htmlFor='carbs'>Carbs</label>
          <input
            id={'carbs'}
            type='number'
            value={formCarbs}
            onChange={(evt) => setFormCarbs(Number(evt.target.value))}
          />
        </div>
        <div>
          <label htmlFor='protein'>Protein</label>
          <input
            id={'protein'}
            type='number'
            value={formProtein}
            onChange={(evt) => setFormProtein(Number(evt.target.value))}
          />
        </div>
        <PurpleWideButton>Submit</PurpleWideButton>
      </Form>
    </div>
  );
}
