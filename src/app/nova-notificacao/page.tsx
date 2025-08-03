"use client";

import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { NotificationForm } from '@/components/notifications/NotificationForm';
import useNotificationStore from '@/lib/notification-store';
import { mockEvents, mockConnections, mockSectors } from '@/lib/mock-data';

export default function NovaNotificacaoPage() {
  const router = useRouter();
  const { addNotification } = useNotificationStore();

  const handleSubmit = (formData: any) => {
    // Get event name for notification name
    const eventName = mockEvents.find(e => e.id === formData.event)?.name || formData.event;
    
    addNotification({
      name: eventName,
      event: formData.event,
      connection: formData.connection,
      sector: formData.sector,
      message: formData.message,
      isActive: formData.isActive,
    });

    router.push('/');
  };

  return (
    <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
      <Header />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Nova notificação</h2>
        </div>

        <NotificationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}