import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationCardClient } from '../components/notifications/NotificationCardClient';

describe('NotificationCardClient', () => {
  const notification = {
    id: '1',
    name: 'Teste Card',
    event: 'purchase_approved',
    connection: 'principal',
    sector: 'vendas',
    message: 'Mensagem do card',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('renderiza dados da notificação', () => {
    render(<NotificationCardClient notification={notification} />);
    expect(screen.getByText('Teste Card')).toBeInTheDocument();
    expect(screen.getByText('Mensagem do card')).toBeInTheDocument();
  });

  it('exibe status ativo', () => {
    render(<NotificationCardClient notification={notification} />);
    expect(screen.getByText(/ativo/i)).toBeInTheDocument();
  });

  it('chama função ao clicar no card', () => {
    const onClick = jest.fn();
    render(<NotificationCardClient notification={notification} onClick={onClick} />);
    fireEvent.click(screen.getByText('Teste Card'));
    expect(onClick).toHaveBeenCalled();
  });
});
