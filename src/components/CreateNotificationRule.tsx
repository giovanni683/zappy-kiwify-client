import React, { useState } from 'react';
import { NOTIFICATION_RULES } from '../api/endpoints';
import api from '../api/axios';

const CreateNotificationRule: React.FC = () => {
  const [integrationId, setIntegrationId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [active, setActive] = useState(true);
  const [event, setEvent] = useState('');
  const [message, setMessage] = useState('');
  const [adjustments, setAdjustments] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    try {
      const adj = { adjustments };
      const res = await api.post(NOTIFICATION_RULES.replace(process.env.NEXT_PUBLIC_API_URL || '', ''), {
        integrationId, accountId, active, event, message, adjustments: adj
      });
      setResult(res.data);
    } catch (err) {
      console.error('Erro ao criar regra:', err);
    }
  };

  return (
    <div>
      <input value={integrationId} onChange={e => setIntegrationId(e.target.value)} placeholder="Integration ID" />
      <input value={accountId} onChange={e => setAccountId(e.target.value)} placeholder="Account ID" />
      <input value={event} onChange={e => setEvent(e.target.value)} placeholder="Evento" />
      <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Mensagem" />
      <input value={adjustments} onChange={e => setAdjustments(e.target.value)} placeholder="Ajustes" />
      <label>
        Ativo:
        <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} />
      </label>
      <button onClick={handleCreate}>Criar Regra</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default CreateNotificationRule;
