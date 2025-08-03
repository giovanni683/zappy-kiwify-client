"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { NotificationForm } from '@/components/notifications/NotificationForm';
import useNotificationStore from '@/lib/notification-store';
import { Notification } from '@/types/notification';

export default function EditarNotificacaoPage() {
  const params = useParams();
  const router = useRouter();
  const { getNotificationById, updateNotification } = useNotificationStore();

  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (params.id) {
      const found = getNotificationById(params.id as string);
      if (found) {
        setNotification(found);
      } else {
        router.push('/');
      }
    }
  }, [params.id, getNotificationById, router]);

  const handleSubmit = (formData: any) => {
    if (!notification) return;

    updateNotification(notification.id, {
      event: formData.event,
      connection: formData.connection,
      sector: formData.sector,
      message: formData.message,
      isActive: formData.isActive,
    });

    router.push(`/detalhes-da-notificacao/${notification.id}`);
  };

  if (!notification) {
    return (
      <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
        <Header />
        <div className="p-4 text-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
      <Header />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link href={`/detalhes-da-notificacao/${notification.id}`} className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Editar notificação</h2>
        </div>

        <NotificationForm 
          initialData={notification}
          onSubmit={handleSubmit}
          submitLabel="Salvar"
        />
      </div>
    </div>
  );
}