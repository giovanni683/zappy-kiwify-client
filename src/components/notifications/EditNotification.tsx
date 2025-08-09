

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { mockNotifications } from '@/lib/mock-data';

interface EditNotificationProps {
  notificationId: string;
  onBack: () => void;
}

export function EditNotification({ notificationId, onBack }: EditNotificationProps) {
  // Dropdown customizado para Evento
  const [eventoOpen, setEventoOpen] = useState(false);
  const [eventoValue, setEventoValue] = useState('Compra aprovada');
  const eventoOptions = [
    'Compra aprovada',
    'Evento 1',
    'Evento 2',
    'Evento 3',
  ];
  // Dropdown customizado para Conexão
  const [conexaoOpen, setConexaoOpen] = useState(false);
  const [conexaoValue, setConexaoValue] = useState('Usar padrão da zappy');
  const conexaoOptions = [
    'Usar padrão da zappy',
    'Conexão 1',
    'Conexão 2',
    'Conexão 3',
  ];
  // Dropdown customizado para Setor de atendimento
  const [setorOpen, setSetorOpen] = useState(false);
  const [setorValue, setSetorValue] = useState('Não transferir');
  const setorOptions = [
    'Não transferir',
    'Financeiro',
    'Suporte',
    'Vendas',
  ];
  // Toggle ativar notificação
  const [isActive, setIsActive] = useState(false);
  const notification = mockNotifications.find(n => n.id === notificationId);
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

  if (!notification) {
    return <div className="p-4">Notificação não encontrada.</div>;
  }

  return (
    <div
      className="page-container"
      style={{
        fontFamily: 'Inter, sans-serif',
        width: 420,
        minHeight: '100vh',
        background: '#F9FAFB',
        border: '1px solid #ccc',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Botão Voltar fixo no topo - padrão NewNotification */}
      <button
        onClick={onBack}
        className="flex items-center px-4 py-2 bg-[#DCFCE7] rounded-full text-[#0B4D33] font-semibold text-[14px] leading-[17px] border-none shadow-none"
        style={{ width: 90, height: 33, position: 'absolute', left: 16, top: 20, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}
      >
        <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginRight: 4, marginLeft: -4 }}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19.5L5 12.5M5 12.5L12 5.5M5 12.5H19" stroke="#0B4D33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#0B4D33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Voltar</span>
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
        <h2 className="font-bold text-black" style={{ fontSize: 20, lineHeight: '24px', fontFamily: 'Inter, sans-serif', fontWeight: 700, marginTop: 0, marginLeft: 0 }}>Editar notificação</h2>
        {/* Card de informação */}
        <div className="flex items-start gap-3 w-full rounded-[20px] p-[10px] mb-2" style={{ background: 'rgba(255, 194, 25, 0.2)', height: 131 }}>
          <Info className="w-6 h-6 text-black flex-shrink-0" />
          <div className="flex flex-col gap-[7px] flex-grow">
            <span className="font-semibold text-black" style={{ fontSize: 16, lineHeight: '19px', height: 19 }}>Importante</span>
            <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', height: 85, display: 'block' }}>
              Para que a notificação funcione corretamente, é essencial que o cliente tenha um número de telefone com DDI + DDD cadastrado (ex: +55 11 99999-9999) e que você possua o número ativo e conectado na sua conta Zappy.
            </span>
          </div>
        </div>
        {/* Formulário de edição igual NewNotification */}
        <form className="flex flex-col gap-4 w-full" style={{ marginTop: 8, position: 'static' }}>
          <div className="flex flex-col gap-[5px] w-full" style={{ position: 'relative' }}>
            <label className="form-label" style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#000' }}>Evento <span className="text-red-500">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setEventoOpen(!eventoOpen)}
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 44px 0 10px',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '17px',
                  color: 'rgba(0,0,0,0.7)',
                  borderRadius: 10,
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#fff',
                  textAlign: 'left',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
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
                <div style={{
                  position: 'absolute',
                  top: 48,
                  left: 0,
                  width: '100%',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.2)',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 20,
                }}>
                  {eventoOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setEventoValue(opt); setEventoOpen(false); }}
                      style={{
                        padding: '10px',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.7)',
                        cursor: 'pointer',
                        background: eventoValue === opt ? '#F3F4F6' : '#fff',
                        borderRadius: 8,
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[5px] w-full" style={{ position: 'relative' }}>
            <label className="form-label" style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#000' }}>Conexão</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setConexaoOpen(!conexaoOpen)}
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 44px 0 10px',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '17px',
                  color: 'rgba(0,0,0,0.7)',
                  borderRadius: 10,
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#fff',
                  textAlign: 'left',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
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
                <div style={{
                  position: 'absolute',
                  top: 48,
                  left: 0,
                  width: '100%',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.2)',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 20,
                }}>
                  {conexaoOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setConexaoValue(opt); setConexaoOpen(false); }}
                      style={{
                        padding: '10px',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.7)',
                        cursor: 'pointer',
                        background: conexaoValue === opt ? '#F3F4F6' : '#fff',
                        borderRadius: 8,
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="form-description" style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)' }}>Se não selecionar, a conexão padrão será usada.</span>
          </div>
          <div className="flex flex-col gap-[5px] w-full" style={{ position: 'relative' }}>
            <label className="form-label" style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#000' }}>Setor de atendimento</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setSetorOpen(!setorOpen)}
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 44px 0 10px',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '17px',
                  color: 'rgba(0,0,0,0.7)',
                  borderRadius: 10,
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#fff',
                  textAlign: 'left',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
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
                <div style={{
                  position: 'absolute',
                  top: 48,
                  left: 0,
                  width: '100%',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.2)',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 20,
                }}>
                  {setorOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setSetorValue(opt); setSetorOpen(false); }}
                      style={{
                        padding: '10px',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.7)',
                        cursor: 'pointer',
                        background: setorValue === opt ? '#F3F4F6' : '#fff',
                        borderRadius: 8,
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="form-description" style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)' }}>O atendimento será transferido para este setor.</span>
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#000' }}>Mensagem</label>
            <textarea
              ref={messageRef}
              className="message-area resize-none"
              placeholder="Edite a mensagem..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', borderRadius: 10, border: '1px solid rgba(0,0,0,0.2)', height: 114, padding: 10, fontFamily: 'Inter, sans-serif' }}
            />
          </div>
          <div className="variables-section w-full flex flex-col gap-2">
            <span className="variables-label" style={{ fontWeight: 500, fontSize: 14, color: '#000' }}>Inserir variáveis:</span>
            <div className="variables-grid flex flex-wrap gap-2">
              {variables.map((v) => (
                <button
                  type="button"
                  key={v.value}
                  className="variable-chip px-4 py-2 font-medium hover:bg-[#d2e0db] transition-colors"
                  style={{ background: 'rgba(11, 77, 51, 0.1)', borderRadius: 100, fontWeight: 500, fontSize: 14, lineHeight: '17px', color: '#0B4D33', height: 37, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}
                  onClick={() => handleInsertVariable(v.value)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <div className="toggle-group flex flex-row items-center gap-2 mt-2" style={{ height: 19 }}>
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => setIsActive((prev) => !prev)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span className="toggle-label" style={{ fontWeight: 600, fontSize: 16, lineHeight: '19px', color: '#000', marginRight: 8 }}>
                Ativar notificação
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <svg width="36" height="17" viewBox="0 0 36 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2001_305)">
                    <rect width="36" height="17" rx="8.5" fill={isActive ? '#0B4D33' : '#E1E1E1'} />
                    <g filter="url(#filter0_d_2001_305)">
                      <circle cx={isActive ? "27.5" : "8.5"} cy="8.5" r="7.5" fill={isActive ? '#DCFCE7' : '#ACACAC'} />
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
