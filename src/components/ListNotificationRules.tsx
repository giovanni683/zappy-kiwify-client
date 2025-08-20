import React, { useEffect, useState } from 'react';
import { listNotificationRules } from '../api/zappy';

const ListNotificationRules: React.FC = () => {
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    listNotificationRules().then(setRules);
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
