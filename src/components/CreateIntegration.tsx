import React, { useState } from 'react';
import { INTEGRATIONS } from '../api/endpoints';

const CreateIntegration: React.FC = () => {
  const [accountId, setAccountId] = useState('');
  const [type, setType] = useState('');
  const [credentials, setCredentials] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    const creds = { credentials };
    const res = await fetch(INTEGRATIONS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId, type, credentials: creds })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <input value={accountId} onChange={e => setAccountId(e.target.value)} placeholder="Account ID" />
      <input value={type} onChange={e => setType(e.target.value)} placeholder="Tipo" />
      <input value={credentials} onChange={e => setCredentials(e.target.value)} placeholder="Credenciais" />
      <button onClick={handleCreate}>Criar Integração</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default CreateIntegration;
