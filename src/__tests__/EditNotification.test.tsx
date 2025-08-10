import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditNotification } from '../components/notifications/EditNotification';

jest.mock('../services/zdk', () => ({
  listarConexoes: jest.fn(() => Promise.resolve([])),
  listarFilas: jest.fn(() => Promise.resolve([])),
  atualizarTicket: jest.fn(() => Promise.resolve()),
}));
jest.mock('../services/auditoria', () => ({
  registrarAuditoria: jest.fn(() => Promise.resolve()),
}));

import { act } from 'react-dom/test-utils';

describe('EditNotification', () => {
  it('renderiza o título de edição', async () => {
    await act(async () => {
      render(<EditNotification notificationId="1" onBack={() => {}} />);
    });
    expect(screen.getByText('Editar notificação')).toBeInTheDocument();
  });

  it('chama onBack ao clicar no botão voltar', async () => {
    const onBack = jest.fn();
    await act(async () => {
      render(<EditNotification notificationId="1" onBack={onBack} />);
    });
    fireEvent.click(screen.getByTestId('edit-back-button'));
    expect(onBack).toHaveBeenCalled();
  });

  it('ativa e desativa a notificação', async () => {
    await act(async () => {
      render(<EditNotification notificationId="1" onBack={() => {}} />);
    });
    const switchBtn = screen.getByTestId('edit-active-switch');
    fireEvent.click(switchBtn);
    expect(switchBtn).toHaveAttribute('aria-pressed');
  });

  it('edita a mensagem', async () => {
    await act(async () => {
      render(<EditNotification notificationId="1" onBack={() => {}} />);
    });
    const textarea = screen.getByTestId('edit-message-textarea');
    fireEvent.change(textarea, { target: { value: 'Mensagem editada' } });
    expect(textarea).toHaveValue('Mensagem editada');
  });
});
