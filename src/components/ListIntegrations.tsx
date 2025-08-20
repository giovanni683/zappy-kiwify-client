import React, { useEffect, useState } from 'react';
import { listIntegrations } from '../api/zappy';

const ListIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<any[]>([]);

  useEffect(() => {
    listIntegrations().then(setIntegrations);
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
