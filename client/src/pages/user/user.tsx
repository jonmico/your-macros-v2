import { Outlet } from 'react-router-dom';
import UserNav from '../../components/user-nav/user-nav';

export default function UserPage() {
  return (
    <div>
      <UserNav />
      <Outlet />
    </div>
  );
}
