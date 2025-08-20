import React, { useEffect, useState } from 'react';
import { listAccounts } from '../api/zappy';

const ListAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    listAccounts().then(setAccounts);
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
