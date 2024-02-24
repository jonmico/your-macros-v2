import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <div>this is the App!</div>
      <Outlet />
    </>
  );
}
