import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { mockNotifications } from '@/lib/mock-data';
import EditFormClient from './EditFormClient';

export async function generateStaticParams() {
  return mockNotifications.map((notification) => ({
    id: notification.id,
  }));
}

export default function EditarNotificacaoPage({ params }: { params: { id: string } }) {
  const notification = mockNotifications.find(n => n.id === params.id);

  if (!notification) {
    return (
      <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
        <Header />
        <div className="p-4 text-center">
          <p>Notificação não encontrada.</p>
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
        <EditFormClient notification={notification} />
      </div>
    </div>
  );
}