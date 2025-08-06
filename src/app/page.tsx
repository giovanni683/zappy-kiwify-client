"use client";

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { FilterControls } from '@/components/notifications/FilterControls';
import { NotificationsList } from '@/components/notifications/NotificationsList';
import { NotificationDetails } from '@/components/notifications/NotificationDetails';
import { NewNotification } from '@/components/notifications/NewNotification';
import { EditNotification } from '@/components/notifications/EditNotification';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useNotificationStore from '@/lib/notification-store';

type Tela = 'lista' | 'detalhes' | 'nova' | 'editar';

export default function HomePage() {
  const {
    searchTerm,
    filterStatus,
    setSearchTerm,
    setFilterStatus,
    getFilteredNotifications,
  } = useNotificationStore();
  const filteredNotifications = getFilteredNotifications();


  const [tela, setTela] = useState<Tela>('lista');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Modal state helpers
  const isModalOpen = tela !== 'lista';

  // Handlers para navegação
  const handleVerDetalhes = (id: string) => {
    setSelectedId(id);
    setTela('detalhes');
  };
  const handleNova = () => {
    setTela('nova');
  };
  const handleEditar = (id: string) => {
    setSelectedId(id);
    setTela('editar');
  };
  const handleVoltar = () => {
    setTela('lista');
    setSelectedId(null);
  };

  return (
    <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <div className="mb-6">
          <h2 style={{ color: '#000', fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 700, lineHeight: 'normal' }} className="mb-2">
            Notificações
          </h2>
          <p style={{ color: 'rgba(0, 0, 0, 0.70)', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 'normal' }}>
            Gerencie aqui as notificações disparadas a partir dos eventos da Kiwify.
          </p>
        </div>
        <div className="mb-2">
          <FilterControls
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterStatus}
          />
        </div>
        <div className="flex justify-end mb-6">
          <Button onClick={handleNova} className="bg-[#0B4D33] hover:bg-[#166c4e] text-white font-bold px-5 py-2 rounded-full">
            + Notificação
          </Button>
        </div>
        <div className="mb-6">
          <NotificationsList
            notifications={filteredNotifications}
            onNotificationClick={handleVerDetalhes}
            onNotificationEdit={handleEditar}
          />
        </div>
        {/* Modal para detalhes, nova e editar */}
        <Dialog open={isModalOpen} onOpenChange={open => { if (!open) handleVoltar(); }}>
          <DialogContent className="max-w-lg">
            {tela === 'detalhes' && selectedId && (
              <NotificationDetails
                notificationId={selectedId}
                onBack={handleVoltar}
                onEdit={handleEditar}
              />
            )}
            {tela === 'nova' && (
              <NewNotification onBack={handleVoltar} />
            )}
            {tela === 'editar' && selectedId && (
              <EditNotification notificationId={selectedId} onBack={handleVoltar} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}