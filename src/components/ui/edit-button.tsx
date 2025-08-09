import { SquarePen } from "lucide-react";
import React from "react";
import Image from 'next/image';
import squarePenIcon from '../../public/square-pen.svg';

interface EditButtonProps {
  className?: string;
  onClick?: () => void;
}

export function EditButton({ className, onClick }: EditButtonProps) {
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
        width: '99px',
        height: '44px',
        background: '#E5E7EB',
        borderRadius: '100px',
        position: 'relative',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <span style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image src={squarePenIcon} alt="Editar" width={24} height={24} style={{ position: 'absolute', left: '12.5%', right: '8.35%', top: '8.35%', bottom: '12.5%' }} />
      </span>
      <span
        style={{
          width: '45px',
          height: '24px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          textAlign: 'center',
          color: '#000',
        }}
      >
        Editar
      </span>
    </button>
  );
}
