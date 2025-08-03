import { AlertTriangle, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ConnectionAlertProps {
  type: 'warning' | 'no-connection';
}

export function ConnectionAlert({ type }: ConnectionAlertProps) {
  if (type === 'warning') {
    return (
      <Alert className="bg-yellow-50 border-yellow-200 mb-6">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Importante</strong>
          <br />
          Para a notificação funcione corretamente, é essencial que o cliente tenha um número de telefone com DDI + DDD cadastrado (ex: +55 11 9999-9999) e que você possua o número ativo e conectado na sua conta Zappy.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-yellow-50 border-yellow-200 mb-6">
      <Zap className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <strong>Sem conexão Zappy!</strong>
        <br />
        Conecte um número na Zappy para poder selecionar uma conexão e enviar notificações.
      </AlertDescription>
    </Alert>
  );
}