"use client";

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { FilterControls } from '@/components/notifications/FilterControls';
import { NotificationsList } from '@/components/notifications/NotificationsList';
import useNotificationStore from '@/lib/notification-store';

export default function HomePage() {
  const {
    searchTerm,
    filterStatus,
    setSearchTerm,
    setFilterStatus,
    getFilteredNotifications,
  } = useNotificationStore();

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
      <Header />
      
      <div className="p-4">
        <div className="mb-6">
          <h2
            style={{
              color: '#000',
              fontFamily: 'Inter, sans-serif',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
            }}
            className="mb-2"
          >
            Notificações
          </h2>
          <p
            style={{
              color: 'rgba(0, 0, 0, 0.70)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
            }}
          >
            Gerencie aqui as notificações disparadas a partir dos eventos da Kiwify.
          </p>
        </div>

        <div className="mb-6">
          <FilterControls
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterStatus}
          />
        </div>

        <div className="flex justify-end mb-6">
          <Link href="/nova-notificacao">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Notificação
            </Button>
          </Link>
        </div>

        <NotificationsList notifications={filteredNotifications} />
      </div>
    </div>
  );
}