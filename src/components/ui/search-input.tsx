import React from 'react';
import { inter } from '@/app/layout';
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
      className={`flex flex-row items-center px-4 gap-4 w-[388px] h-[44px] border border-black/20 rounded-full bg-white ${inter.className}`}
      style={{ boxSizing: 'border-box', position: 'relative' }}
    >
      <span className="relative w-6 h-6 flex items-center justify-center">
        <Search style={{ width: 24, height: 24, stroke: 'rgba(0,0,0,0.7)', position: 'absolute', left: '12.5%', right: '12.5%', top: '1px', bottom: '0' }} />
      </span>
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Buscar por nome"}
        className={
          `${inter.className} font-medium text-[16px] leading-6 text-black/70 bg-transparent border-none outline-none w-[132px] h-6 p-0`
        }
        style={{ boxShadow: 'none' }}
      />
    </div>
  );
}