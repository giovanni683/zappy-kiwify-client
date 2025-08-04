"use client";

import { Notification } from '@/types/notification';
import { NotificationForm } from '@/components/notifications/NotificationForm';

export default function EditFormClient({ notification }: { notification: Notification }) {
  const handleSubmit = (formData: any) => {
    // Sua lógica de submit aqui
    // Exemplo: alert(JSON.stringify(formData));
  };

  return (
    <NotificationForm
      initialData={notification}
      submitLabel="Salvar"
      onSubmit={handleSubmit}
    />
  );
}