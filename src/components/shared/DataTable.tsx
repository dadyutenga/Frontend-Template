import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDownUp, Download } from 'lucide-react';
import { Button, Checkbox, EmptyState, Input, Pagination, Popover, Select } from '@/components/ui';
import { exportCsv } from '@/lib/utils';
import { usePagination } from '@/hooks';
export interface Column<T> {
  id: string;
  header: string;
  value: (row: T) => string | number;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
}
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string;
  label?: string;
  pageSize?: number;
  rowActions?: (row: T) => ReactNode;
  onBulkDelete?: (ids: string[]) => void;
  filterColumn?: string;
}
export function DataTable<T>({
  data,
  columns,
  getRowId,
  label = 'Records',
  pageSize = 5,
  rowActions,
  onBulkDelete,
  filterColumn,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<{ id: string; direction: number } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const filterDef = columns.find((c) => c.id === filterColumn);
  const options = filterDef ? [...new Set(data.map((row) => String(filterDef.value(row))))] : [];
  const filtered = useMemo(() => {
    const rows = data.filter(
      (row) =>
        columns.some((c) => String(c.value(row)).toLowerCase().includes(search.toLowerCase())) &&
        (!filter || !filterDef || String(filterDef.value(row)) === filter),
    );
    if (sort) {
      const col = columns.find((c) => c.id === sort.id);
      if (col)
        rows.sort((a, b) => {
          const x = col.value(a),
            y = col.value(b);
          return (
            (typeof x === 'number' && typeof y === 'number'
              ? x - y
              : String(x).localeCompare(String(y), undefined, { numeric: true })) * sort.direction
          );
        });
    }
    return rows;
  }, [data, columns, search, filter, filterDef, sort]);
  const pagination = usePagination(filtered.length, pageSize);
  const visible = columns.filter((c) => !hidden.has(c.id));
  const rows = filtered.slice(pagination.start, pagination.end);
  const toggle = (id: string) =>
    setSelected((old) => {
      const next = new Set(old);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const selectedIds = data.map(getRowId).filter((id) => selected.has(id));
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Input
          aria-label={`Search ${label.toLowerCase()}`}
          placeholder="Search records…"
          value={search}
          className="sm:max-w-64"
          onChange={(e) => {
            setSearch(e.target.value);
            pagination.setPage(1);
          }}
        />
        {filterDef && (
          <Select
            aria-label={`Filter by ${filterDef.header}`}
            className="sm:w-40"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              pagination.setPage(1);
            }}
          >
            <option value="">All {filterDef.header.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        )}
        <div className="ml-auto flex flex-wrap gap-2">
          <Popover trigger={<Button>Columns</Button>}>
            <div className="flex flex-col gap-3">
              {columns.map((c) => (
                <Checkbox
                  key={c.id}
                  label={c.header}
                  checked={!hidden.has(c.id)}
                  onChange={() =>
                    setHidden((old) => {
                      const next = new Set(old);
                      if (next.has(c.id)) next.delete(c.id);
                      else if (next.size < columns.length - 1) next.add(c.id);
                      return next;
                    })
                  }
                />
              ))}
            </div>
          </Popover>
          <Button
            onClick={() =>
              exportCsv(
                filtered,
                visible.map((c) => ({ header: c.header, value: c.value })),
              )
            }
          >
            <Download size={15} />
            Export CSV
          </Button>
        </div>
      </div>
      {selectedIds.length > 0 && (
        <div className="mb-3 flex items-center gap-4 rounded-lg bg-accent-soft p-3">
          <span>{selectedIds.length} selected</span>
          <Button onClick={() => setSelected(new Set())}>Clear selection</Button>
          {onBulkDelete && (
            <Button variant="danger" onClick={() => onBulkDelete(selectedIds)}>
              Delete selected
            </Button>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left" aria-label={label}>
          <thead className="border-y border-line bg-background text-xs text-muted">
            <tr>
              <th scope="col" className="p-3">
                <Checkbox
                  label="Select page"
                  checked={rows.length > 0 && rows.every((row) => selected.has(getRowId(row)))}
                  onChange={(e) =>
                    setSelected((old) => {
                      const next = new Set(old);
                      rows.forEach((row) => {
                        if (e.target.checked) next.add(getRowId(row));
                        else next.delete(getRowId(row));
                      });
                      return next;
                    })
                  }
                />
              </th>
              {visible.map((c) => (
                <th
                  key={c.id}
                  scope="col"
                  aria-sort={
                    sort?.id === c.id ? (sort.direction === 1 ? 'ascending' : 'descending') : 'none'
                  }
                  className="p-3"
                >
                  {c.sortable === false ? (
                    c.header
                  ) : (
                    <button
                      className="flex items-center gap-2"
                      onClick={() =>
                        setSort((old) => ({
                          id: c.id,
                          direction: old?.id === c.id ? -old.direction : 1,
                        }))
                      }
                    >
                      {c.header}
                      <ArrowDownUp size={12} />
                    </button>
                  )}
                </th>
              ))}
              {rowActions && (
                <th scope="col" className="p-3">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={getRowId(row)} className="border-b border-line hover:bg-background">
                <td className="p-3">
                  <Checkbox
                    label={`Select ${getRowId(row)}`}
                    checked={selected.has(getRowId(row))}
                    onChange={() => toggle(getRowId(row))}
                  />
                </td>
                {visible.map((c) => (
                  <td key={c.id} className="p-3">
                    {c.render ? c.render(row) : c.value(row)}
                  </td>
                ))}
                {rowActions && <td className="p-3">{rowActions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && <EmptyState />}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <span className="muted text-xs">
          {filtered.length ? pagination.start + 1 : 0}–{Math.min(pagination.end, filtered.length)}{' '}
          of {filtered.length} results
        </span>
        <Pagination page={pagination.page} pages={pagination.pages} onChange={pagination.setPage} />
      </div>
    </div>
  );
}
