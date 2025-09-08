"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { FilterControls } from '@/components/notifications/FilterControls';
import { NotificationsList } from '@/components/notifications/NotificationsList';
import { NotificationDetails } from '@/components/notifications/NotificationDetails';
import { NewNotification } from '@/components/notifications/NewNotification';
import { EditNotification } from '@/components/notifications/EditNotification';
import useNotificationStore from '@/lib/notification-store';

type Tela = 'lista' | 'detalhes' | 'nova' | 'editar';

export default function HomePage() {
  const searchParams = useSearchParams();
  const accountIdParam = searchParams?.get('accountId') || '';
  const {
    setValidIntegrationIds,
    accountId,
    fetchAndSetAccountId,
    buscarNotificacoesBackend,
    setSearchTerm,
    setFilterStatus,
    getFilteredNotifications,
    searchTerm,
    filterStatus,
  } = useNotificationStore();
  const filteredNotifications = getFilteredNotifications();

  const [tela, setTela] = useState<Tela>('lista');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Handlers
  const handleVerDetalhes = (id: string) => {
    setSelectedId(id);
    setTela('detalhes');
  };
  const handleNova = () => setTela('nova');
  const handleEditar = (id: string) => {
    setSelectedId(id);
    setTela('editar');
  };
  const handleVoltar = () => {
    setTela('lista');
    setSelectedId(null);
    buscarNotificacoesBackend('', accountId);
  };

  // Effects
  useEffect(() => { fetchAndSetAccountId(); }, [fetchAndSetAccountId]);
  useEffect(() => {
    if (!accountId) return;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${baseUrl}/api/zappy/connections/active?accountId=${accountId}`)
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : (data.connections || data.items || data.data || []);
        setValidIntegrationIds(arr.map((c: any) => String(c.id)));
      });
    buscarNotificacoesBackend('', accountId);
  }, [accountId, setValidIntegrationIds, buscarNotificacoesBackend]);

  // Render
  return (
    <div className="max-w-[420px] mx-auto bg-gray-50 min-h-screen">
      {tela === 'lista' && <Header />}
      <div className="p-4">
        {tela === 'lista' && (
          <>
            <div className="mb-6">
              <h2 className="mb-2" style={{ color: '#000', fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 700, lineHeight: 'normal' }}>
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
                onSearchChange={async (term) => {
                  setSearchTerm(term);
                  await buscarNotificacoesBackend(term, accountId);
                }}
                onFilterChange={setFilterStatus}
              />
            </div>
            <div className="flex justify-end mb-6">
              <Button
                onClick={handleNova}
                className="bg-[#0B4D33] hover:bg-[#166c4e] text-white font-bold px-5 py-2 rounded-full mt-4"
                style={{ width: 140 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>Notificação</span>
                </span>
              </Button>
            </div>
            <div className="mb-6">
              <NotificationsList
                notifications={filteredNotifications}
                onNotificationClick={handleVerDetalhes}
                onNotificationEdit={handleEditar}
              />
            </div>
          </>
        )}
        {tela === 'detalhes' && selectedId && (
          <NotificationDetails
            notificationId={selectedId}
            onBack={handleVoltar}
            onEdit={handleEditar}
          />
        )}
        {tela === 'nova' && <NewNotification onBack={handleVoltar} />}
        {tela === 'editar' && selectedId && (
          <EditNotification notificationId={selectedId} onBack={handleVoltar} />
        )}
      </div>
    </div>
  );
}