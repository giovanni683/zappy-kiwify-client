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
    <div className="relative w-[420px] h-[921px] mx-auto bg-[#F9FAFB]">
      {/* Header com botão voltar */}
      <div className="absolute left-4 top-5">
        <button onClick={onBack} className="flex items-center justify-center gap-[5px] px-[10px] py-[10px] w-[90px] h-[33px] bg-[#DCFCE7] rounded-full">
          <ArrowLeft className="w-6 h-6 text-[#0B4D33]" strokeWidth={2} />
          <span className="font-inter font-semibold text-sm leading-[17px] text-[#0B4D33]">Voltar</span>
        </button>
      </div>

      {/* Título */}
      <div className="absolute left-4 top-[79px] w-[388px]">
        <h1 className="font-inter font-bold text-xl leading-6 text-black">Detalhes da notificação</h1>
      </div>

      {/* Card Principal */}
      <div className="absolute left-4 top-[118px] w-[388px] h-[390px] border border-black/10 rounded-[20px] bg-white">
        <div className="flex flex-col items-start p-[10px] gap-[10px] w-full h-full">
          <div className="flex flex-col items-start gap-[15px] w-[368px] h-[370px]">
            {/* Seção Status */}
            <div className="flex flex-col items-start gap-2 w-[368px] h-[63px]">
              <div className="font-inter font-medium text-base leading-[19px] text-black/70 w-full">Status</div>
              <div className="flex items-center justify-center w-[368px] h-[36px] bg-[#E1E9E7] rounded-full" style={{margin: 0, padding: 0}}>
                <StatusBadge isActive={notification.isActive} />
              </div>
            </div>

            {/* Evento gatilho */}
            <div className="flex flex-col items-start gap-2 w-[368px] h-[51px]">
              <div className="font-inter font-medium text-base leading-[19px] text-black/70 w-full">Evento gatilho</div>
              <div className="font-inter font-medium text-base leading-6 text-center text-black">{event?.name || notification.event}</div>
            </div>

            {/* Conexão */}
            <div className="flex flex-col items-start gap-2 w-[205px] h-[51px]">
              <div className="font-inter font-medium text-base leading-[19px] text-black/70 w-full">Conexão</div>
              <div className="font-inter font-medium text-base leading-6 text-center text-black">{connection?.name || notification.connection}</div>
            </div>

            {/* Setor de destino */}
            <div className="flex flex-col items-start gap-2 w-[368px] h-[51px]">
              <div className="font-inter font-medium text-base leading-[19px] text-black/70 w-full">Setor de destino</div>
              <div className="font-inter font-medium text-base leading-6 text-center text-black">{sector?.name || notification.sector}</div>
            </div>

            {/* Seção de configurações */}
            <div className="flex flex-col items-start gap-2 w-[368px] h-[94px]">
              <div className="font-inter font-medium text-base leading-[19px] text-black/70 w-full">Mensagem</div>
              <div className="flex items-start p-[10px] gap-[10px] w-[368px] h-[67px] bg-white border border-black/5 rounded-xl">
                <div className="font-inter font-medium text-base leading-6 text-black w-[348px] h-12">
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
        </div>
      </div>

      {/* Botão Editar notificação */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[526px]">
        <button onClick={() => onEdit(notification.id)} className="flex items-center justify-center px-[10px] py-[10px] gap-[10px] w-[388px] h-12 bg-[#0B4D33] rounded-full hover:bg-[#0B4D33]/90 transition-colors">
          <Edit className="w-6 h-6 text-white" strokeWidth={2} />
          <span className="font-inter font-semibold text-base leading-[19px] text-white">Editar notificação</span>
        </button>
      </div>
    </div>
  );
}
