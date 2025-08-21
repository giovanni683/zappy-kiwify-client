import React, { useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/zappy/accounts`)
      .then(res => res.json())
      .then(data => {
        console.log('Resposta do backend:', data);
      })
      .catch(err => {
        console.error('Erro ao conectar com o backend:', err);
      });
  }, []);

  return <div>Veja o console do navegador para o resultado!</div>;
};

export default App;