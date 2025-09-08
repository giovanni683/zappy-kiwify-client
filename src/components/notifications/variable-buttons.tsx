import { Button } from '@/components/ui/button';

interface VariableButtonsProps {
  onVariableInsert: (token: string) => void;
}

export function VariableButtons({ onVariableInsert }: VariableButtonsProps) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">Inserir variáveis:</p>
      <div className="flex flex-wrap gap-2">
        {/* Aqui você deve mapear suas variáveis reais */}
      </div>
    </div>
  );
}