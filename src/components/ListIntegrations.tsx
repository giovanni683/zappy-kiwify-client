import React, { useEffect, useState } from 'react';
import { INTEGRATIONS } from '../api/endpoints';

const ListIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<any[]>([]);

  useEffect(() => {
    fetch(INTEGRATIONS)
      .then(res => res.json())
      .then(data => setIntegrations(data))
      .catch(err => console.error('Erro ao buscar integrações:', err));
  }, []);

  return (
    <div>
      <h2>Integrações</h2>
      <ul>
        {integrations.map(integration => (
          <li key={integration.id}>{integration.type}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListIntegrations;
