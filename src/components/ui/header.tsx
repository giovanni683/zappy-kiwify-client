import React from 'react';

export function Header() {
  return (
    <div
      style={{
        display: 'flex',
        height: '78px',
        padding: '20px 101px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0 0 12px 12px',
        background: '#0B4D33',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src="/logokiwify.svg"
          alt="Zappy"
          width={200}
          height={60}
        />
      </div>
    </div>
  );
}