"use client";

import React from 'react';
import { inter } from '@/app/layout';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Notification } from '@/types/notification';

interface NotificationCardClientProps {
  notification: Notification;
  onClick?: () => void;
  onEdit?: () => void;
}

export function NotificationCardClient({ notification, onClick, onEdit }: NotificationCardClientProps) {
  return (
    <div
      data-testid={`notificacao-${notification.id}`}
      className={inter.className}
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '10px',
        gap: '10px',
        width: '100%',
        maxWidth: '388px',
        height: '90px',
        background: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '12px',
        cursor: 'pointer',
        marginBottom: '16px',
      }}
      onClick={onClick}
    >
      {/* Frame 38703 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        gap: '40px',
        width: '100%',
        height: '70px',
      }}>
        {/* Frame 38701 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 0,
          gap: '10px',
          width: '139px',
          height: '70px',
        }}>
          <span
              style={{
                width: '210px',
                height: '24px',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#000',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                letterSpacing: '0px',
              }}
              title={notification.name}
            >
              {notification.name}
            </span>
          {/* Frame 38699 - StatusBadge precisa seguir dimensões e layout */}
          <StatusBadge isActive={notification.isActive} />
        </div>
        {/* Frame 38702 - Botão Editar */}
        <button
          className={inter.className}
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
            border: 'none',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#000',
          }}
          onClick={e => { e.stopPropagation(); onEdit && onEdit(); }}
        >
          <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.99998H5C4.46957 2.99998 3.96086 3.2107 3.58579 3.58577C3.21071 3.96084 3 4.46955 3 4.99998V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12M18.375 2.62498C18.7728 2.22716 19.3124 2.00366 19.875 2.00366C20.4376 2.00366 20.9772 2.22716 21.375 2.62498C21.7728 3.02281 21.9963 3.56237 21.9963 4.12498C21.9963 4.68759 21.7728 5.22716 21.375 5.62498L12.362 14.639C12.1245 14.8762 11.8312 15.0499 11.509 15.144L8.636 15.984C8.54995 16.0091 8.45874 16.0106 8.37191 15.9883C8.28508 15.9661 8.20583 15.9209 8.14245 15.8575C8.07907 15.7942 8.03389 15.7149 8.01164 15.6281C7.9894 15.5412 7.9909 15.45 8.016 15.364L8.856 12.491C8.95053 12.169 9.12453 11.876 9.362 11.639L18.375 2.62498Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span className={inter.className} style={{ marginLeft: 2 }}>Editar</span>
        </button>
      </div>
    </div>
  );
}