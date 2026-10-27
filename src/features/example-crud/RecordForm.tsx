import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Textarea } from '@/components/ui';
import { FormField, FormInput, FormSelect } from '@/components/shared/forms';
import type { ExampleRecord } from '@/types';
const schema = z.object({
  name: z.string().trim().min(2, 'Enter at least 2 characters'),
  email: z.email('Enter a valid email address'),
  status: z.enum(['Active', 'Paused', 'Draft']),
  category: z.string().min(1, 'Choose a team'),
  description: z.string().max(500, 'Use at most 500 characters'),
});
export type RecordValues = z.infer<typeof schema>;
export function RecordForm({
  record,
  onSave,
  pending = false,
}: {
  record?: ExampleRecord;
  onSave: (values: RecordValues) => Promise<void> | void;
  pending?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecordValues>({
    resolver: zodResolver(schema),
    defaultValues: record ?? {
      name: '',
      email: '',
      status: 'Draft',
      category: 'Design',
      description: '',
    },
  });
  return (
    <form noValidate onSubmit={handleSubmit(onSave)} className="space-y-4">
      <FormInput label="Name" {...register('name')} error={errors.name?.message} />
      <FormInput
        label="Contact email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormSelect label="Status" {...register('status')} error={errors.status?.message}>
          <option>Active</option>
          <option>Paused</option>
          <option>Draft</option>
        </FormSelect>
        <FormSelect label="Team" {...register('category')} error={errors.category?.message}>
          {['Design', 'Engineering', 'Operations'].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </FormSelect>
      </div>
      <FormField label="Description" error={errors.description?.message}>
        {(field) => <Textarea {...register('description')} {...field} rows={4} />}
      </FormField>
      <p className="muted text-xs">
        Mock example: changes are stored in memory and reset on reload.
      </p>
      <Button type="submit" variant="primary" disabled={pending || isSubmitting}>
        {pending || isSubmitting ? 'Saving…' : 'Save record'}
      </Button>
    </form>
  );
}
