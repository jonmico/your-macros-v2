import { useUser } from '../../hooks/useUser';
import SettingsMacroForm from '../settings-macro-form/settings-macro-form';
import { Spinner, CenterSpinnerContainer } from '../spinner/spinner';
import styled from 'styled-components';

const StyledSettings = styled.div`
  position: relative;
`;

export default function Settings() {
  const { userState } = useUser();

  if (!userState || !userState.userData) return null;

  const {
    userData: { macros, calories },
    isDBLoading,
  } = userState;

  return (
    <StyledSettings>
      {isDBLoading && (
        <CenterSpinnerContainer>
          <Spinner></Spinner>
        </CenterSpinnerContainer>
      )}
      <SettingsMacroForm calories={calories} macros={macros} />
    </StyledSettings>
  );
}
