"use client";

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ConnectionAlert } from '@/components/notifications/connection-alert';
import { VariableButtons } from '@/components/notifications/variable-buttons';
import { listEvents, listConnections, listSectors } from '@/api/zappy';
import { Event, Connection, Sector, Notification } from '@/types/notification';

interface NotificationFormProps {
  initialData?: Notification;
  onSubmit: (data: any) => void;
  submitLabel?: string;
}

export function NotificationForm({ 
  initialData, 
  onSubmit, 
  submitLabel = "Salvar" 
}: NotificationFormProps) {
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState({
    event: initialData?.event || '',
    connection: initialData?.connection || '',
    sector: initialData?.sector || 'nao_transferir',
    message: initialData?.message || '',
    isActive: initialData?.isActive || false,
  });

  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);

  useEffect(() => {
    listEvents().then(setEvents);
    listConnections().then(setConnections);
    listSectors().then(setSectors);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.event) {
      alert('Selecione um evento');
      return;
    }

    if (!formData.connection) {
      setShowConnectionAlert(true);
      return;
    }

    onSubmit(formData);
  };

  const handleVariableInsert = (token: string) => {
    if (messageRef.current) {
      const textarea = messageRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentMessage = formData.message;
      const newMessage = 
        currentMessage.substring(0, start) + 
        token + 
        currentMessage.substring(end);
      
      setFormData(prev => ({ ...prev, message: newMessage }));
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + token.length, start + token.length);
      }, 0);
    }
  };

  const availableConnections = connections.filter(conn => conn.isConnected);
  const hasNoConnections = availableConnections.length === 0;

  return (
    <>
      <ConnectionAlert type={showConnectionAlert ? "no-connection" : "warning"} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="event" className="text-sm font-medium text-gray-700">
            Evento <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.event} onValueChange={(value) => setFormData(prev => ({ ...prev, event: value }))}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione um evento" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="connection" className="text-sm font-medium text-gray-700">
            Conexão
          </Label>
          <Select 
            value={formData.connection} 
            onValueChange={(value) => {
              setFormData(prev => ({ ...prev, connection: value }));
              setShowConnectionAlert(false);
            }}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={hasNoConnections ? "Sem conexão" : "Usar padrão da zappy"} />
            </SelectTrigger>
            <SelectContent>
              {availableConnections.map((connection) => (
                <SelectItem key={connection.id} value={connection.id}>
                  {connection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Se não selecionar, a conexão padrão será usada.
          </p>
        </div>

        <div>
          <Label htmlFor="sector" className="text-sm font-medium text-gray-700">
            Setor de atendimento
          </Label>
          <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.id}>
                  {sector.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            O atendimento será transferido para este setor.
          </p>
        </div>

        <div>
          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
            Mensagem {!initialData && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            ref={messageRef}
            id="message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Escreva sua mensagem..."
            className="mt-1 min-h-[120px]"
          />
        </div>

        <VariableButtons onVariableInsert={handleVariableInsert} />

        <div className="flex items-center justify-between">
          <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Ativar notificação
          </Label>
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
        >
          {submitLabel}
        </Button>
      </form>
    </>
  );
}