
"use client";
import { connectNotificationWebSocket, disconnectNotificationWebSocket } from '@/services/notification-ws';
// Inicia WebSocket e atualiza notificações em tempo real
export function startNotificationWebSocket() {
  connectNotificationWebSocket((data) => {
    // Espera receber um array de notificações ou uma notificação única
    if (Array.isArray(data)) {
      useNotificationStore.getState().setNotifications(data);
    } else if (data && data.id) {
      // Atualiza ou adiciona notificação individual
      const store = useNotificationStore.getState();
      const exists = store.notifications.some(n => n.id === data.id);
      if (exists) {
        store.updateNotification(data.id, data);
      } else {
        store.addNotification(data);
      }
    }
  });
}

export function stopNotificationWebSocket() {
  disconnectNotificationWebSocket();
}
// ...existing code...
let pollingInterval: NodeJS.Timeout | null = null;

export function startNotificationPolling(term: string = '') {
  if (pollingInterval) return;
  pollingInterval = setInterval(async () => {
    try {
      await useNotificationStore.getState().buscarNotificacoesBackend(term);
    } catch (err) {
  // ...existing code...
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
import { mockNotifications } from '@/lib/mock-data';
import { buscarNotificacoes } from '@/services/notification-api';

interface NotificationStore {
  notifications: Notification[];
  currentNotification: Notification | null;
  searchTerm: string;
  filterStatus: 'todos' | 'ativos' | 'inativos';
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNotification: (id: string, notification: Partial<Notification>) => void;
  toggleNotificationStatus: (id: string) => void;
  setCurrentNotification: (notification: Notification | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: 'todos' | 'ativos' | 'inativos') => void;
  getFilteredNotifications: () => Notification[];
  getNotificationById: (id: string) => Notification | undefined;
  buscarNotificacoesBackend: (term: string) => Promise<void>;
}

const useNotificationStore = create<NotificationStore>((set, get) => ({
  buscarNotificacoesBackend: async (term) => {
    try {
      const { filterStatus } = get();
      const notificacoes = await buscarNotificacoes(term, filterStatus);
      set({ notifications: notificacoes });
    } catch (err) {
  // ...existing code...
      console.error('Erro ao buscar notificações do backend:', err);
    }
  },
  notifications: mockNotifications,
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
    const { notifications, searchTerm, filterStatus } = get();
    return notifications.filter((notification) => {
      const matchesSearch = notification.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = 
        filterStatus === 'todos' ||
        (filterStatus === 'ativos' && notification.isActive) ||
        (filterStatus === 'inativos' && !notification.isActive);
      
      return matchesSearch && matchesFilter;
    });
  },

  getNotificationById: (id) => {
    return get().notifications.find((notification) => notification.id === id);
  },
}));

export default useNotificationStore;