import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useCookies } from 'react-cookie';

const StyledGlobalNav = styled.div`
  border-bottom: 1px solid var(--color-indigo-300);
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text);
  padding: 0.5rem 0;
  width: 90%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  font-size: 2rem;

  @media only screen and (max-width: 400px) {
    font-size: 1.5rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  font-size: 1rem;

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-indigo-600);
  }
`;

const NavButton = styled.button`
  font-weight: 500;
  font-size: 1rem;
  border: none;
  background-color: inherit;

  &:hover,
  &:active {
    cursor: pointer;
    color: var(--color-indigo-600);
  }
`;

const StyledAppLink = styled(Link)`
  font-weight: 500;
  font-size: 1rem;

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-indigo-600);
  }
`;

export default function GlobalNav() {
  const {
    logout,
    authState: { isLoggedIn },
  } = useAuth();
  const [, , removeCookie] = useCookies(['token']);

  const yourMacrosLink = isLoggedIn ? '/app' : '/';

  function handleLogoutClick() {
    logout();
    removeCookie('token', { path: '/' });
  }

  return (
    <StyledGlobalNav>
      <StyledNav>
        <StyledLink to={yourMacrosLink}>YourMacros</StyledLink>
        <LinkContainer>
          {isLoggedIn ? (
            <>
              <StyledAppLink to={'/app'}>App</StyledAppLink>
              <NavButton as={'button'} onClick={handleLogoutClick}>
                Logout
              </NavButton>
            </>
          ) : (
            <>
              <StyledNavLink to={'/login'}>Login</StyledNavLink>
              <StyledNavLink to={'/register'}>Register</StyledNavLink>
            </>
          )}
        </LinkContainer>
      </StyledNav>
    </StyledGlobalNav>
  );
}
