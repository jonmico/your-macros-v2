import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function PasswordResetForm() {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  async function handlePasswordSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    await changePassword(currentPassword, newPassword, confirmNewPassword);
  }

  return (
    <form onSubmit={handlePasswordSubmit}>
      <h2>Password Management</h2>
      <div>
        <label htmlFor='currentPassword'>Current Password</label>
        <input
          type='password'
          id={'currentPassword'}
          name={'currentPassword'}
          value={currentPassword}
          onChange={(evt) => setCurrentPassword(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor='newPassword'>New Password</label>
        <input
          type='password'
          id={'newPassword'}
          name={'newPassword'}
          value={newPassword}
          onChange={(evt) => setNewPassword(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor='confirmNewPassword'>Confirm New Password</label>
        <input
          type='password'
          id={'confirmNewPassword'}
          name={'confirmNewPassword'}
          value={confirmNewPassword}
          onChange={(evt) => setConfirmNewPassword(evt.target.value)}
        />
      </div>
      <button>Change Password</button>
    </form>
  );
}
