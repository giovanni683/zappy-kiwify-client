import React, { useState } from 'react';
import { INTEGRATIONS } from '../api/endpoints';
import api from '../api/axios';

const CreateIntegration: React.FC = () => {
  const [accountId, setAccountId] = useState('');
  const [type, setType] = useState('');
  const [credentials, setCredentials] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    try {
      const creds = { credentials };
      const res = await api.post(INTEGRATIONS.replace(process.env.NEXT_PUBLIC_API_URL || '', ''), { accountId, type, credentials: creds });
      setResult(res.data);
    } catch (err) {
      console.error('Erro ao criar integração:', err);
    }
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
