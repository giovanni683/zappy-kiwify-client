// main.js - basic notification logic for client

document.addEventListener('DOMContentLoaded', () => {
  const socket = io('http://localhost:3001'); // adjust port if needed

  socket.on('notification', (data) => {
    showNotification(data);
  });

  function showNotification(data) {
    const notifDiv = document.createElement('div');
    notifDiv.className = 'notification';
    notifDiv.innerText = `${data.title}: ${data.message}`;
    notifDiv.style.background = '#fff';
    notifDiv.style.border = '1px solid #0B4D33';
    notifDiv.style.padding = '12px';
    notifDiv.style.margin = '12px auto';
    notifDiv.style.maxWidth = '400px';
    notifDiv.style.borderRadius = '8px';
    document.body.appendChild(notifDiv);
    setTimeout(() => notifDiv.remove(), 5000);
  }
});
