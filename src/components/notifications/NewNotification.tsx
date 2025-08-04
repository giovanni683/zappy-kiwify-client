

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
    <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col justify-center items-end gap-[22px] w-full bg-white rounded-2xl shadow-none mt-8 mb-8 p-4 min-h-[600px]">
        {/* Botão Voltar */}
        <div className="flex items-center mb-6 w-full">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 bg-[#E1E9E7] rounded-full text-[#0B4D33] font-medium text-base mr-3"
          >
            <span className="mr-2">←</span> Voltar
          </button>
          <h2 className="text-2xl font-bold text-gray-900 ml-2">Nova notificação</h2>
        </div>

        {/* Card de informação */}
        <div className="flex items-start gap-3 w-full bg-[#FFF8E1] rounded-2xl p-4 mb-2">
          <Info className="w-6 h-6 text-[#000] mt-1" />
          <div>
            <span className="font-bold text-base text-black block mb-1">Importante</span>
            <span className="text-sm text-black">
              Para a notificação funcione corretamente, é essencial que o cliente tenha um número de telefone com DDI + DDD cadastrado (ex: +55 11 9999-9999) e que você possua o número ativo e conectado na sua conta Zappy.
            </span>
          </div>
        </div>

        {/* Formulário (exemplo visual, substitua pelos campos reais depois) */}
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-base text-black">Evento <span className="text-red-500">*</span></label>
            <select className="h-11 px-4 rounded-2xl border border-black/20 bg-white text-base">
              <option>Selecione um evento</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-base text-black">Conexão</label>
            <select className="h-11 px-4 rounded-2xl border border-black/20 bg-white text-base">
              <option>Usar padrão da zappy</option>
            </select>
            <span
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: 20,
                lineHeight: '24px',
                color: '#444',
                display: 'block',
                marginTop: 2,
              }}
            >
              Se não selecionar, a conexão padrão será usada.
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-base text-black">Setor de atendimento</label>
            <select className="h-11 px-4 rounded-2xl border border-black/20 bg-white text-base">
              <option>Não transferir</option>
            </select>
            <span className="text-xs text-black/70">O atendimento será transferido para este setor.</span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-base text-black">Mensagem</label>
            <textarea
              ref={messageRef}
              className="h-24 px-4 py-2 rounded-2xl border border-black/20 bg-white text-base resize-none"
              placeholder="Escreva sua mensagem..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 16, lineHeight: '24px', color: '#000' }}
            ></textarea>
          </div>
          <div className="flex flex-wrap gap-2">
            {variables.map((v) => (
              <button
                type="button"
                key={v.value}
                className="rounded-full bg-[#E1E9E7] text-[#0B4D33] px-4 py-2 text-sm font-medium hover:bg-[#d2e0db] transition-colors"
                onClick={() => handleInsertVariable(v.value)}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-medium text-base text-black">Ativar notificação</span>
            <input type="checkbox" className="w-6 h-6 rounded-full border border-black/20 accent-[#0B4D33]" />
          </div>
          <Button type="submit" className="w-full h-12 rounded-full bg-[#0B4D33] text-white text-lg font-bold mt-4">Salvar</Button>
        </form>
      </div>
    </div>
  );
}
