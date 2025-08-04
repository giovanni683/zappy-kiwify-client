import Image from 'next/image';
import React from 'react';
import zappylogo from '../../public/logokiwify.svg.svg';

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
        <Image
          src={zappylogo} 
          alt="Zappy"
          width={200}
        />
      </div>
    </div>
  );
}