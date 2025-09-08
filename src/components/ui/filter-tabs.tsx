import React from 'react';

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
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '8px',
        gap: '10px',
        width: '388px',
        height: '46px',
        background: '#F3F4F6',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '20px',
      }}
    >
      {filters.map(f => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id)}
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            gap: '10px',
            width: '107px',
            height: '36px',
            background: activeFilter === f.id ? 'rgba(11,77,51,0.1)' : 'transparent',
            border: activeFilter === f.id ? '1px solid #0B4D33' : '1px solid transparent',
            borderRadius: '20px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: activeFilter === f.id ? 700 : 500,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#000',
            textAlign: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <span>{f.label}</span>
        </button>
      ))}
    </div>
  );
}