import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationDetails } from '../components/notifications/NotificationDetails';

jest.mock('../services/zdk', () => ({
  listarConexoes: jest.fn(() => Promise.resolve([])),
  listarFilas: jest.fn(() => Promise.resolve([])),
  atualizarTicket: jest.fn(() => Promise.resolve()),
}));

describe('NotificationDetails', () => {

  const notificationId = '1';

  it('renderiza detalhes da notificação', () => {
  render(<NotificationDetails notificationId={notificationId} onBack={() => {}} onEdit={() => {}} />);
  expect(screen.getByText('Detalhes da notificação')).toBeInTheDocument();
  expect(screen.getByText('Compra aprovada')).toBeInTheDocument();
  // Verifica partes do texto da mensagem
  expect(screen.getByText(/Olá/)).toBeInTheDocument();
  expect(screen.getByText(/\{\{cliente_primeiro_nome\}\}/)).toBeInTheDocument();
  expect(screen.getByText(/sua compra foi aprovada! Agradecemos a preferência\./)).toBeInTheDocument();
  });

  it('chama onBack ao clicar no botão voltar', () => {
    const onBack = jest.fn();
    render(<NotificationDetails notificationId={notificationId} onBack={onBack} onEdit={() => {}} />);
    fireEvent.click(screen.getByTestId('botao-voltar'));
    expect(onBack).toHaveBeenCalled();
  });

  it('chama onEdit ao clicar no botão editar', () => {
    const onEdit = jest.fn();
    render(<NotificationDetails notificationId={notificationId} onBack={() => {}} onEdit={onEdit} />);
    fireEvent.click(screen.getByTestId('details-edit-button'));
    expect(onEdit).toHaveBeenCalled();
  });
});
