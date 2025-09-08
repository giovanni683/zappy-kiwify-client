import React from 'react';
import { SearchInput } from '@/components/ui/search-input';
import { FilterTabs } from '@/components/ui/filter-tabs';

interface FilterControlsProps {
  searchTerm: string;
  filterStatus: 'todos' | 'ativos' | 'inativos';
  onSearchChange: (term: string) => void;
  onFilterChange: (status: 'todos' | 'ativos' | 'inativos') => void;
}

export function FilterControls({ searchTerm, filterStatus, onSearchChange, onFilterChange }: FilterControlsProps) {
  return (
    <div className="space-y-4">
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Buscar por nome"
      />
      <FilterTabs
        activeFilter={filterStatus}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}