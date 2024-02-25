import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledGlobalNav = styled.div`
  padding: 1rem 0;
  background-color: var(--secondary);
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text);
  width: 75%;
  min-width: 360px;
  margin: 0 auto;

  @media only screen and (max-width: 900px) {
    width: 100%;
    padding: 0 0.5rem;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  font-size: 2rem;
  color: inherit;

  @media only screen and (max-width: 900px) {
    font-size: 1.75rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    color: var(--text-700);
  }
`;

export default function GlobalNav() {
  return (
    <StyledGlobalNav>
      <StyledNav>
        <StyledLink to={'/'}>YourMacros</StyledLink>
        <LinkContainer>
          <StyledNavLink to={'/login'}>Login</StyledNavLink>
          <StyledNavLink to={'/register'}>Register</StyledNavLink>
        </LinkContainer>
      </StyledNav>
    </StyledGlobalNav>
  );
}
