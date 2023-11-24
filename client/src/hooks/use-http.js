import { useCallback } from 'react';

// ==================================================

const useHttp = () => {
  const token = sessionStorage.getItem('token');

  const sendRequest = useCallback(
    async (requestConfig) => {
      // Fetch data
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers
          ? { ...requestConfig.headers, Authorization: `Bear ${token}` }
          : { Authorization: `Bear ${token}` },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      const resData = await response.json();

      if (!response.ok) {
        return { error: true, message: resData.message };
      }

      return resData;
    },
    [token]
  );

  return sendRequest;
};

export default useHttp;
