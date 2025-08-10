import React, { useEffect } from 'react';
import { startNotificationWebSocket, stopNotificationWebSocket } from '@/lib/notification-store';
import { ArrowLeft, Edit } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import { mockEvents, mockConnections, mockSectors, mockNotifications } from '@/lib/mock-data';

interface NotificationDetailsProps {
  notificationId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}


export function NotificationDetails({ notificationId, onBack, onEdit }: NotificationDetailsProps) {
  useEffect(() => {
    startNotificationWebSocket();
    return () => {
      stopNotificationWebSocket();
    };
  }, []);
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[60vh] bg-[#F9FAFB]">
        <h2 className="text-xl font-bold text-red-600 mb-4">Notificação não encontrada</h2>
        <button onClick={onBack} className="px-4 py-2 bg-[#DCFCE7] rounded-full text-[#0B4D33] font-semibold">Voltar</button>
      </div>
    );
  }
  const event = mockEvents.find(e => e.id === notification.event);
  const connection = mockConnections.find(c => c.id === notification.connection);
  const sector = mockSectors.find(s => s.id === notification.sector);

  return (
    <div className="w-full max-w-[420px] mx-auto bg-[#F9FAFB] p-4 rounded-2xl flex flex-col gap-4">
      {/* Header com botão voltar acima e título abaixo (layout original) */}
      <div className="mb-2">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-[14px] py-[6px] bg-[#DCFCE7] rounded-full shadow-none"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '19px', color: '#0B4D33' }}
          data-testid="botao-voltar"
        >
          <ArrowLeft className="w-5 h-5 text-[#0B4D33] mr-1" strokeWidth={2} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '19px', color: '#0B4D33' }}>Voltar</span>
        </button>
      </div>
      <h1
        className="font-inter font-bold text-xl leading-6 text-black mb-4"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '22px', lineHeight: '26px', color: '#000' }}
        data-testid="titulo-detalhes"
      >
        Detalhes da notificação
      </h1>

      {/* Card Principal */}
      <div className="border border-black/10 rounded-2xl bg-white p-4 flex flex-col gap-4 mt-0">
        {/* Status */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Status</div>
          <div
            className="flex items-center justify-center w-full h-9 rounded-full"
            style={{
              background: notification.isActive
                ? '#E1E9E7' // mesmo tom do badge ativo
                : '#FDE2E1' // vermelho claro sólido equivalente ao verde do ativo
            }}
          >
            <StatusBadge isActive={notification.isActive} />
          </div>
        </div>

        {/* Evento gatilho */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Evento gatilho</div>
          <div className="font-inter font-medium text-base leading-6 text-black">{event?.name || notification.event}</div>
        </div>

        {/* Conexão */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Conexão</div>
          <div className="font-inter font-medium text-base leading-6 text-black">{connection?.name || notification.connection}</div>
        </div>

        {/* Setor de destino */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Setor de destino</div>
          <div className="font-inter font-medium text-base leading-6 text-black">{sector?.name || notification.sector}</div>
        </div>

        {/* Mensagem */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Mensagem</div>
          <div className="flex items-start p-2 gap-2 w-full min-h-[48px] bg-white border border-black/5 rounded-xl">
            <div className="font-inter font-medium text-base leading-6 text-black w-full">
              {typeof notification.message === 'string'
                ? notification.message.split(/(\{\{.*?\}\})/g).map((part, idx) =>
                    part.match(/^\{\{.*\}\}$/)
                      ? <span key={idx} className="text-[#00B16C] font-semibold">{part}</span>
                      : part
                  )
                : notification.message}
            </div>
          </div>
        </div>
      </div>

      {/* Botão Editar notificação */}
      <button onClick={() => onEdit(notification.id)} className="flex items-center justify-center px-4 py-3 gap-2 w-full bg-[#0B4D33] rounded-full hover:bg-[#0B4D33]/90 transition-colors mt-4" data-testid="details-edit-button">
        <Edit className="w-5 h-5 text-white" strokeWidth={2} />
        <span className="font-inter font-semibold text-base leading-[19px] text-white">Editar notificação</span>
      </button>
    </div>
  );
}
