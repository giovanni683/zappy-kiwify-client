import { ArrowLeft, Edit } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import { mockEvents, mockConnections, mockSectors, mockNotifications } from '@/lib/mock-data';

interface NotificationDetailsProps {
  notificationId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export function NotificationDetails({ notificationId, onBack, onEdit }: NotificationDetailsProps) {
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (!notification) {
    return <div className="p-4">Notificação não encontrada.</div>;
  }
  const event = mockEvents.find(e => e.id === notification.event);
  const connection = mockConnections.find(c => c.id === notification.connection);
  const sector = mockSectors.find(s => s.id === notification.sector);

  return (
    <div
      className="page-container"
      style={{
        fontFamily: 'Inter, sans-serif',
        width: 420,
        minHeight: 992,
        background: '#F9FAFB',
        border: '1px solid #ccc',
        margin: '20px auto',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Botão Voltar fixo no topo */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 px-4 py-2 bg-[#DCFCE7] rounded-full text-[#0B4D33] font-semibold text-[14px] leading-[17px] border-none shadow-none"
        style={{ width: 90, height: 33, position: 'absolute', left: 16, top: 20, zIndex: 10 }}
      >
        <span className="mr-1" style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeft className="w-5 h-5" /></span>
        <span style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#0B4D33' }}>Voltar</span>
      </button>
      {/* Conteúdo principal centralizado */}
      <div
        className="flex flex-col items-start gap-4 bg-white rounded-2xl shadow-none p-0 min-h-[600px]"
        style={{
          marginTop: 70,
          width: 388,
          padding: 0,
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        {/* Título logo abaixo do botão voltar */}
        <h2 className="font-bold text-black" style={{ fontSize: 20, lineHeight: '24px', fontFamily: 'Inter, sans-serif', fontWeight: 700, marginTop: 0, marginLeft: 0 }}>Detalhes da notificação</h2>
        {/* Card de detalhes */}
        <div className="flex flex-col gap-4 w-full rounded-[20px] p-[18px] mb-2" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', minHeight: 300 }}>
          <div>
            <span className="block font-semibold text-black mb-1" style={{ fontSize: 14 }}>Status</span>
            <div className="w-full p-3 bg-gray-100 rounded-lg flex justify-center">
              <StatusBadge isActive={notification.isActive} />
            </div>
          </div>
          <div>
            <span className="block font-semibold text-black mb-1" style={{ fontSize: 14 }}>Evento gatilho</span>
            <span className="text-black" style={{ fontSize: 14 }}>{event?.name || notification.event}</span>
          </div>
          <div>
            <span className="block font-semibold text-black mb-1" style={{ fontSize: 14 }}>Conexão</span>
            <span className="text-black" style={{ fontSize: 14 }}>{connection?.name || notification.connection}</span>
          </div>
          <div>
            <span className="block font-semibold text-black mb-1" style={{ fontSize: 14 }}>Setor de destino</span>
            <span className="text-black" style={{ fontSize: 14 }}>{sector?.name || notification.sector}</span>
          </div>
          <div>
            <span className="block font-semibold text-black mb-1" style={{ fontSize: 14 }}>Mensagem</span>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-black whitespace-pre-wrap" style={{ fontSize: 14 }}>{notification.message}</span>
            </div>
          </div>
        </div>
        <button onClick={() => onEdit(notification.id)} className="w-[262px] h-[48px] rounded-full bg-[#0B4D33] text-white font-semibold text-[16px] leading-[19px] mx-auto mt-8 flex items-center justify-center" style={{ fontWeight: 600, fontSize: 16, lineHeight: '19px', color: '#fff', position: 'static' }}>
          <Edit className="w-4 h-4 mr-2" />
          Editar notificação
        </button>
      </div>
    </div>
  );
}
