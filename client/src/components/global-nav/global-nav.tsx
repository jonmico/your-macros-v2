import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledGlobalNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text);
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  font-size: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  font-size: 1.25rem;

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--accent);
  }
`;

export default function GlobalNav() {
  return (
    <StyledGlobalNav>
      <StyledLink to={'/'}>YourMacros</StyledLink>
      <LinkContainer>
        <StyledNavLink to={'/login'}>Login</StyledNavLink>
        <StyledNavLink to={'/register'}>Register</StyledNavLink>
      </LinkContainer>
    </StyledGlobalNav>
  );
}
