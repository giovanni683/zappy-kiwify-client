import React, { useEffect, useState } from 'react';
import { NOTIFICATION_RULES } from '../api/endpoints';

const ListNotificationRules: React.FC = () => {
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    fetch(NOTIFICATION_RULES)
      .then(res => res.json())
      .then(data => setRules(data))
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
