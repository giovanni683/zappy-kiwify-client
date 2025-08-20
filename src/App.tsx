import { createAccount, listAccounts, createIntegration, listIntegrations, createNotificationRule, listNotificationRules } from './api/zappy';

function App() {
  const handleCreateAccount = async () => {
    const result = await createAccount('Conta Teste', 'active');
    console.log(result);
  };

  const handleListAccounts = async () => {
    const accounts = await listAccounts();
    console.log(accounts);
  };

  const handleCreateIntegration = async () => {
    const result = await createIntegration('accountId123', 'typeX', { user: 'user', pass: 'pass' });
    console.log(result);
  };

  const handleListIntegrations = async () => {
    const integrations = await listIntegrations();
    console.log(integrations);
  };

  const handleCreateNotificationRule = async () => {
    const result = await createNotificationRule('integrationId123', 'accountId123', true, 'eventX', 'Mensagem', { ajuste: 1 });
    console.log(result);
  };

  const handleListNotificationRules = async () => {
    const rules = await listNotificationRules();
    console.log(rules);
  };

  return (
    <div>
      <button onClick={handleCreateAccount}>Criar Conta</button>
      <button onClick={handleListAccounts}>Listar Contas</button>
      <button onClick={handleCreateIntegration}>Criar Integração</button>
      <button onClick={handleListIntegrations}>Listar Integrações</button>
      <button onClick={handleCreateNotificationRule}>Criar Regra de Notificação</button>
      <button onClick={handleListNotificationRules}>Listar Regras de Notificação</button>
    </div>
  );
}

export default App;
