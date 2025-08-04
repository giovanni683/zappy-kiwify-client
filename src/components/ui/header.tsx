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
          src="/zappy.png" 
          alt="Zappy"
          style={{ height: 32, width: 32, objectFit: 'contain', marginRight: 8 }}
        />
        <span style={{ color: '#fff', fontSize: 24, fontWeight: 400, fontFamily: 'Inter, sans-serif', marginRight: 8 }}>
          Zappy
        </span>
        <span style={{ color: '#A7F3D0', fontSize: 24, fontWeight: 700, margin: '0 8px', fontFamily: 'Inter, sans-serif' }}>
          &
        </span>
        <span style={{ color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
          Kiwify
        </span>
      </div>
    </div>
  );
}