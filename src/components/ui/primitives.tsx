import {
  useId,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react';
import {
  Tooltip as RT,
  DropdownMenu as RD,
  Tabs as RTab,
  Accordion as RA,
  Popover as RP,
  Switch as RS,
} from 'radix-ui';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Button({
  variant = 'default',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'primary' | 'danger' }) {
  return (
    <button
      type="button"
      className={cn(
        'btn',
        variant === 'primary' && 'btn-primary',
        variant === 'danger' && 'btn-danger',
        className,
      )}
      {...props}
    />
  );
}
export function IconButton({
  label,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <Button aria-label={label} {...props}>
      {children}
    </Button>
  );
}
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('control', className)} {...props} />;
}
export function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input {...props} type={visible ? 'text' : 'password'} className="pr-14" />
      <button
        type="button"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        onClick={() => setVisible(!visible)}
        className="absolute right-3 top-3"
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}
export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('control', className)} {...props} />;
}
export function MultiSelect({
  options,
  label,
  value,
  onChange,
}: {
  options: string[];
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <label className="field">
      {label}
      <Select
        multiple
        value={value}
        onChange={(e) => onChange(Array.from(e.target.selectedOptions, (o) => o.value))}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </Select>
      <span className="muted text-xs">Use Control or Command to select multiple values.</span>
    </label>
  );
}
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('control', className)} {...props} />;
}
export function Checkbox({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="inline-flex items-center gap-2">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}
export function Radio({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="inline-flex items-center gap-2">
      <input type="radio" {...props} />
      {label}
    </label>
  );
}
export function Switch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id}>{label}</label>
      <RS.Root
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="h-6 w-11 rounded-full bg-line data-[state=checked]:bg-accent"
      >
        <RS.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5" />
      </RS.Root>
    </div>
  );
}
export function DatePicker(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input {...props} type="date" />;
}
export interface DateRange {
  from: string;
  to: string;
}
export function DateRangePicker({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (range: DateRange) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-end gap-3">
      <legend className="sr-only">Date range</legend>
      <label className="field">
        From
        <DatePicker
          value={value.from}
          max={value.to}
          onChange={(e) => onChange({ ...value, from: e.target.value })}
        />
      </label>
      <label className="field">
        To
        <DatePicker
          value={value.to}
          min={value.from}
          onChange={(e) => onChange({ ...value, to: e.target.value })}
        />
      </label>
    </fieldset>
  );
}
export function FileUpload({
  label = 'Choose file',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="field">
      {label}
      <Input type="file" {...props} />
    </label>
  );
}
export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'danger';
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
        tone === 'neutral'
          ? 'bg-accent-soft text-accent'
          : tone === 'success'
            ? 'bg-success/10 text-success'
            : 'bg-danger/10 text-danger',
      )}
    >
      {children}
    </span>
  );
}
export function Avatar({ name, src }: { name: string; src?: string }) {
  return src ? (
    <img src={src} alt={name} className="h-9 w-9 rounded-full object-cover" />
  ) : (
    <span
      role="img"
      aria-label={name}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent"
    >
      {name
        .split(' ')
        .map((s) => s[0])
        .slice(0, 2)
        .join('')}
    </span>
  );
}
export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <RT.Provider>
      <RT.Root>
        <RT.Trigger asChild>{children}</RT.Trigger>
        <RT.Portal>
          <RT.Content className="menu text-xs" sideOffset={6}>
            {label}
            <RT.Arrow />
          </RT.Content>
        </RT.Portal>
      </RT.Root>
    </RT.Provider>
  );
}
export function DropdownMenu({
  trigger,
  items,
}: {
  trigger: ReactNode;
  items: { label: string; onSelect: () => void }[];
}) {
  return (
    <RD.Root>
      <RD.Trigger asChild>{trigger}</RD.Trigger>
      <RD.Portal>
        <RD.Content className="menu" align="end" sideOffset={8}>
          {items.map((item) => (
            <RD.Item key={item.label} className="menu-item" onSelect={item.onSelect}>
              {item.label}
            </RD.Item>
          ))}
        </RD.Content>
      </RD.Portal>
    </RD.Root>
  );
}
export function Tabs({
  items,
  defaultValue,
}: {
  items: { value: string; label: string; content: ReactNode }[];
  defaultValue?: string;
}) {
  return (
    <RTab.Root defaultValue={defaultValue ?? items[0]?.value}>
      <RTab.List
        className="mb-6 flex flex-wrap gap-2 border-b border-line pb-3"
        aria-label="Sections"
      >
        {items.map((item) => (
          <RTab.Trigger
            key={item.value}
            value={item.value}
            className="rounded-lg px-4 py-2 text-muted data-[state=active]:bg-accent-soft data-[state=active]:text-accent"
          >
            {item.label}
          </RTab.Trigger>
        ))}
      </RTab.List>
      {items.map((item) => (
        <RTab.Content key={item.value} value={item.value}>
          {item.content}
        </RTab.Content>
      ))}
    </RTab.Root>
  );
}
export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  return (
    <RA.Root type="single" collapsible>
      {items.map((item, i) => (
        <RA.Item key={item.title} value={String(i)} className="border-b border-line py-3">
          <RA.Header>
            <RA.Trigger className="w-full text-left font-semibold">{item.title}</RA.Trigger>
          </RA.Header>
          <RA.Content className="pt-3 text-muted">{item.content}</RA.Content>
        </RA.Item>
      ))}
    </RA.Root>
  );
}
export function Popover({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return (
    <RP.Root>
      <RP.Trigger asChild>{trigger}</RP.Trigger>
      <RP.Portal>
        <RP.Content className="menu max-w-80 p-4" sideOffset={8}>
          {children}
        </RP.Content>
      </RP.Portal>
    </RP.Root>
  );
}
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('h-6 animate-pulse rounded bg-line', className)} />;
}
export function Spinner() {
  return (
    <span role="status" className="inline-flex gap-2">
      <LoaderCircle className="animate-spin" size={18} />
      <span className="sr-only">Loading</span>
    </span>
  );
}
export function Progress({ value, label = 'Progress' }: { value: number; label?: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs">
        <span>{label}</span>
        <span>{safe}%</span>
      </div>
      <progress aria-label={label} value={safe} max={100} className="h-2 w-full accent-accent" />
    </div>
  );
}
export function EmptyState({
  title = 'No results',
  description = 'Try adjusting your filters.',
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="p-10 text-center">
      <h3>{title}</h3>
      <p className="muted mb-4">{description}</p>
      {action}
    </div>
  );
}
export function Alert({
  children,
  tone = 'info',
}: {
  children: ReactNode;
  tone?: 'info' | 'error';
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-lg p-4',
        tone === 'error' ? 'bg-danger/10 text-danger' : 'bg-accent-soft text-accent',
      )}
    >
      {children}
    </div>
  );
}
export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-3">
      <Button disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </Button>
      <span aria-live="polite">
        Page {page} of {pages}
      </span>
      <Button disabled={page >= pages} onClick={() => onChange(page + 1)}>
        Next
      </Button>
    </nav>
  );
}
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol aria-label="Steps" className="flex flex-wrap gap-4">
      {steps.map((step, i) => (
        <li
          key={step}
          aria-current={i === current ? 'step' : undefined}
          className={cn('flex items-center gap-2', i === current ? 'text-accent' : 'text-muted')}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current">
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );
}
