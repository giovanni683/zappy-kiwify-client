import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Buscar..." }: SearchInputProps) {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '16px',
        gap: '16px',
        width: '388px',
        height: '44px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '100px',
        position: 'relative',
        background: '#fff',
      }}
    >
      <span style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Search style={{ width: 24, height: 24, stroke: 'rgba(0,0,0,0.7)', position: 'absolute', left: '12.5%', right: '12.5%', top: '1px', bottom: '0' }} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Buscar por nome"}
        style={{
          width: '130px',
          height: '24px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          textAlign: 'left',
          color: 'rgba(0,0,0,0.7)',
          border: 'none',
          background: 'transparent',
          outline: 'none',
        }}
      />
    </div>
  );
}