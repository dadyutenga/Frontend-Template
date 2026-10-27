import { Link } from 'react-router-dom';
import { Accordion, Alert, Button, useToast } from '@/components/ui';
import { CopyButton } from '@/components/shared/patterns';
export default function ExamplePage() {
  const toast = useToast();
  return (
    <div className="page max-w-4xl">
      <div>
        <h1>Example Page</h1>
        <p className="muted">A small, complete starting point for your next feature.</p>
      </div>
      <Alert>
        Add a page file, then one entry in the shared route registry. Navigation takes care of
        itself.
      </Alert>
      <section className="card">
        <h2 className="mb-4">Build something yours</h2>
        <ol className="list-decimal space-y-4 pl-5">
          <li>
            Create a default-exported React component in <code>src/pages</code> or a feature folder.
          </li>
          <li>
            Add its path, label, icon, and lazy import to <code>src/app/routes.ts</code>. Set{' '}
            <code>nav: true</code> to show it in the sidebar.
          </li>
          <li>Use shared UI components and keep feature-specific code together.</li>
        </ol>
        <pre className="my-5 overflow-x-auto rounded-lg bg-background p-4 text-xs">{`{ path: '/hello', label: 'Hello', nav: true,
  load: () => import('@/pages/Hello') }`}</pre>
        <CopyButton value="src/app/routes.ts" />
      </section>
      <section className="card">
        <h2>Quick actions</h2>
        <div className="my-4 flex flex-wrap gap-3">
          <Link to="/components" className="btn btn-primary">
            Explore components
          </Link>
          <Link to="/records" className="btn">
            Try the data table
          </Link>
          <Link to="/admin" className="btn">
            Test role guard
          </Link>
          <Button onClick={() => toast('Your action goes here')}>Show a toast</Button>
        </div>
        <Accordion
          items={[
            {
              title: 'How do I connect an API?',
              content:
                'Set VITE_API_BASE_URL, turn off VITE_USE_MOCK_API, and adapt the typed service contract. No service exists in this template.',
            },
            {
              title: 'Where do I change the theme?',
              content:
                'Edit src/styles/tokens.css to update colors, typography, radius and spacing tokens.',
            },
            {
              title: 'Can I use this authentication in a real app?',
              content:
                'Replace the demo AuthProvider with server-verified sessions. Client-side guards are navigation helpers, not authorization.',
            },
          ]}
        />
      </section>
    </div>
  );
}
