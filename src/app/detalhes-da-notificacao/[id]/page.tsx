"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft, Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import useNotificationStore from '@/lib/notification-store';
import { mockEvents, mockConnections, mockSectors } from '@/lib/mock-data';
import { Notification } from '@/types/notification';

export default function DetalhesNotificacaoPage() {
  const params = useParams();
  const router = useRouter();
  const { getNotificationById } = useNotificationStore();
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

  const event = mockEvents.find(e => e.id === notification.event);
  const connection = mockConnections.find(c => c.id === notification.connection);
  const sector = mockSectors.find(s => s.id === notification.sector);

  return (
    <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
      <Header />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Detalhes da notificação</h2>
        </div>

        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                <div className="w-full p-3 bg-gray-100 rounded-lg flex justify-center">
                  <StatusBadge isActive={notification.isActive} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Evento gatilho</h3>
                <p className="text-gray-900">{event?.name || notification.event}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Conexão</h3>
                <p className="text-gray-900">{connection?.name || notification.connection}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Setor de destino</h3>
                <p className="text-gray-900">{sector?.name || notification.sector}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Mensagem</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{notification.message}</p>
                </div>
              </div>
            </div>
          </Card>

          <Link href={`/editar-notificacao/${notification.id}`}>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
              <Edit className="w-4 h-4 mr-2" />
              Editar notificação
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}