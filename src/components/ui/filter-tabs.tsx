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
      {/* Todos */}
      <button
        onClick={() => onFilterChange('todos')}
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
          background: activeFilter === 'todos' ? 'rgba(11,77,51,0.1)' : 'transparent',
          border: activeFilter === 'todos' ? '1px solid #0B4D33' : '1px solid transparent',
          borderRadius: '20px',
          fontFamily: 'Inter',
          fontWeight: activeFilter === 'todos' ? 700 : 500,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#000',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <span style={{ width: '49px', height: '24px', textAlign: 'center', fontWeight: activeFilter === 'todos' ? 700 : 500 }}>Todos</span>
      </button>
      {/* Ativos */}
      <button
        onClick={() => onFilterChange('ativos')}
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
          background: activeFilter === 'ativos' ? 'rgba(11,77,51,0.1)' : 'transparent',
          border: activeFilter === 'ativos' ? '1px solid #0B4D33' : '1px solid transparent',
          borderRadius: '20px',
          fontFamily: 'Inter',
          fontWeight: activeFilter === 'ativos' ? 700 : 500,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#000',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <span style={{ width: '48px', height: '24px', textAlign: 'center', fontWeight: activeFilter === 'ativos' ? 700 : 500 }}>Ativos</span>
      </button>
      {/* Inativos */}
      <button
        onClick={() => onFilterChange('inativos')}
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
          background: activeFilter === 'inativos' ? 'rgba(11,77,51,0.1)' : 'transparent',
          border: activeFilter === 'inativos' ? '1px solid #0B4D33' : '1px solid transparent',
          borderRadius: '20px',
          fontFamily: 'Inter',
          fontWeight: activeFilter === 'inativos' ? 700 : 500,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#000',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <span style={{ width: '60px', height: '24px', textAlign: 'center', fontWeight: activeFilter === 'inativos' ? 700 : 500 }}>Inativos</span>
      </button>
    </div>
  );
}