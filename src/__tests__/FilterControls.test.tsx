import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterControls } from '../components/notifications/FilterControls';

describe('FilterControls', () => {
  it('renderiza filtros', () => {
    render(
      <FilterControls
        searchTerm=""
        filterStatus="todos"
        onSearchChange={() => {}}
        onFilterChange={() => {}}
      />
    );
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Ativos')).toBeInTheDocument();
    expect(screen.getByText('Inativos')).toBeInTheDocument();
  });

  it('exibe filtro selecionado', () => {
    render(
      <FilterControls
        searchTerm=""
        filterStatus="ativos"
        onSearchChange={() => {}}
        onFilterChange={() => {}}
      />
    );
    const ativosBtn = screen.getByText('Ativos');
    expect(ativosBtn).toHaveStyle('font-weight: 700');
  });

  it('chama função ao alterar filtro', () => {
    const onFilterChange = jest.fn();
    render(
      <FilterControls
        searchTerm=""
        filterStatus="todos"
        onSearchChange={() => {}}
        onFilterChange={onFilterChange}
      />
    );
    fireEvent.click(screen.getByText('Inativos'));
    expect(onFilterChange).toHaveBeenCalledWith('inativos');
  });
});
