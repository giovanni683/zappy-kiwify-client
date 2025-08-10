import React from "react";
import Image from 'next/image';
import plus from '../../public/plus.svg';

interface AddNotificationButtonProps {
  className?: string;
  onClick?: () => void;
}

export function AddNotificationButton({ className, onClick }: AddNotificationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        gap: '10px',
        width: '144px',
        height: '44px',
        background: '#0B4D33',
        borderRadius: '100px',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        marginTop: '100px',
        marginLeft: 0,
        fontFamily: 'Inter',
      }}
    >
      <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M12 5V19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span
        style={{
          width: '90px',
          height: '24px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '24px',
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Notificação
      </span>
    </button>
  );
}
