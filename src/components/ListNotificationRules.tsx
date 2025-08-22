import React, { useEffect, useState } from 'react';
import { NOTIFICATION_RULES } from '../api/endpoints';
import api from '../api/axios';

const ListNotificationRules: React.FC = () => {
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    api.get(NOTIFICATION_RULES.replace(process.env.NEXT_PUBLIC_API_URL || '', ''))
      .then(res => setRules(res.data))
      .catch(err => console.error('Erro ao buscar regras:', err));
  }, []);

  return (
    <div>
      <h2>Regras de Notificação</h2>
      <ul>
        {rules.map(rule => (
          <li key={rule.id}>{rule.event} - {rule.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListNotificationRules;
