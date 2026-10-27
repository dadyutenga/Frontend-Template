import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...values: ClassValue[]) => twMerge(clsx(values));
export const formatNumber = (value: number, locale = 'en') =>
  new Intl.NumberFormat(locale).format(value);
export const formatCurrency = (value: number, currency = 'USD', locale = 'en') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
export const formatDate = (value: Date | string, locale = 'en') =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(value));
export function formatBytes(value: number) {
  if (!value) return '0 B';
  const unit = Math.min(Math.floor(Math.log(Math.abs(value)) / Math.log(1024)), 3);
  return `${(value / 1024 ** unit).toFixed(1)} ${['B', 'KB', 'MB', 'GB'][unit]}`;
}
export function exportCsv<T>(
  rows: T[],
  columns: { header: string; value: (row: T) => unknown }[],
  filename = 'records.csv',
) {
  const cell = (value: unknown) => {
    let text = String(value ?? '');
    if (/^[=+@\-\t\r]/.test(text)) text = `'${text}`;
    return `"${text.replaceAll('"', '""')}"`;
  };
  const content = [
    columns.map((c) => cell(c.header)).join(','),
    ...rows.map((row) => columns.map((c) => cell(c.value(row))).join(',')),
  ].join('\r\n');
  const url = URL.createObjectURL(
    new Blob(['\ufeff', content], { type: 'text/csv;charset=utf-8;' }),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
