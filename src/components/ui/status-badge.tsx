import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface StatusBadgeProps {
  isActive: boolean;
  className?: string;
}

export function StatusBadge({ isActive, className }: StatusBadgeProps) {
  return isActive ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
        gap: '13px',
        width: '129px',
        height: '36px',
        background: '#E1E9E7',
        borderRadius: '100px',
      }}
      className={className}
    >
      <span style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Usando CircleCheck para o teste visual */}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '8.33%', right: '8.33%', top: '0px', bottom: '8.33%' }}>
          <circle cx="12" cy="12" r="10" stroke="#0B4D33" strokeWidth="2" fill="none" />
          <path d="M9 12l2 2l4-4" stroke="#0B4D33" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        style={{
          height: '24px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#0B4D33',
          textAlign: 'center',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Ativo
      </span>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
        gap: '13px',
        width: '129px',
        height: '36px',
        background: 'rgba(239,68,68,0.2)',
        borderRadius: '100px',
      }}
      className={className}
    >
      <span style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Usando CircleX para o teste visual */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '8.33%', right: '8.33%', top: '8.33%', bottom: '8.33%' }}>
          <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" fill="none" />
          <path d="M9 9l6 6M15 9l-6 6" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        style={{
          height: '24px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#EF4444',
          textAlign: 'center',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Inativo
      </span>
    </div>
  );
}