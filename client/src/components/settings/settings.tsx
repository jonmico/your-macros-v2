import { useUser } from '../../hooks/useUser';
import SettingsMacroForm from '../settings-macro-form/settings-macro-form';

export default function Settings() {
  const { userState } = useUser();

  if (!userState || !userState.userData) return null;

  const { macros, calories } = userState.userData;

  return <SettingsMacroForm calories={calories} macros={macros} />;
}
