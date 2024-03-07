import { apiCheckUserSession } from '../../services/auth-api';

export default function Dashboard() {
  async function checkSession() {
    const data = await apiCheckUserSession();

    console.log(data);
  }
  return (
    <div>
      This is the dashboard page.
      <button onClick={checkSession}>Click me!</button>
    </div>
  );
}
