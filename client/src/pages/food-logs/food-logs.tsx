import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { apiCreateLog } from '../../services/food-logs-api';

export default function FoodLogs() {
  const { userId } = useUser();
  const [logName, setLogName] = useState('');

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data = await apiCreateLog(userId, logName);

    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='logName'>Log Name</label>
        <input
          type='text'
          id={'logName'}
          name={'logName'}
          value={logName}
          onChange={(evt) => setLogName(evt.target.value)}
        />
        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
}
