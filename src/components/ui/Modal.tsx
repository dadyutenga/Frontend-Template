import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Button, IconButton } from './primitives';
export function Modal({
  open,
  onClose,
  title,
  description = 'Complete the fields below.',
  children,
  drawer = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  drawer?: boolean;
}) {
  const returnFocus = useRef<HTMLElement | null>(null);
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content
          onOpenAutoFocus={() => {
            returnFocus.current =
              document.activeElement instanceof HTMLElement ? document.activeElement : null;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus.current?.focus();
          }}
          className={
            drawer
              ? 'fixed right-0 top-0 z-51 h-dvh w-[min(92vw,480px)] overflow-auto border-l border-line bg-surface p-7 shadow-2xl'
              : 'dialog'
          }
        >
          <div className="mb-2 flex items-center justify-between gap-4">
            <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <IconButton label="Close dialog">
                <X size={17} />
              </IconButton>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mb-6 text-muted">{description}</Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function Drawer(props: Omit<Parameters<typeof Modal>[0], 'drawer'>) {
  return <Modal {...props} drawer />;
}
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirm action',
  description = 'This action cannot be undone.',
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      <div className="flex justify-end gap-3">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
