import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface NewNotificationProps {
  onBack: () => void;
}

function renderMessagePreview(text: string) {
  const regex = /(\{\{[^}]+\}\})/g;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        /^\{\{[^}]+\}\}$/.test(part) ? (
          <span
            key={i}
            style={{
              background: 'transparent',
              color: '#00B16C',
              borderRadius: 4,
              padding: '0 2px',
              fontWeight: 600,
            }}
          >
            {part}
          </span>
        ) : (
          <span key={i} style={{ color: '#000' }}>{part}</span>
        )
      )}
    </>
  );
}

export function NewNotification({ onBack }: NewNotificationProps) {
  // Estados
  const [eventoValue, setEventoValue] = useState('Selecione um evento');
  const [eventoOpen, setEventoOpen] = useState(false);
  const eventoOptions = ['Selecione um evento', 'Evento 1', 'Evento 2'];

  const [conexaoValue, setConexaoValue] = useState('Selecione uma conexão');
  const [conexaoOpen, setConexaoOpen] = useState(false);
  const conexaoOptions = ['Selecione uma conexão', 'Conexão 1', 'Conexão 2'];

  const [setorValue, setSetorValue] = useState('Selecione um setor');
  const [setorOpen, setSetorOpen] = useState(false);
  const setorOptions = ['Selecione um setor', 'Setor 1', 'Setor 2'];

  const [message, setMessage] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);

  // Simulação do estado de conexão Zappy
  const isConnected = false; // Troque para true para simular conectado

  // Variáveis disponíveis para inserção
  const variables = [
    { label: 'Nome', value: '{{nome}}' },
    { label: 'Telefone', value: '{{telefone}}' },
    { label: 'Setor', value: '{{setor}}' },
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
    if (eventoValue === 'Selecione um evento') {
      setError('Selecione um evento válido.');
      return;
    }
    setError(null);
    alert('Notificação criada com sucesso!');
  }

  return (
    <div className="page-container mx-auto w-full max-w-[420px] min-h-screen bg-[#F9FAFB] flex flex-col items-start relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-[14px] py-[6px] bg-[#DCFCE7] rounded-full shadow-none mt-0"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '19px', color: '#0B4D33', marginTop: '0px' }}
        data-testid="new-back-button"
      >
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
          <div className="flex flex-col gap-[5px] w-full" style={{ position: 'relative' }}>
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Evento <span className="text-red-500">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setEventoOpen(!eventoOpen)}
                className="w-full h-[44px] px-[10px] pr-[44px] font-medium text-[14px] leading-[17px] text-black/70 rounded-[10px] border border-black/20 bg-white text-left flex items-center justify-between cursor-pointer"
              >
                <span>{eventoValue}</span>
                <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
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
          {/* Conexão + alerta de conexão */}
          <div className="flex flex-col gap-[5px] w-full" style={{ position: 'relative' }}>
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Conexão</label>
            {isConnected ? (
              <div style={{ position: 'relative', width: '100%' }}>
                <button
                  type="button"
                  onClick={() => setConexaoOpen(!conexaoOpen)}
                  className="w-full h-[44px] px-[10px] pr-[44px] font-medium text-[14px] leading-[17px] text-black/70 rounded-[10px] border border-black/20 bg-white text-left flex items-center justify-between cursor-pointer"
                >
                  <span>{conexaoValue}</span>
                  <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
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
                <span className="form-description font-medium text-[14px] leading-[17px] text-black/70">Se não selecionar, a conexão padrão será usada.</span>
              </div>
            ) : (
              <div style={{ position: 'relative', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', height: 44, background: '#FFF', border: '1px solid #FFC219', borderRadius: 10, paddingLeft: 12, paddingRight: 12 }}>
                  <span className="flex items-center gap-2 w-full" style={{ justifyContent: 'space-between' }}>
                    <span className="font-medium text-black/70 text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>Sem conexão</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 20H12.01M8.5 16.429C9.43464 15.5129 10.6912 14.9997 12 14.9997C13.3088 14.9997 14.5654 15.5129 15.5 16.429M5 12.859C6.41803 11.4689 8.21781 10.5325 10.17 10.169M19 12.859C18.3979 12.2688 17.7235 11.757 16.993 11.336M2 8.82C3.2366 7.71408 4.64809 6.82095 6.177 6.177M22 8.82C20.4747 7.45581 18.6864 6.41814 16.7452 5.77083C14.8039 5.12352 12.7508 4.88025 10.712 5.056M2 2L22 22" stroke="#FFC219" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                {/* Aviso de sem conexão Zappy logo abaixo do campo de conexão, igual ao bloco Importante */}
                <div className="flex items-start gap-3 w-full rounded-[20px] p-[10px] mb-2" style={{ background: 'rgba(255, 194, 25, 0.2)', height: 80, marginTop: 8, marginBottom: 8 }}>
                  <Info className="w-6 h-6 text-black flex-shrink-0" />
                  <div className="flex flex-col gap-[7px] flex-grow">
                    <span className="font-semibold text-black" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '19px', height: 19 }}>Sem conexão Zappy!</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', height: 34, display: 'block' }}>
                      Conecte um número na Zappy para poder selecionar uma conexão e enviar notificações.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Setor de atendimento */}
          <div className="flex flex-col gap-[5px] w-full" style={{ position: 'relative' }}>
            <label className="form-label font-semibold text-[14px] leading-[17px] text-black">Setor de atendimento</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setSetorOpen(!setorOpen)}
                className="w-full h-[44px] px-[10px] pr-[44px] font-medium text-[14px] leading-[17px] text-black/70 rounded-[10px] border border-black/20 bg-white text-left flex items-center justify-between cursor-pointer"
              >
                <span>{setorValue}</span>
                <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
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
              placeholder="Escreva sua mensagem..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ fontFamily: 'Inter, sans-serif' }}
            ></textarea>
            <div className="mt-2 text-[14px]">
              <span className="font-semibold text-black">Preview:</span>
              <div>{renderMessagePreview(message)}</div>
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
          {/* Toggle */}
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
          <Button type="submit" className="save-button w-[262px] h-[48px] rounded-full bg-[#0B4D33] text-white font-semibold text-[16px] leading-[19px] mx-auto mt-4 flex items-center justify-center" style={{ fontWeight: 600, fontSize: 16, lineHeight: '19px', color: '#fff', position: 'static' }}>Salvar</Button>
        </form>
      </div>
    </div>
  );
}