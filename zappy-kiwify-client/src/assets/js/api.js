// api.js - basic API call for sending notifications

async function sendNotification(title, message) {
  const response = await fetch('http://localhost:3001/api/notifications/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, message }),
  });
  return response.json();
}

window.sendNotification = sendNotification;
