import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

const StyledHome = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.5rem;
`;

const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 2rem;
  gap: 0.25rem;
`;

const MainText = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

const SecondaryText = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const Text = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const SimpleText = styled(Text)`
  color: var(--color-green-600);
`;

const PremiumText = styled(Text)`
  color: var(--color-blue-600);
`;

const SecondaryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
`;

const StyledLink = styled(Link)`
  border: 1px solid var(--color-gray-900);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--color-green-400);
  transition: border-radius 0.2s ease-in-out, background-color 0.2s ease-in-out;

  &:hover {
    border-radius: 16px;
    background-color: var(--color-green-300);
  }
`;

export default function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/app');
    }
  }, [isLoggedIn, navigate]);
  return (
    <StyledHome>
      <Hero>
        <MainText>
          Tracking calories shouldn't be difficult or expensive.
        </MainText>
        <SecondaryText>That's why we made YourMacros.</SecondaryText>
      </Hero>
      <SecondaryContainer>
        <TextContainer>
          <SimpleText>Simple to use</SimpleText>
          <PremiumText>No premium memberships</PremiumText>
          <Text>Community-driven food database</Text>
        </TextContainer>
      </SecondaryContainer>
      <StyledLink to={'/register'}>Sign Up Today</StyledLink>
    </StyledHome>
  );
}
