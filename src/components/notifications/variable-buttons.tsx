import { Button } from '@/components/ui/button';
import { mockVariables } from '@/lib/mock-data';

interface VariableButtonsProps {
  onVariableInsert: (token: string) => void;
}

export function VariableButtons({ onVariableInsert }: VariableButtonsProps) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">Inserir variáveis:</p>
      <div className="flex flex-wrap gap-2">
        {mockVariables.map((variable) => (
          <Button
            key={variable.id}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onVariableInsert(variable.token)}
            className="text-xs bg-gray-50 hover:bg-gray-100"
          >
            {variable.name}
          </Button>
        ))}
      </div>
    </div>
  );
}