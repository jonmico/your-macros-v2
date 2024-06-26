import {
  FaBook,
  FaHouseChimney,
  FaPenToSquare,
  FaUser,
  FaUtensils,
} from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledAppNav = styled.nav`
  border-right: 1px solid var(--color-indigo-300);
  height: 100vh;
  padding: 1rem 1rem 1rem 0;
`;

const StyledUL = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledNavLink = styled(NavLink)`
  width: 100%;
  padding: 1.25rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  & svg {
    font-size: 1.5rem;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--color-indigo-600);
    color: var(--color-slate-100);
  }
`;

export default function AppNav() {
  return (
    <StyledAppNav>
      <StyledUL>
        <StyledNavLink to={'dashboard'}>
          <FaHouseChimney />
          Dashboard
        </StyledNavLink>
        <StyledNavLink to={'add-meal'}>
          <FaUtensils />
          Add Meal
        </StyledNavLink>
        <StyledNavLink to={'food-logs'}>
          <FaBook />
          Food Logs
        </StyledNavLink>
        <StyledNavLink to={'add-food'}>
          <FaPenToSquare />
          Create Food
        </StyledNavLink>
        <StyledNavLink to={'user'}>
          <FaUser />
          User
        </StyledNavLink>
      </StyledUL>
    </StyledAppNav>
  );
}
