"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useNotificationStore from '@/lib/notification-store';

interface NewNotificationProps {
  onBack: () => void;
}

export function NewNotification({ onBack }: NewNotificationProps) {
  const router = useRouter();
  const { accountId } = useNotificationStore();
  // Arrays completos vindos do backend
  const [conexoes, setConexoes] = useState<any[]>([]);
  const [setores, setSetores] = useState<any[]>([]);
  const [eventos, setEventos] = useState<string[]>([]);

  // Estados controlados por id/valor real
  const [integrationId, setIntegrationId] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [event, setEvent] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const variables = [
    { label: 'Nome Completo', value: '{{nomeCompleto}}' },
    { label: 'Primeiro Nome', value: '{{primeiroNome}}' },
    { label: 'URL Boleto', value: '{{urlBoleto}}' },
    { label: 'Código Barras Boleto', value: '{{codigoBarrasBoleto}}' },
    { label: 'Código Pix', value: '{{codigoPix}}' },
    { label: 'Nome Produto', value: '{{nomeProduto}}' },
    { label: 'Status Carrinho', value: '{{statusCarrinho}}' },
    { label: 'URL Acesso', value: '{{urlAcesso}}' },
    { label: 'Status Assinatura', value: '{{statusAssinatura}}' },
  ];

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    // Buscar eventos
    fetch(`${baseUrl}/api/zappy/events`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.events)) setEventos(data.events);
      })
      .catch(() => setEventos([]));
    if (!accountId) return;
    // Buscar conexões
    fetch(`${baseUrl}/api/zappy/connections/active?accountId=${accountId}`)
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setConexoes(data);
        else if (data?.connections) setConexoes(data.connections);
        else if (data?.items) setConexoes(data.items);
        else if (data?.data) setConexoes(data.data);
        else if (data) console.log('Resposta conexões:', data);
      })
      .catch(() => setConexoes([]));
    // Buscar setores
    fetch(`${baseUrl}/api/zappy/queues?accountId=${accountId}`)
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        console.log("Resposta setores:", data);
        if (Array.isArray(data)) setSetores(data);
        else if (data?.queues) setSetores(data.queues);
        else if (data?.items) setSetores(data.items);
        else if (data?.data) setSetores(data.data);      })
      .catch(() => setSetores([]));
  }, [accountId]);

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
    if (!integrationId) {
      setError('Selecione uma conexão válida.');
      return;
    }
    if (!message) {
      setError('Digite uma mensagem.');
      return;
    }
    setError(null);
    const payload = {
      integrationId,
      accountId: String(accountId),
      active: isActive,
      event,
      message,
      adjustments: {},
      variables: {},
    };
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${baseUrl}/api/zappy/notification-rules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(() => {
        console.log('Redirecionando para home após criar notificação');
        window.location.href = '/';
      })
      .catch(err => {
        setError('Erro ao criar notificação: ' + err.message);
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

  return (
    <div className="page-container mx-auto w-full max-w-[420px] min-h-screen bg-[#F9FAFB] flex flex-col items-start relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      <button onClick={onBack} className="flex items-center gap-2 px-[14px] py-[6px] bg-[#DCFCE7] rounded-full shadow-none mt-0" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '19px', color: '#0B4D33', marginTop: '0px' }} data-testid="new-back-button">
        <span className="w-5 h-5 flex items-center justify-center mr-1">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19.5L5 12.5M5 12.5L12 5.5M5 12.5H19" stroke="#0B4D33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '19px', color: '#0B4D33' }}>Voltar</span>
      </button>
      <div className="flex flex-col items-start gap-4 rounded-2xl shadow-none p-0 min-h-[600px] w-full max-w-[388px] mt-4" style={{ background: 'transparent', boxShadow: 'none' }}>
        <h2 className="font-inter font-bold text-black mb-4 mt-4 text-left text-[22px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
          Nova notificação
        </h2>
        {/* Alerta importante padrão */}
        <div className="flex items-start gap-3 w-full rounded-[20px] p-[10px] mb-2" style={{ background: 'rgba(255, 194, 25, 0.2)', height: 131 }}>
          <Info className="w-6 h-6 text-black flex-shrink-0" />
          <div className="flex flex-col gap-[7px] flex-grow">
            <span className="font-semibold text-black" style={{ fontSize: 16, lineHeight: '19px', height: 19 }}>Importante</span>
            <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', height: 85, display: 'block' }}>
              Para que a notificação funcione corretamente, é essencial que o cliente tenha um número de telefone com DDI + DDD cadastrado (ex: +55 11 99999-9999) e que você possua o número ativo e conectado na sua conta Zappy.
            </span>
          </div>
        </div>
        <form className="flex flex-col gap-4 w-full" style={{ marginTop: 8, position: 'static' }} onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          {/* Evento */}
          <div className="flex flex-col gap-[5px] w-full relative">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Evento <span className="text-red-500">*</span></label>
            <select value={event} onChange={e => setEvent(e.target.value)} className="w-full h-[44px] px-[10px] font-medium text-[14px] text-black/70 rounded-[10px] border border-black/20 bg-white">
              <option value="">Selecione um evento</option>
              {eventos.map((ev, idx) => {
                const eventoObj = ev as any;
                const value = typeof ev === 'string' ? ev : (eventoObj.key || eventoObj.id || '');
                const label = typeof ev === 'string' ? beautifyEventName(ev) : beautifyEventName(eventoObj.key || eventoObj.id || '');
                return (
                  <option key={value || idx} value={value}>
                    {label}
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
                <option key={conn.id || idx} value={conn.id || ''}>{conn.name || conn.id}</option>
              ))}
            </select>
            <span className="form-description font-medium text-[14px] leading-[17px] text-black/70">Se não selecionar, a conexão padrão será usada.</span>
          </div>
          {/* Setor de atendimento */}
          <div className="flex flex-col gap-[5px] w-full relative">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Setor de atendimento</label>
            <select value={sectorId} onChange={e => setSectorId(e.target.value)} className="w-full h-[44px] px-[10px] font-medium text-[14px] text-black/70 rounded-[10px] border border-black/20 bg-white">
              <option value="">Selecione um setor</option>
              {setores.map((sector, idx) => (
                <option key={sector?.id || idx} value={sector?.id || ''}>{sector?.name || sector?.id || JSON.stringify(sector)}</option>
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
              {variables.map((v, idx) => (
                <button type="button" key={v.value || idx} className="variable-chip px-4 py-2 font-medium hover:bg-[#d2e0db] transition-colors bg-[#0B4D33]/10 rounded-full text-[#0B4D33] h-[37px] flex items-center justify-center" onClick={() => handleInsertVariable(v.value)}>
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
          <Button type="submit" className="save-button w-[262px] h-[48px] rounded-full bg-[#0B4D33] text-white font-semibold text-[16px] leading-[19px] mx-auto mt-4 flex items-center justify-center" style={{ fontWeight: 600, fontSize: 16, lineHeight: '19px', color: '#fff', position: 'static' }}>Salvar</Button>
        </form>
      </div>
    </div>
  );
}