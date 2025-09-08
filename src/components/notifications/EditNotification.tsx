import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import useNotificationStore from '@/lib/notification-store';

interface EditNotificationProps {
  notificationId: string;
  onBack: () => void;
}

export function EditNotification({ notificationId, onBack }: EditNotificationProps) {
  // Arrays completos vindos do backend
  type EventoOption = string | { key?: string; id?: string; label?: string; name?: string };
  const [conexoes, setConexoes] = useState<any[]>([]);
  const [setores, setSetores] = useState<any[]>([]);
  const [eventos, setEventos] = useState<EventoOption[]>([]);

  // Estados controlados por id/valor real
  const [integrationId, setIntegrationId] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [event, setEvent] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { accountId } = useNotificationStore();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  const variables = [
    { label: 'Nome completo', value: '{{nome_completo}}' },
    { label: 'Url boleto', value: '{{url_boleto}}' },
    { label: 'Expiração PIX', value: '{{expiracao_pix}}' },
    { label: 'Código PIX', value: '{{codigo_pix}}' },
    { label: 'Valor da compra', value: '{{valor_compra}}' },
    { label: 'Cód. barras boleto', value: '{{cod_barras_boleto}}' },
  ];

  // Carrega opções e dados da notificação
  useEffect(() => {
    setLoading(true);
    // Buscar eventos
    fetch(`${baseUrl}/api/zappy/events`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.events)) setEventos(data.events);
      })
      .catch(() => setEventos([]));
    if (!accountId) return setLoading(false);
    // Buscar conexões
    fetch(`${baseUrl}/api/zappy/connections/active?accountId=${accountId}`)
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setConexoes(data);
      })
      .catch(() => setConexoes([]));
    // Buscar setores
    fetch(`${baseUrl}/api/zappy/queues?accountId=${accountId}`)
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        console.log('Setores carregados:', data);
        if (Array.isArray(data)) setSetores(data);
        else if (data?.queues) setSetores(data.queues);
        else if (data?.items) setSetores(data.items);
        else if (data?.data) setSetores(data.data);
      })
      .catch(() => setSetores([]));
    // Buscar dados da notificação para edição
    fetch(`${baseUrl}/api/zappy/notification-rules/${notificationId}?accountId=${accountId}`)
      .then(async res => {
        if (!res.ok) {
          let msg = 'Erro ao buscar notificação';
          try {
            if (res.headers.get('content-type')?.includes('application/json')) {
              msg = (await res.json()).error || msg;
            } else {
              msg = await res.text();
            }
          } catch {}
          throw new Error(msg);
        }
        if (!res.headers.get('content-type')?.includes('application/json')) {
          throw new Error('Resposta inesperada do servidor.');
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setEvent(data.event || '');
          setIntegrationId(data.integrationId || '');
          setSectorId(data.sectorId || '');
          setMessage(data.message || '');
          setIsActive(!!data.active);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [notificationId, accountId]);

  function handleInsertVariable(variable: string) {
    const textarea = messageRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = message;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newValue = before + variable + after;
    setMessage(newValue);
    setTimeout(() => {
      textarea.focus();
      const cursor = before.length + variable.length;
      textarea.setSelectionRange(cursor, cursor);
    }, 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!event) {
      setError('Selecione um evento válido.');
      return;
    }
    if (!sectorId) {
      setError('Selecione um setor antes de salvar.');
      return;
    }
    setError(null);
    const payload = {
      id: notificationId,
      event,
      integrationId: integrationId || null,
      sectorId: sectorId || null,
      active: isActive,
      message,
      adjustments: {},
    };
    console.log('Payload enviado para o backend:', payload);
    fetch(`${baseUrl}/api/zappy/notification-rules/${notificationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(() => {
        onBack();
      })
      .catch(err => {
        setError('Erro ao atualizar notificação: ' + err.message);
      });
  }

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
    return <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>Carregando...</div>;
  }
  if (error) {
    return <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', fontSize: 18 }}>{error}</div>;
  }

  return (
    <div className="page-container mx-auto w-full max-w-[420px] min-h-screen bg-[#F9FAFB] flex flex-col items-center relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header: botão Voltar alinhado à esquerda, título centralizado abaixo */}
      <div className="w-full flex flex-col items-start mt-8 mb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-[14px] py-[6px] bg-[#DCFCE7] rounded-full shadow-none mt-0"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '19px', color: '#0B4D33', marginTop: '0px' }}
          data-testid="edit-back-button"
        >
          <span className="w-5 h-5 flex items-center justify-center mr-1">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19.5L5 12.5M5 12.5L12 5.5M5 12.5H19" stroke="#0B4D33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '19px', color: '#0B4D33' }}>Voltar</span>
        </button>
        <h2
          className="font-inter font-bold text-black mb-4 mt-4 text-left text-[22px]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
        >
          Editar notificação
        </h2>
      </div>
      <div className="flex flex-col items-start gap-4 rounded-2xl shadow-none p-0 min-h-[600px] w-full max-w-[388px] bg-transparent">
        <div className="flex items-start gap-3 w-full rounded-[20px] p-[10px] mb-2" style={{ background: 'rgba(255, 194, 25, 0.2)' }}>
          <Info className="w-6 h-6 text-black flex-shrink-0" />
          <div className="flex flex-col gap-[7px] flex-grow">
            <span className="font-semibold text-black text-[16px] leading-[19px]">Importante</span>
            <span className="font-medium text-[14px] leading-[17px] text-black/70 block">Para que a notificação funcione corretamente, é essencial que o cliente tenha um número de telefone com DDI + DDD cadastrado (ex: +55 11 99999-9999) e que você possua o número ativo e conectado na sua conta Zappy.</span>
          </div>
        </div>
        <form className="flex flex-col gap-4 w-full" style={{ marginTop: 8 }} onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          {/* Evento */}
          <div className="flex flex-col gap-[5px] w-full relative">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Evento <span className="text-red-500">*</span></label>
            <select value={event} onChange={e => setEvent(e.target.value)} className="w-full h-[44px] px-[10px] font-medium text-[14px] text-black/70 rounded-[10px] border border-black/20 bg-white">
              <option value="">Selecione um evento</option>
              {eventos.map((ev, idx) => {
                if (typeof ev === 'string') {
                  return <option key={ev || idx} value={ev}>{beautifyEventName(ev)}</option>;
                }
                const value = ev.key || ev.id || '';
                return (
                  <option key={value || idx} value={value}>
                    {beautifyEventName(ev.key || ev.id || '')}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Conexão */}
          <div className="flex flex-col gap-[5px] w-full relative">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Conexão</label>
            <select value={integrationId} onChange={e => setIntegrationId(e.target.value)} className="w-full h-[44px] px-[10px] font-medium text-[14px] text-black/70 rounded-[10px] border border-black/20 bg-white">
              <option value="">Selecione uma conexão</option>
              {conexoes.map((conn, idx) => (
                <option key={conn.id || idx} value={conn.id || ''}>{conn.name ? conn.name : conn.id}</option>
              ))}
            </select>
            <span className="form-description font-medium text-[14px] leading-[17px] text-black/70">Se não selecionar, a conexão padrão será usada.</span>
          </div>
          {/* Setor de atendimento */}
          <div className="flex flex-col gap-[5px] w-full relative">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Setor de atendimento</label>
            <select value={sectorId} onChange={e => { console.log('Setor selecionado:', e.target.value); setSectorId(e.target.value); }} className="w-full h-[44px] px-[10px] font-medium text-[14px] text-black/70 rounded-[10px] border border-black/20 bg-white">
              <option value="">Selecione um setor</option>
              {setores.map((sector, idx) => (
                <option key={sector.id || idx} value={sector.id || ''}>{sector.name || sector.id}</option>
              ))}
            </select>
            <span className="form-description font-medium text-[14px] leading-[17px] text-black/70">O atendimento será transferido para este setor.</span>
          </div>
          {/* Mensagem */}
          <div className="flex flex-col gap-[5px] w-full">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Mensagem</label>
            <textarea ref={messageRef} className="message-area resize-none w-full rounded-[10px] border border-black/20 p-[10px] text-[14px] font-medium text-black/70 h-[114px]" placeholder="Edite a mensagem..." value={message} onChange={e => setMessage(e.target.value)} style={{ fontFamily: 'Inter, sans-serif' }}></textarea>
          </div>
          {/* Variáveis */}
          <div className="variables-section w-full flex flex-col gap-2">
            <span className="variables-label font-medium text-[14px] text-black">Inserir variáveis:</span>
            <div className="variables-grid flex flex-wrap gap-2">
              {variables.map((v) => (
                <button type="button" key={v.value} className="variable-chip px-4 py-2 font-medium hover:bg-[#d2e0db] transition-colors bg-[#0B4D33]/10 rounded-full text-[#0B4D33] h-[37px] flex items-center justify-center" onClick={() => handleInsertVariable(v.value)}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          {/* Toggle Ativar notificação */}
          <div className="toggle-group flex flex-row items-center gap-2 mt-2 h-[19px]">
            <button type="button" aria-pressed={isActive} onClick={() => setIsActive((prev) => !prev)} className="bg-none border-none p-0 cursor-pointer flex items-center gap-2">
              <span className="toggle-label font-semibold text-[16px] leading-[19px] text-black mr-2">
                Ativar notificação
              </span>
              <span className="inline-flex items-center">
                <svg width="36" height="17" viewBox="0 0 36 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2001_305)">
                    <rect width="36" height="17" rx="8.5" fill={isActive ? '#0B4D33' : '#E1E1E1'} />
                    <g filter="url(#filter0_d_2001_305)">
                      <circle cx={isActive ? 27.5 : 8.5} cy={8.5} r={7.5} fill={isActive ? '#DCFCE7' : '#ACACAC'} />
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_d_2001_305" x="-39" y="-30" width="95" height="95" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="9"/>
                      <feGaussianBlur stdDeviation="20"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.105 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2001_305"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2001_305" result="shape"/>
                    </filter>
                    <clipPath id="clip0_2001_305">
                      <rect width="36" height="17" rx="8.5" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
          <Button type="submit" className="save-button w-[262px] h-[48px] rounded-full bg-[#0B4D33] text-white font-semibold text-[16px] leading-[19px] mx-auto mt-4 flex items-center justify-center">Salvar</Button>
        </form>
      </div>
    </div>
  );
}
