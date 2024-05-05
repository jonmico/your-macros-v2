import { useState } from 'react';

export default function Account() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  async function handlePasswordSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    console.log('handlePasswordSubmit NYI.');
  }

  return (
    <div>
      <form onSubmit={handlePasswordSubmit}>
        <h2>Password Management</h2>
        <div>
          <label htmlFor='currentPassword'>Current Password</label>
          <input
            type='text'
            id={'currentPassword'}
            name={'currentPassword'}
            value={currentPassword}
            onChange={(evt) => setCurrentPassword(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor='newPassword'>New Password</label>
          <input
            type='text'
            id={'newPassword'}
            name={'newPassword'}
            value={newPassword}
            onChange={(evt) => setNewPassword(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor='confirmNewPassword'>Confirm New Password</label>
          <input
            type='text'
            id={'confirmNewPassword'}
            name={'confirmNewPassword'}
            value={confirmNewPassword}
            onChange={(evt) => setConfirmNewPassword(evt.target.value)}
          />
        </div>
        <button>Change Password</button>
      </form>
      <div>
        <h2>Delete Account</h2>
        <button>Delete</button>
      </div>
    </div>
  );
}
