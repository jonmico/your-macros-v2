import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledUserNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-gray-600);
  border-bottom: 1px solid transparent;
  padding: 0 0.5rem 2px 0.5rem;
  transition: color 200ms ease, border-bottom 200ms ease;

  &.active,
  &:hover {
    color: var(--color-indigo-600);
    border-bottom: 1px solid var(--color-indigo-600);
  }
`;

export default function UserNav() {
  return (
    <StyledUserNav>
      <StyledNavLink to={'settings'}>Settings</StyledNavLink>
      <StyledNavLink to={'account'}>Account</StyledNavLink>
      <StyledNavLink to={'created-foods'}>Created Foods</StyledNavLink>
    </StyledUserNav>
  );
}
