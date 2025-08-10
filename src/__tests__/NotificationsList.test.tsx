import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationsList } from '../components/notifications/NotificationsList';

jest.mock('../services/zdk', () => ({
  listarConexoes: jest.fn(() => Promise.resolve([])),
  listarFilas: jest.fn(() => Promise.resolve([])),
  atualizarTicket: jest.fn(() => Promise.resolve()),
}));

describe('NotificationsList', () => {
  const notifications = [
    {
      id: '1',
      name: 'Teste 1',
      event: 'Compra aprovada',
      connection: 'conn1',
      sector: 'setor1',
      message: 'Mensagem 1',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Teste 2',
      event: 'Recuperação de boleto',
      connection: 'conn2',
      sector: 'setor2',
      message: 'Mensagem 2',
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('renderiza lista de notificações', () => {
    render(<NotificationsList notifications={notifications} />);
    expect(screen.getByTestId('notificacao-1')).toBeInTheDocument();
    expect(screen.getByTestId('notificacao-2')).toBeInTheDocument();
  });

  it('chama onNotificationClick ao clicar em uma notificação', () => {
    const onNotificationClick = jest.fn();
    render(<NotificationsList notifications={notifications} onNotificationClick={onNotificationClick} />);
    fireEvent.click(screen.getByTestId('notificacao-1'));
    expect(onNotificationClick).toHaveBeenCalledWith('1');
  });

  it('exibe mensagem quando não há notificações', () => {
    render(<NotificationsList notifications={[]} />);
    expect(screen.getByText('Nenhuma notificação encontrada.')).toBeInTheDocument();
  });
});
