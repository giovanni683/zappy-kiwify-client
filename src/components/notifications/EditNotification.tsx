import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface EditNotificationProps {
  notificationId: string;
  onBack: () => void;
}

export function EditNotification({ notificationId, onBack }: EditNotificationProps) {
  const [isActive, setIsActive] = useState(false);
  const [eventoOpen, setEventoOpen] = useState(false);
  const [eventoValue, setEventoValue] = useState('Compra aprovada');
  const eventoOptions = [
    'Compra aprovada',
    'Evento 1',
    'Evento 2',
    'Evento 3',
  ];
  const [conexaoOpen, setConexaoOpen] = useState(false);
  const [conexaoValue, setConexaoValue] = useState('Usar padrão da zappy');
  const conexaoOptions = [
    'Usar padrão da zappy',
    'Conexão 1',
    'Conexão 2',
    'Conexão 3',
  ];
  const [setorOpen, setSetorOpen] = useState(false);
  const [setorValue, setSetorValue] = useState('Não transferir');
  const setorOptions = [
    'Não transferir',
    'Financeiro',
    'Suporte',
    'Vendas',
  ];
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const variables = [
    { label: 'Nome completo', value: '{{nome_completo}}' },
    { label: 'Url boleto', value: '{{url_boleto}}' },
    { label: 'Expiração PIX', value: '{{expiracao_pix}}' },
    { label: 'Código PIX', value: '{{codigo_pix}}' },
    { label: 'Valor da compra', value: '{{valor_compra}}' },
    { label: 'Cód. barras boleto', value: '{{cod_barras_boleto}}' },
  ];

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
    alert('Ticket atualizado com sucesso!');
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
          {/* Evento */}
          <div className="flex flex-col gap-[5px] w-full relative">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Evento <span className="text-red-500">*</span></label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setEventoOpen(!eventoOpen)}
                className="w-full h-[44px] px-[10px] pr-[44px] font-medium text-[14px] leading-[17px] text-black/70 rounded-[10px] border border-black/20 bg-white text-left flex items-center justify-between cursor-pointer"
              >
                <span>{eventoValue}</span>
                <span className="absolute right-[10px] top-1/2 -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#0062DD" fillOpacity="0.05"/>
                    <path d="M16 10L12 14L8 10" stroke="black" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {eventoOpen && (
                <div className="absolute top-[48px] left-0 w-full bg-white border border-black/20 rounded-[10px] shadow-md z-20">
                  {eventoOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setEventoValue(opt); setEventoOpen(false); }}
                      className={`px-[10px] py-[10px] text-[14px] text-black/70 cursor-pointer rounded-[8px] ${eventoValue === opt ? 'bg-gray-100' : 'bg-white'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Conexão */}
          <div className="flex flex-col gap-[5px] w-full relative">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Conexão</label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setConexaoOpen(!conexaoOpen)}
                className="w-full h-[44px] px-[10px] pr-[44px] font-medium text-[14px] leading-[17px] text-black/70 rounded-[10px] border border-black/20 bg-white text-left flex items-center justify-between cursor-pointer"
              >
                <span>{conexaoValue}</span>
                <span className="absolute right-[10px] top-1/2 -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#0062DD" fillOpacity="0.05"/>
                    <path d="M16 10L12 14L8 10" stroke="black" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {conexaoOpen && (
                <div className="absolute top-[48px] left-0 w-full bg-white border border-black/20 rounded-[10px] shadow-md z-20">
                  {conexaoOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setConexaoValue(opt); setConexaoOpen(false); }}
                      className={`px-[10px] py-[10px] text-[14px] text-black/70 cursor-pointer rounded-[8px] ${conexaoValue === opt ? 'bg-gray-100' : 'bg-white'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="form-description font-medium text-[14px] leading-[17px] text-black/70">Se não selecionar, a conexão padrão será usada.</span>
          </div>
          {/* Setor de atendimento */}
          <div className="flex flex-col gap-[5px] w-full relative">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Setor de atendimento</label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setSetorOpen(!setorOpen)}
                className="w-full h-[44px] px-[10px] pr-[44px] font-medium text-[14px] leading-[17px] text-black/70 rounded-[10px] border border-black/20 bg-white text-left flex items-center justify-between cursor-pointer"
              >
                <span>{setorValue}</span>
                <span className="absolute right-[10px] top-1/2 -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#0062DD" fillOpacity="0.05"/>
                    <path d="M16 10L12 14L8 10" stroke="black" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {setorOpen && (
                <div className="absolute top-[48px] left-0 w-full bg-white border border-black/20 rounded-[10px] shadow-md z-20">
                  {setorOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setSetorValue(opt); setSetorOpen(false); }}
                      className={`px-[10px] py-[10px] text-[14px] text-black/70 cursor-pointer rounded-[8px] ${setorValue === opt ? 'bg-gray-100' : 'bg-white'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="form-description font-medium text-[14px] leading-[17px] text-black/70">O atendimento será transferido para este setor.</span>
          </div>
          {/* Mensagem */}
          <div className="flex flex-col gap-[5px] w-full">
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Mensagem</label>
            <textarea
              ref={messageRef}
              className="message-area resize-none w-full rounded-[10px] border border-black/20 p-[10px] text-[14px] font-medium text-black/70 h-[114px]"
              placeholder="Edite a mensagem..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ fontFamily: 'Inter, sans-serif' }}
            ></textarea>
            <div className="mt-2 text-[14px]">
              <span className="font-semibold text-black">Preview:</span>
              <div>{message}</div>
            </div>
          </div>
          {/* Variáveis */}
          <div className="variables-section w-full flex flex-col gap-2">
            <span className="variables-label font-medium text-[14px] text-black">Inserir variáveis:</span>
            <div className="variables-grid flex flex-wrap gap-2">
              {variables.map((v) => (
                <button
                  type="button"
                  key={v.value}
                  className="variable-chip px-4 py-2 font-medium hover:bg-[#d2e0db] transition-colors bg-[#0B4D33]/10 rounded-full text-[#0B4D33] h-[37px] flex items-center justify-center"
                  onClick={() => handleInsertVariable(v.value)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          {/* Toggle Ativar notificação */}
          <div className="toggle-group flex flex-row items-center gap-2 mt-2 h-[19px]">
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => setIsActive((prev) => !prev)}
              className="bg-none border-none p-0 cursor-pointer flex items-center gap-2"
            >
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
