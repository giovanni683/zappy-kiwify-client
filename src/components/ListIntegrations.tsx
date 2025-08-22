import React, { useEffect, useState } from 'react';
import { INTEGRATIONS } from '../api/endpoints';
import api from '../api/axios';

const ListIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<any[]>([]);

  useEffect(() => {
    api.get(INTEGRATIONS.replace(process.env.NEXT_PUBLIC_API_URL || '', ''))
      .then(res => setIntegrations(res.data))
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
