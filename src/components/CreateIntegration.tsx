import React, { useState } from 'react';
import { createIntegration } from '../api/zappy';

const CreateIntegration: React.FC = () => {
  const [accountId, setAccountId] = useState('');
  const [type, setType] = useState('');
  const [credentials, setCredentials] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    const creds = { credentials };
    const res = await createIntegration(accountId, type, creds);
    setResult(res);
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
