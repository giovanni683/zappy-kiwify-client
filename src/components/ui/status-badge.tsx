import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface StatusBadgeProps {
  isActive: boolean;
  className?: string;
}

export function StatusBadge({ isActive, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        isActive 
          ? "bg-green-100 text-green-800 border border-green-200" 
          : "bg-red-100 text-red-800 border border-red-200",
        className
      )}
    >
      {isActive ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          Ativo
        </>
      ) : (
        <>
          <X className="w-4 h-4 mr-1" />
          Inativo
        </>
      )}
    </div>
  );
}