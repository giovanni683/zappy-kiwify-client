

import { useRef, useState } from 'react';

// Função para renderizar a mensagem com variáveis destacadas
function renderMessagePreview(text: string) {
  // Regex para {{variavel}}
  const regex = /(\{\{[^}]+\}\})/g;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (/^\{\{[^}]+\}\}$/.test(part)) {
      return (
        <span
          key={i}
          style={{
            background: '#E1F7E3',
            color: '#0B4D33',
            borderRadius: 8,
            padding: '2px 8px',
            margin: '0 2px',
            fontWeight: 600,
            fontFamily: 'Inter',
            fontSize: 16,
            lineHeight: '24px',
            display: 'inline-block',
          }}
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface NewNotificationProps {
  onBack: () => void;
}

export function NewNotification({ onBack }: NewNotificationProps) {
  // Variáveis dinâmicas para mensagem
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
        <span className="mr-1" style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</span>
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
        <h2 className="font-bold text-black" style={{ fontSize: 20, lineHeight: '24px', fontFamily: 'Inter, sans-serif', fontWeight: 700, marginTop: 0, marginLeft: 0 }}>Nova notificação</h2>

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

        {/* Formulário (exemplo visual, substitua pelos campos reais depois) */}
        <form className="flex flex-col gap-4 w-full" style={{ marginTop: 8, position: 'static' }}>
          <div className="flex flex-col gap-[5px] w-full">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#000' }}>Evento <span className="text-red-500">*</span></label>
            <select className="select-box" style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', borderRadius: 10, border: '1px solid rgba(0,0,0,0.2)', height: 44, padding: 10 }}>
              <option>Selecione um evento</option>
            </select>
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#000' }}>Conexão</label>
            <select className="select-box" style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', borderRadius: 10, border: '1px solid rgba(0,0,0,0.2)', height: 44, padding: 10 }}>
              <option>Usar padrão da zappy</option>
            </select>
            <span className="form-description" style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)' }}>Se não selecionar, a conexão padrão será usada.</span>
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#000' }}>Setor de atendimento</label>
            <select className="select-box" style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', borderRadius: 10, border: '1px solid rgba(0,0,0,0.2)', height: 44, padding: 10 }}>
              <option>Não transferir</option>
            </select>
            <span className="form-description" style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)' }}>O atendimento será transferido para este setor.</span>
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 14, lineHeight: '17px', color: '#000' }}>Mensagem</label>
            <textarea
              ref={messageRef}
              className="message-area resize-none"
              placeholder="Escreva sua mensagem..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', borderRadius: 10, border: '1px solid rgba(0,0,0,0.2)', height: 114, padding: 10, fontFamily: 'Inter, sans-serif' }}
            ></textarea>
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
            <span className="toggle-label" style={{ fontWeight: 600, fontSize: 16, lineHeight: '19px', color: '#000' }}>Ativar notificação</span>
            <input type="checkbox" className="w-6 h-6 rounded-full border border-black/20 accent-[#0B4D33]" />
          </div>
          <Button type="submit" className="save-button w-[262px] h-[48px] rounded-full bg-[#0B4D33] text-white font-semibold text-[16px] leading-[19px] mx-auto mt-8 flex items-center justify-center" style={{ fontWeight: 600, fontSize: 16, lineHeight: '19px', color: '#fff', position: 'static' }}>Salvar</Button>
        </form>
      </div>
    </div>
  );
}
