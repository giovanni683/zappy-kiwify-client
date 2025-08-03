import { cn } from '@/lib/utils';

interface FilterTabsProps {
  activeFilter: 'todos' | 'ativos' | 'inativos';
  onFilterChange: (filter: 'todos' | 'ativos' | 'inativos') => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const filters = [
    { id: 'todos' as const, label: 'Todos' },
    { id: 'ativos' as const, label: 'Ativos' },
    { id: 'inativos' as const, label: 'Inativos' },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeFilter === filter.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}