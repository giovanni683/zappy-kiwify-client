"use client";

import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Notification } from '@/types/notification';
import Link from 'next/link';

interface NotificationCardClientProps {
  notification: Notification;
}

export function NotificationCardClient({ notification }: NotificationCardClientProps) {
  return (
    <Card className="p-4 mb-3 bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-2">{notification.name}</h3>
          <StatusBadge isActive={notification.isActive} />
        </div>
        <Link href={`/detalhes-da-notificacao/${notification.id}`}>
          <Button variant="outline" size="sm" className="ml-4">
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </Link>
      </div>
    </Card>
  );
}