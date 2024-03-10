import { useState } from 'react';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useUser } from '../../hooks/useUser';

export default function FoodLogs() {
  const { userId } = useUser();
  const { foodLogs, createLog } = useFoodLog();
  const [logName, setLogName] = useState('');

  const foodLogList = foodLogs.map((log) => <li key={log._id}>{log.name}</li>);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    await createLog(userId, logName);
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
      <ul>{foodLogList}</ul>
    </div>
  );
}
