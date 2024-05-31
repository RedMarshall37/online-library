import { useState, useEffect } from 'react';

function useLocalStorage(key) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        setStoredValue(window.localStorage.getItem(key));
      } catch (error) {
        console.error(error);
        setStoredValue(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
