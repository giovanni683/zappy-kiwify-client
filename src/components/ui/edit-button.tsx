import { inter } from '@/app/layout';
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
        fontFamily: 'Inter',
      }}
    >
      <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image src={squarePenIcon} alt="Editar" width={24} height={24} />
      </span>
      <span
        className={inter.className}
        style={{
          width: '45px',
          height: '24px',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#000',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Editar
      </span>
    </button>
  );
}

