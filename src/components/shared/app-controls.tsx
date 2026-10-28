import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/app/providers';
import { useAuth } from '@/features/auth/AuthProvider';
import { pageRoutes } from '@/app/routes';
import {
  Avatar,
  Button,
  DropdownMenu,
  IconButton,
  Input,
  Modal,
  Popover,
  Tooltip,
} from '@/components/ui';
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Tooltip label={`Theme: ${theme}`}>
      <IconButton
        label="Change theme"
        onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
      >
        {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
      </IconButton>
    </Tooltip>
  );
}
export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <DropdownMenu
      trigger={
        <Button aria-label="User menu" className="border-0 px-1">
          <Avatar name={user?.name ?? 'Demo Workspace'} />
          <span className="hidden text-left text-xs md:block">
            {user?.name ?? 'Demo workspace'}
            <span className="block font-normal text-muted">
              {user ? 'Member · demo session' : 'Explore the template'}
            </span>
          </span>
          <ChevronDown size={13} />
        </Button>
      }
      items={
        user
          ? [
              { label: 'Profile', onSelect: () => navigate('/profile') },
              { label: 'Settings', onSelect: () => navigate('/settings') },
              {
                label: 'Sign out',
                onSelect: () => {
                  logout();
                  navigate('/');
                },
              },
            ]
          : [
              { label: 'Demo sign in', onSelect: () => navigate('/auth/login') },
              { label: 'Create account UI', onSelect: () => navigate('/auth/register') },
            ]
      }
    />
  );
}
export function NotificationBell() {
  const [unread, setUnread] = useState(true);
  return (
    <Popover
      trigger={
        <IconButton
          label={unread ? 'Notifications, 2 unread' : 'Notifications'}
          className="relative"
        >
          <Bell size={17} />
          {unread && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />}
        </IconButton>
      }
    >
      <h3>Notifications</h3>
      <p className="muted my-3 text-xs">Mock notifications for this template.</p>
      <ul className="space-y-3 text-sm">
        <li>Welcome to your workspace</li>
        <li>Your weekly summary is ready</li>
      </ul>
      <Button className="mt-4" onClick={() => setUnread(false)} disabled={!unread}>
        {unread ? 'Mark all as read' : 'All caught up'}
      </Button>
    </Popover>
  );
}
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);
  const matches = pageRoutes.filter(
    (r) => r.nav && r.label.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        aria-label="Search pages"
        className="mr-auto text-muted"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search anything…</span>
        <kbd className="ml-8 hidden text-xs lg:inline">⌘ K</kbd>
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Go to a page"
        description="Search the template’s navigation."
      >
        <Input
          aria-label="Search pages"
          placeholder="Type a page name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul className="mt-4 space-y-1">
          {matches.map((route) => (
            <li key={route.path}>
              <button
                className="w-full rounded-lg p-3 text-left hover:bg-accent-soft"
                onClick={() => {
                  navigate(route.path);
                  setOpen(false);
                  setQuery('');
                }}
              >
                {route.label}
              </button>
            </li>
          ))}
        </ul>
        {!matches.length && <p className="muted p-4">No pages found.</p>}
      </Modal>
    </>
  );
}
export function SearchBar(props: Parameters<typeof Input>[0]) {
  return <Input type="search" aria-label="Search" placeholder="Search…" {...props} />;
}
