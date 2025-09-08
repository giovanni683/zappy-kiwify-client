import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import useNotificationStore from '@/lib/notification-store';

interface NotificationDetailsProps {
  notificationId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export function NotificationDetails({ notificationId, onBack, onEdit }: NotificationDetailsProps) {
  const { accountId } = useNotificationStore();
  const [notification, setNotification] = useState<any>(null);
  const [eventName, setEventName] = useState('');
  const [connectionName, setConnectionName] = useState('');
  const [sectorName, setSectorName] = useState('');
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/api/zappy/notification-rules/${notificationId}?accountId=${accountId}`)
      .then(res => res.json())
      .then(data => {
        setNotification(data);
        setLoading(false);
        // Evento
        if (data?.event) {
          fetch(`${baseUrl}/api/zappy/events?accountId=${accountId}`)
            .then(res => res.json())
            .then(evData => {
              if (Array.isArray(evData.events)) {
                const found = evData.events.find((ev: any) => ev.id === data.event || ev === data.event || ev.key === data.event);
                setEventName(found?.name || found?.key || found || data.event);
              }
            });
        }
        // Conexão
        if (data?.integrationId) {
          fetch(`${baseUrl}/api/zappy/connections/active?accountId=${accountId}`)
            .then(res => res.json())
            .then(connData => {
              const arr = Array.isArray(connData) ? connData : (connData.connections || connData.items || connData.data || []);
              const found = arr.find((c: any) => c.id === data.integrationId);
              setConnectionName(found?.name || found?.type || data.integrationId);
            });
        }
        // Setor: usar nome direto se vier do backend
        if (data?.sector && data.sector.name) {
          setSectorName(data.sector.name);
        } else if (data?.sectorId) {
          fetch(`${baseUrl}/api/zappy/queues?accountId=${accountId}`)
            .then(res => res.json())
            .then(sectorData => {
              console.log("sectorData: ", sectorData);
              const arr = Array.isArray(sectorData) ? sectorData : (sectorData.queues || sectorData.items || sectorData.data || []);
              const found = arr.find((s: any) => s.id === data.sectorId);
              console.log("found: ", found)
              setSectorName(found?.name || data.sectorId);
            });
        } else {
        }
      });
  }, [notificationId, accountId]);

  function beautifyEventName(event: string) {
    const map: Record<string, string> = {
      'boleto_gerado': 'Boleto gerado',
      'pix_gerado': 'Pix gerado',
      'compra_aprovada': 'Compra aprovada',
      'compra_recusada': 'Compra recusada',
      'carrinho_abandonado': 'Carrinho abandonado',
      'subscription_late': 'Assinatura atrasada',
      'subscription_canceled': 'Assinatura cancelada',
      'compra_reembolsada': 'Compra reembolsada',
      'chargeback': 'Chargeback',
      'subscription_renewed': 'Assinatura renovada',
      // Adicione outros eventos conforme necessário
    };
    return map[event] || event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  if (loading) {
    return <div className="flex items-center justify-center w-full h-[60vh]">Carregando...</div>;
  }
  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[60vh] bg-[#F9FAFB]">
        <h2 className="text-xl font-bold text-red-600 mb-4">Notificação não encontrada</h2>
        <button onClick={onBack} className="px-4 py-2 bg-[#DCFCE7] rounded-full text-[#0B4D33] font-semibold">Voltar</button>
      </div>
    );
  }

  console.log('[NotificationDetails] notification.sector:', notification.sector);
  console.log('[NotificationDetails] notification.sectorId:', notification.sectorId);

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
      <h1 className="font-inter font-bold text-xl leading-6 text-black mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '22px', lineHeight: '26px', color: '#000' }} data-testid="titulo-detalhes">Detalhes da notificação</h1>
      {/* Card Principal */}
      <div className="border border-black/10 rounded-2xl bg-white p-4 flex flex-col gap-4 mt-0">
        {/* Status */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Status</div>
          <div className="flex items-center justify-center w-full h-9 rounded-full" style={{ background: notification.active ? '#E1E9E7' : '#FDE2E1' }}>
            <StatusBadge isActive={notification.active} />
          </div>
        </div>
        {/* Evento gatilho */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Evento gatilho</div>
          <div className="font-inter font-medium text-base leading-6 text-black">{beautifyEventName(eventName || notification.event)}</div>
        </div>
        {/* Conexão */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Conexão</div>
          <div className="font-inter font-medium text-base leading-6 text-black">
            {notification.integrationId && !connectionName && 'Carregando...'}
            {connectionName && connectionName}
            {!notification.integrationId && '—'}
          </div>
        </div>
        {/* Setor de destino */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Setor de destino</div>
          <div className="font-inter font-medium text-base leading-6 text-black">
            {sectorName || '—'}
          </div>
        </div>
        {/* Mensagem */}
        <div>
          <div className="font-inter font-medium text-base leading-[19px] text-black/70 mb-1">Mensagem</div>
          <div className="flex items-start p-2 gap-2 w-full min-h-[48px] bg-white border border-black/5 rounded-xl">
            <div className="font-inter font-medium text-base leading-6 text-black w-full">
              {(() => {
                const msg = notification.message;
                if (typeof msg === 'string') {
                  return msg.split(/(\{\{.*?\}\})/g).map((part: string, idx: number) =>
                    part.match(/^\{\{.*\}\}$/)
                      ? <span key={idx} className="text-[#00B16C] font-semibold">{part}</span>
                      : part
                  );
                }
                if (Array.isArray(msg)) {
                  return msg.map((item, idx) => {
                    if (typeof item === 'string') {
                      return <span key={idx}>{item}</span>;
                    }
                    if (typeof item === 'object' && item !== null) {
                      // Tenta exibir label, key ou JSON
                      const uniqueKey = item.key || item.label || idx;
                      return (
                        <span key={uniqueKey} style={{ color: '#B91C1C', display: 'block' }}>
                          {item.label || item.key || JSON.stringify(item)}
                        </span>
                      );
                    }
                    return <span key={idx}>{String(item)}</span>;
                  });
                }
                if (typeof msg === 'object' && msg !== null) {
                  return <span style={{ color: '#B91C1C' }}>{JSON.stringify(msg)}</span>;
                }
                if (msg === null || msg === undefined) {
                  return <span style={{ color: '#B91C1C' }}>Mensagem não disponível</span>;
                }
                return String(msg);
              })()}
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
