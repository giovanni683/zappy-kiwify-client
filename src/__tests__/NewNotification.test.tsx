import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewNotification } from '../components/notifications/NewNotification';

jest.mock('../services/zdk', () => ({
  listarConexoes: jest.fn(() => Promise.resolve([])),
  listarFilas: jest.fn(() => Promise.resolve([])),
  atualizarTicket: jest.fn(() => Promise.resolve()),
}));
jest.mock('../services/auditoria', () => ({
  registrarAuditoria: jest.fn(() => Promise.resolve()),
}));

import { act } from 'react-dom/test-utils';

describe('NewNotification', () => {
  it('renderiza o título corretamente', async () => {
    await act(async () => {
      render(<NewNotification onBack={() => {}} />);
    });
    expect(screen.getByText('Nova notificação')).toBeInTheDocument();
  });

  it('dispara onBack ao clicar no botão voltar', async () => {
    const onBack = jest.fn();
    await act(async () => {
      render(<NewNotification onBack={onBack} />);
    });
    fireEvent.click(screen.getByText('Voltar'));
    expect(onBack).toHaveBeenCalled();
  });

  it('permite digitar mensagem', async () => {
    await act(async () => {
      render(<NewNotification onBack={() => {}} />);
    });
    const textarea = screen.getByTestId('campo-mensagem');
    fireEvent.change(textarea, { target: { value: 'Teste de mensagem' } });
    expect(textarea).toHaveValue('Teste de mensagem');
  });
});
