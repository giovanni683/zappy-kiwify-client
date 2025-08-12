// form.js - handle notification form submission

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('notification-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = form.title.value;
      const message = form.message.value;
      await window.sendNotification(title, message);
      form.reset();
    });
  }
});
