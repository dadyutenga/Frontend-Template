import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ExampleRecord } from '@/types';
export const initialRecords: ExampleRecord[] = Array.from({ length: 18 }, (_, i) => ({
  id: `record-${i + 1}`,
  name:
    [
      'Website refresh',
      'Research library',
      'Mobile experience',
      'Design system',
      'Team handbook',
      'Community hub',
    ][i % 6] + (i > 5 ? ` ${Math.floor(i / 6) + 1}` : ''),
  email: `team${i + 1}@example.com`,
  status: (['Active', 'Paused', 'Draft'] as const)[i % 3],
  category: ['Design', 'Engineering', 'Operations'][i % 3],
  updatedAt: `2026-10-${String(10 + i).padStart(2, '0')}`,
  description: 'Clearly labeled mock record for exploring reusable interface patterns.',
}));
let records = [...initialRecords];
const isMock = import.meta.env.VITE_USE_MOCK_API !== 'false';
const recordService = {
  list: async (signal?: AbortSignal): Promise<ExampleRecord[]> =>
    isMock ? structuredClone(records) : api.request('records', { signal }),
  save: async (record: ExampleRecord): Promise<ExampleRecord> => {
    if (!isMock)
      return api.request(`records/${record.id}`, { method: 'PUT', body: JSON.stringify(record) });
    records = records.some((r) => r.id === record.id)
      ? records.map((r) => (r.id === record.id ? record : r))
      : [record, ...records];
    return structuredClone(record);
  },
  remove: async (ids: string[]) => {
    if (!isMock) {
      await api.request('records/bulk-delete', { method: 'POST', body: JSON.stringify({ ids }) });
      return;
    }
    records = records.filter((r) => !ids.includes(r.id));
  },
};
export function useRecords() {
  return useQuery({ queryKey: ['records'], queryFn: ({ signal }) => recordService.list(signal) });
}
export function useSaveRecord() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: recordService.save,
    onSuccess: () => client.invalidateQueries({ queryKey: ['records'] }),
  });
}
export function useDeleteRecords() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: recordService.remove,
    onSuccess: () => client.invalidateQueries({ queryKey: ['records'] }),
  });
}
