
"use client";
import React, { useEffect } from 'react';
import { startNotificationWebSocket, stopNotificationWebSocket } from '@/lib/notification-store';

import { NotificationCardClient } from './NotificationCardClient';
import { Notification } from '@/types/notification';

interface NotificationsListProps {
  notifications: Notification[];
  onNotificationClick?: (id: string) => void;
  onNotificationEdit?: (id: string) => void;
}

export function NotificationsList({ notifications, onNotificationClick, onNotificationEdit }: NotificationsListProps) {
  useEffect(() => {
    startNotificationWebSocket();
    return () => {
      stopNotificationWebSocket();
    };
  }, []);
  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhuma notificação encontrada.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationCardClient
          key={notification.id}
          notification={notification}
          onClick={() => onNotificationClick?.(notification.id)}
          onEdit={() => onNotificationEdit?.(notification.id)}
          data-testid={`notificacao-${notification.id}`}
        />
      ))}
    </div>
  );
}