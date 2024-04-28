import { useUser } from '../../hooks/useUser';
import SettingsMacroForm from '../settings-macro-form/settings-macro-form';

export default function Settings() {
  const { userState } = useUser();

  if (!userState || !userState.userData) return null;

  const {
    userData: { macros, calories },
    isDBLoading,
  } = userState;

  return (
    <>
      {isDBLoading && <div>'DB IS LOADING'</div>}
      <SettingsMacroForm calories={calories} macros={macros} />
    </>
  );
}
