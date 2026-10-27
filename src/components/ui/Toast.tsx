import { createContext, useContext, useState, type ReactNode } from 'react';
import { Toast as RT } from 'radix-ui';
const ToastContext = createContext<(message: string) => void>(() => {});
export const useToast = () => useContext(ToastContext);
export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<{ id: number; message: string }[]>([]);
  return (
    <ToastContext.Provider
      value={(message) =>
        setMessages((list) => [...list, { id: Date.now() + Math.random(), message }])
      }
    >
      <RT.Provider duration={4000}>
        {children}
        {messages.map((item) => (
          <RT.Root
            key={item.id}
            defaultOpen
            onOpenChange={(open) => {
              if (!open) setMessages((list) => list.filter((m) => m.id !== item.id));
            }}
            className="card shadow-xl"
          >
            <RT.Title>{item.message}</RT.Title>
            <RT.Close className="mt-2 text-accent">Dismiss</RT.Close>
          </RT.Root>
        ))}
        <RT.Viewport className="fixed bottom-5 right-5 z-70 flex w-[min(90vw,360px)] flex-col gap-3" />
      </RT.Provider>
    </ToastContext.Provider>
  );
}
