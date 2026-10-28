import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RecordForm } from './RecordForm';
describe('RecordForm', () => {
  it('rejects invalid input and submits typed valid values', async () => {
    const user = userEvent.setup();
    const save = vi.fn();
    render(<RecordForm onSave={save} />);
    await user.click(screen.getByRole('button', { name: 'Save record' }));
    expect(await screen.findByText('Enter at least 2 characters')).toBeVisible();
    expect(save).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    await user.type(screen.getByLabelText('Name'), 'Example project');
    await user.type(screen.getByLabelText('Contact email'), 'team@example.com');
    await user.click(screen.getByRole('button', { name: 'Save record' }));
    await waitFor(() =>
      expect(save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Example project',
          email: 'team@example.com',
          status: 'Draft',
        }),
        expect.anything(),
      ),
    );
  });
});
