import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DataTable, type Column } from './DataTable';
interface Row {
  id: string;
  name: string;
  status: string;
}
const data: Row[] = [
  { id: '1', name: 'Bravo', status: 'Active' },
  { id: '2', name: 'Alpha', status: 'Draft' },
  { id: '3', name: 'Charlie', status: 'Active' },
];
const columns: Column<Row>[] = [
  { id: 'name', header: 'Name', value: (r) => r.name },
  { id: 'status', header: 'Status', value: (r) => r.status },
];
describe('DataTable', () => {
  it('sorts, searches, filters and paginates the displayed records', async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        getRowId={(r) => r.id}
        pageSize={2}
        filterColumn="status"
      />,
    );
    expect(screen.getByText('Page 1 of 2')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Name' }));
    const rows = screen.getAllByRole('row');
    expect(within(rows[1]).getByText('Alpha')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Charlie')).toBeVisible();
    await user.type(screen.getByRole('textbox', { name: 'Search records' }), 'Bravo');
    expect(screen.getByText('Bravo')).toBeVisible();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
    await user.clear(screen.getByRole('textbox', { name: 'Search records' }));
    await user.selectOptions(screen.getByRole('combobox', { name: 'Filter by Status' }), 'Draft');
    expect(screen.getByText('Alpha')).toBeVisible();
    expect(screen.queryByText('Bravo')).not.toBeInTheDocument();
  });
  it('preserves selected row identities across pages for bulk actions', async () => {
    const user = userEvent.setup();
    const remove = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        getRowId={(r) => r.id}
        pageSize={2}
        onBulkDelete={remove}
      />,
    );
    await user.click(screen.getByRole('checkbox', { name: 'Select page' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('checkbox', { name: 'Select 3' }));
    await user.click(screen.getByRole('button', { name: 'Delete selected' }));
    expect(remove).toHaveBeenCalledWith(['1', '2', '3']);
  });
  it('hides columns through the column configuration', async () => {
    const user = userEvent.setup();
    render(<DataTable data={data} columns={columns} getRowId={(r) => r.id} />);
    await user.click(screen.getByRole('button', { name: 'Columns' }));
    await user.click(screen.getByRole('checkbox', { name: 'Status' }));
    expect(screen.queryByRole('columnheader', { name: 'Status' })).not.toBeInTheDocument();
  });
});
