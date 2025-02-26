import React, { useEffect } from 'react';
import axios from 'axios';

const SomeComponent = () => {
  useEffect(() => {
    axios.get(`${API_URL}/some-endpoint`)
      .then(response => {
        // işlem
      });
  }, []);

  return (
    // ... existing code ...
  );
};

export default SomeComponent; 