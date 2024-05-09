import { useState } from 'react';

export function useAPICall() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
}
