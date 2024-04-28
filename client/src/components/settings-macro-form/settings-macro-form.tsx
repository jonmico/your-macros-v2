import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Macros } from '../../types/macros';
import { PurpleWideButton } from '../button/button';
import { useUser } from '../../hooks/useUser';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../toast/toast';

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

const ErrorText = styled.div`
  background-color: var(--color-red-100);
  color: var(--color-red-600);
  border: 1px solid var(--color-red-600);
  border-radius: var(--sm-radius);
  padding: 0.25rem 0.5rem;
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
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [formError, setFormError] = useState('');

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

    const {
      calories,
      macros: { fat, carbs, protein },
    } = updatedCaloriesAndMacros;

    if (calories < 0 || fat < 0 || carbs < 0 || protein || 0) {
      setFormError('Values cannot be negative.');
      return;
    }

    if (userId === null) return;

    const data = await updateMacros(
      userId,
      updatedCaloriesAndMacros.calories,
      updatedCaloriesAndMacros.macros
    );
    setIsToastOpen(true);

    if (data.updateSuccess === undefined) return;

    setIsUpdated(data.updateSuccess);
  }

  function handleOnChange(
    evt: React.ChangeEvent<HTMLInputElement>,
    setStateFn: React.Dispatch<SetStateAction<string>>
  ) {
    if (formError) setFormError('');
    setStateFn(evt.target.value);
  }

  return (
    <div>
      {isToastOpen && (
        <SettingsMacroFormToast
          isUpdated={isUpdated}
          closeToastWindow={() => setIsToastOpen(false)}
        />
      )}
      <Form onSubmit={handleSubmit}>
        {formError && <ErrorText>{formError}</ErrorText>}
        <FormHeader>
          <h2>Daily Intake Settings</h2>
        </FormHeader>
        <FormInputContainer>
          <label htmlFor='calories'>Calories</label>
          <input
            id={'calories'}
            type='number'
            value={String(formCalories)}
            onChange={(evt) => handleOnChange(evt, setFormCalories)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='fat'>Fat</label>
          <input
            id={'fat'}
            type='number'
            value={formFat}
            onChange={(evt) => handleOnChange(evt, setFormFat)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='carbs'>Carbs</label>
          <input
            id={'carbs'}
            type='number'
            value={formCarbs}
            onChange={(evt) => handleOnChange(evt, setFormCarbs)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <label htmlFor='protein'>Protein</label>
          <input
            id={'protein'}
            type='number'
            value={formProtein}
            onChange={(evt) => handleOnChange(evt, setFormProtein)}
          />
        </FormInputContainer>
        <PurpleWideButton>Update</PurpleWideButton>
      </Form>
    </div>
  );
}

interface SettingsMacroFormToastProps {
  closeToastWindow: () => void;
  isUpdated: boolean;
}

function SettingsMacroFormToast({
  closeToastWindow,
  isUpdated,
}: SettingsMacroFormToastProps) {
  const { userState } = useUser();

  if (userState === null) return null;

  const { error } = userState;

  const toastText = isUpdated
    ? 'Settings successfully updated.'
    : `Error: ${error}`;
  return <Toast closeToastWindow={closeToastWindow}>{toastText}</Toast>;
}
