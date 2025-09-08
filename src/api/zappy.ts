export async function createAccount(name: string, status: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, status })
  });
  return res.json();
}

export async function listAccounts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/accounts`);
  return res.json();
}

export async function createIntegration(accountId: string, type: string, credentials: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/integrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accountId, type, credentials })
  });
  return res.json();
}

export async function listIntegrations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/integrations`);
  return res.json();
}

export async function createNotificationRule(
  integrationId: string,
  accountId: string,
  active: boolean,
  event: string,
  message: string,
  adjustments: any
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/notification-rules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ integrationId, accountId, active, event, message, adjustments })
  });
  return res.json();
}

export async function listNotificationRules() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/notification-rules`);
  return res.json();
}

export async function listEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/events`);
  return res.json();
}

export async function listConnections() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/connections`);
  return res.json();
}

export async function listSectors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zappy/queues`);
  return res.json();
}
