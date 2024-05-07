import PasswordResetForm from '../password-reset-form/password-reset-form';

export default function Account() {
  return (
    <div>
      <PasswordResetForm />
      <div>
        <h2>Delete Account</h2>
        <button>Delete</button>
      </div>
    </div>
  );
}
