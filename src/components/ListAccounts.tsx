import React, { useEffect, useState } from 'react';
import { ACCOUNTS } from '../api/endpoints';

const ListAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    fetch(ACCOUNTS)
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(err => console.error('Erro ao buscar contas:', err));
  }, []);

  return (
    <div>
      <h2>Contas</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>{account.name} - {account.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListAccounts;
