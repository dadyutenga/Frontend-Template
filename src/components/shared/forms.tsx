import { useId, type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { Input, Select } from '@/components/ui';
export function FormField({
  label,
  error,
  description,
  children,
}: {
  label: string;
  error?: string;
  description?: string;
  children: (props: {
    id: string;
    'aria-invalid': boolean;
    'aria-describedby'?: string;
  }) => ReactNode;
}) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children({
        id,
        'aria-invalid': !!error,
        'aria-describedby': error || description ? `${id}-message` : undefined,
      })}
      {(error || description) && (
        <span
          id={`${id}-message`}
          role={error ? 'alert' : undefined}
          className={error ? 'text-xs text-danger' : 'text-xs text-muted'}
        >
          {error ?? description}
        </span>
      )}
    </div>
  );
}
export function FormInput({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <FormField label={label} error={error}>
      {(field) => <Input {...props} {...field} />}
    </FormField>
  );
}
export function FormSelect({
  label,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return (
    <FormField label={label} error={error}>
      {(field) => (
        <Select {...props} {...field}>
          {children}
        </Select>
      )}
    </FormField>
  );
}
