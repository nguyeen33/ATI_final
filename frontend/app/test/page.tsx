'use client';

import { useTestBackend } from '@/hooks/use-test-backend';

function App() {
  const { data, isLoading, error } = useTestBackend();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data ? (
        <p>Data received from server: {data.message}</p>
      ) : (
        <p>No data received</p>
      )}
    </div>
  );
}

export default App;