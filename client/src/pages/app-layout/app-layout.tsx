import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <>
      <div>this is the app layout page</div>
      <Outlet />
    </>
  );
}
