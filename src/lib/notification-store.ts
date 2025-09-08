"use client";
let pollingInterval: NodeJS.Timeout | null = null;

export function startNotificationPolling(term: string = '') {
  if (pollingInterval) return;
  pollingInterval = setInterval(async () => {
    try {
      await useNotificationStore.getState().buscarNotificacoesBackend(term);
    } catch (err) {
      console.error('Erro ao buscar notificações:', err);
    }
  }, 10000);
}

export function stopNotificationPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

import { create } from 'zustand';
import { Notification } from '@/types/notification';
import { buscarNotificacoes } from '@/services/notification-api';
import { useEffect } from 'react';

interface NotificationStore {
  notifications: Notification[];
  currentNotification: Notification | null;
  searchTerm: string;
  filterStatus: 'todos' | 'ativos' | 'inativos';
  validIntegrationIds: string[];
  setValidIntegrationIds: (ids: string[]) => void;
  accountId: string;
  setAccountId: (id: string) => void;
  fetchAndSetAccountId: () => Promise<void>;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNotification: (id: string, notification: Partial<Notification>) => void;
  toggleNotificationStatus: (id: string) => void;
  setCurrentNotification: (notification: Notification | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: 'todos' | 'ativos' | 'inativos') => void;
  getFilteredNotifications: () => Notification[];
  getNotificationById: (id: string) => Notification | undefined;
  buscarNotificacoesBackend: (term: string, accountId?: string) => Promise<void>;
}

const useNotificationStore = create<NotificationStore>((set, get) => ({
  validIntegrationIds: [],
  setValidIntegrationIds: (ids) => {
    console.log('Integrações válidas:', ids);
    set({ validIntegrationIds: ids });
  },
  accountId: '',
  setAccountId: (id) => set({ accountId: id }),
  fetchAndSetAccountId: async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${baseUrl}/api/zappy/accounts`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].id) {
        set({ accountId: data[0].id });
      }
    } catch (err) {
      console.error('Erro ao buscar accounts:', err);
    }
  },

  buscarNotificacoesBackend: async (term: string, accountId?: string) => {
    try {
      const { filterStatus } = get();
      const notificacoes = await buscarNotificacoes(term, filterStatus, accountId);
      console.log('Notificações recebidas:', notificacoes);
      set({ notifications: notificacoes });
    } catch (err) {
      console.error('Erro ao buscar notificações do backend:', err);
    }
  },
  notifications: [],
  currentNotification: null,
  searchTerm: '',
  filterStatus: 'todos',

  setNotifications: (notifications) => set({ notifications }),

  addNotification: (notificationData) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));
    return newNotification.id;
  },

  updateNotification: (id, updates) => {
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, ...updates, updatedAt: new Date() }
          : notification
      ),
    }));
  },

  toggleNotificationStatus: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isActive: !notification.isActive, updatedAt: new Date() }
          : notification
      ),
    }));
  },

  setCurrentNotification: (notification) => set({ currentNotification: notification }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setFilterStatus: (status) => set({ filterStatus: status }),

  getFilteredNotifications: () => {
    const { notifications, searchTerm, filterStatus, validIntegrationIds } = get();
    return notifications.filter((notification) => {
      if (!notification.name) return false;
      const matchesSearch = (
        notification.event && notification.event.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesFilter = 
        filterStatus === 'todos' ||
        (filterStatus === 'ativos' && notification.active) ||
        (filterStatus === 'inativos' && !notification.active);
      const matchesIntegration =
        validIntegrationIds.length === 0
          ? true
          : (!notification.integrationId || validIntegrationIds.includes(notification.integrationId));
      return matchesSearch && matchesFilter && matchesIntegration;
    });
  },

  getNotificationById: (id) => {
    return get().notifications.find((notification) => notification.id === id);
  },
}));

export default useNotificationStore;