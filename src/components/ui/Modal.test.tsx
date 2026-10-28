import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Modal } from './Modal';
function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open editor</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit details">
        <label>
          Name
          <input />
        </label>
        <button>Save</button>
      </Modal>
    </>
  );
}
describe('Modal', () => {
  it('labels the dialog, traps keyboard focus and closes with Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Open editor' }));
    const dialog = screen.getByRole('dialog', { name: 'Edit details' });
    expect(dialog).toBeVisible();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    for (let i = 0; i < 6; i++) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Open editor' })).toHaveFocus();
  });
});
