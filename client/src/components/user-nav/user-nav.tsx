import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledUserNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export default function UserNav() {
  return (
    <StyledUserNav>
      <NavLink to={'settings'}>Settings</NavLink>
      <NavLink to={'account'}>Account</NavLink>
      <NavLink to={'created-foods'}>Created Foods</NavLink>
    </StyledUserNav>
  );
}
