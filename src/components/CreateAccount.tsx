import React, { useState } from 'react';
import { ACCOUNTS } from '../api/endpoints';
import api from '../api/axios';

const CreateAccount: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    try {
      const res = await api.post(ACCOUNTS.replace(process.env.NEXT_PUBLIC_API_URL || '', ''), { name, status });
      setResult(res.data);
    } catch (err) {
      console.error('Erro ao criar conta:', err);
    }
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da Conta" />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="active">Ativa</option>
        <option value="inactive">Inativa</option>
      </select>
      <button onClick={handleCreate}>Criar Conta</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default CreateAccount;
