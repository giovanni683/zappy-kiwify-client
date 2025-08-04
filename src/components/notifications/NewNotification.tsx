import { Header } from '@/components/ui/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewNotificationProps {
  onBack: () => void;
}

export function NewNotification({ onBack }: NewNotificationProps) {
  // Aqui você pode adicionar o formulário real de nova notificação
  return (
    <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-3">
            <span className="w-5 h-5 text-gray-600">←</span>
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Nova Notificação</h2>
        </div>
        <Card className="p-4 mb-4">
          <p>Formulário de nova notificação aqui...</p>
        </Card>
        <Button className="w-full" onClick={onBack}>
          Voltar
        </Button>
      </div>
    </div>
  );
}
