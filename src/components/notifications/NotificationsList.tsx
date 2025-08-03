"use client";

import { NotificationCardClient } from './NotificationCardClient';
import { Notification } from '@/types/notification';

interface NotificationsListProps {
  notifications: Notification[];
}

export function NotificationsList({ notifications }: NotificationsListProps) {
  if (notifications.length === 0) {
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
        />
      ))}
    </div>
  );
}