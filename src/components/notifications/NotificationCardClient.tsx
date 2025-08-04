"use client";

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
    <Card
      className="p-4 mb-3 bg-white border border-gray-200 cursor-pointer hover:shadow"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-2">{notification.name}</h3>
          <StatusBadge isActive={notification.isActive} />
        </div>
        <button
          className="ml-4 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
          onClick={e => { e.stopPropagation(); onEdit && onEdit(); }}
        >
          Editar
        </button>
      </div>
    </Card>
  );
}