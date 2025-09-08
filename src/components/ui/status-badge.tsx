import React from 'react';
import { inter } from '@/app/layout';

interface StatusBadgeProps {
  isActive: boolean;
  className?: string;
}

export function StatusBadge({ isActive, className }: StatusBadgeProps) {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
    gap: '13px',
    width: '100%',
    height: '36px',
    background: isActive ? '#E1E9E7' : '#FDE2E1',
    borderRadius: '100px',
  };
  return isActive ? (
    <div className={inter.className + (className ? ` ${className}` : '')} style={baseStyle}>
      <span style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '8.33%', right: '8.33%', top: '0px', bottom: '8.33%' }}>
          <circle cx="12" cy="12" r="10" stroke="#0B4D33" strokeWidth="2" fill="none" />
          <path d="M9 12l2 2l4-4" stroke="#0B4D33" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span style={{ height: '24px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: '#0B4D33', textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        Ativo
      </span>
    </div>
  ) : (
    <div className={inter.className + (className ? ` ${className}` : '')} style={baseStyle}>
      <span style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '8.33%', right: '8.33%', top: '0px', bottom: '8.33%' }}>
          <circle cx="12" cy="12" r="10" stroke="#E14B4B" strokeWidth="2" fill="none" />
          <path d="M9 9l6 6M15 9l-6 6" stroke="#E14B4B" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span style={{ height: '24px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: '#E14B4B', textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        Inativo
      </span>
    </div>
  );
}