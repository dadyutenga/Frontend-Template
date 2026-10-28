import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  ConfirmDialog,
  DatePicker,
  Drawer,
  EmptyState,
  FileUpload,
  IconButton,
  Input,
  Modal,
  MultiSelect,
  PasswordInput,
  Popover,
  Progress,
  Radio,
  Select,
  Skeleton,
  Spinner,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  Tooltip,
  useToast,
} from '@/components/ui';
import { CopyButton, PrintableDocument, SummaryPanel } from '@/components/shared/patterns';
import { RecordForm } from '@/features/example-crud/RecordForm';
export default function ComponentGallery() {
  const [dialog, setDialog] = useState<'modal' | 'drawer' | 'confirm' | null>(null);
  const [checked, setChecked] = useState(true);
  const [multi, setMulti] = useState<string[]>(['Design']);
  const [step, setStep] = useState(0);
  const [radio, setRadio] = useState('personal');
  const toast = useToast();
  return (
    <div className="page">
      <div>
        <h1>Component library</h1>
        <p className="muted">
          Typed, accessible patterns. Ready to compose into your next project.
        </p>
      </div>
      <div className="grid items-start gap-5 xl:grid-cols-2">
        <section className="card space-y-5">
          <h2>Buttons & feedback</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => toast('Primary action completed')}>
              Primary action
            </Button>
            <Button onClick={() => toast('Secondary action completed')}>Secondary</Button>
            <Button disabled>Disabled</Button>
            <Tooltip label="Add something">
              <IconButton label="Add example" onClick={() => toast('Example added')}>
                <Plus size={16} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="flex gap-3">
            <Badge>Neutral</Badge>
            <Badge tone="success">Active</Badge>
            <Badge tone="danger">Needs attention</Badge>
            <Avatar name="Alex Morgan" />
          </div>
          <Alert>Helpful context belongs close to the action.</Alert>
          <Alert tone="error">This is a preview of an error message.</Alert>
          <Progress value={68} />
          <div className="flex items-center gap-4">
            <Spinner />
            <Skeleton className="w-40" />
          </div>
          <CopyButton value="Hello from Your App" />
        </section>
        <section className="card space-y-5">
          <h2>Form primitives</h2>
          <label className="field">
            Example name
            <Input placeholder="Enter a name" />
          </label>
          <label className="field">
            Example password
            <PasswordInput autoComplete="new-password" />
          </label>
          <label className="field">
            Team
            <Select>
              <option>Design</option>
              <option>Engineering</option>
            </Select>
          </label>
          <MultiSelect
            label="Teams"
            options={['Design', 'Engineering', 'Operations']}
            value={multi}
            onChange={setMulti}
          />
          <label className="field">
            Notes
            <Textarea placeholder="Add a note…" />
          </label>
          <Checkbox
            label="I understand this is a demo"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Switch label="Enable example preference" checked={checked} onChange={setChecked} />
          <fieldset className="flex gap-4">
            <legend className="mb-2">Workspace type</legend>
            {['personal', 'team'].map((value) => (
              <Radio
                key={value}
                name="workspace-type"
                label={value}
                value={value}
                checked={radio === value}
                onChange={() => setRadio(value)}
              />
            ))}
          </fieldset>
          <label className="field">
            Target date
            <DatePicker />
          </label>
          <FileUpload />
          <p className="muted text-xs">Files remain local; no upload is performed.</p>
        </section>
        <section className="card space-y-5">
          <h2>Overlays & navigation</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setDialog('modal')}>Open modal form</Button>
            <Button onClick={() => setDialog('drawer')}>Open drawer form</Button>
            <Button onClick={() => setDialog('confirm')}>Confirm action</Button>
            <Popover trigger={<Button>Show popover</Button>}>
              <p>Contextual information, with focus and Escape handling.</p>
            </Popover>
          </div>
          <Tabs
            items={[
              {
                value: 'first',
                label: 'First tab',
                content: <p className="muted">The first panel’s content.</p>,
              },
              {
                value: 'second',
                label: 'Second tab',
                content: <p className="muted">The second panel’s content.</p>,
              },
            ]}
          />
          <Accordion
            items={[
              {
                title: 'Why shared components?',
                content: 'Build consistent experiences with one maintained implementation.',
              },
              {
                title: 'What about accessibility?',
                content:
                  'Native semantics and Radix primitives provide keyboard interaction and focus management.',
              },
            ]}
          />
          <Stepper steps={['Details', 'Review', 'Complete']} current={step} />
          <div className="flex gap-3">
            <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
              Back
            </Button>
            <Button disabled={step === 2} onClick={() => setStep(step + 1)}>
              Continue
            </Button>
          </div>
        </section>
        <section className="card">
          <h2>Validated form</h2>
          <p className="muted mb-5 text-xs">
            React Hook Form + Zod. This form previews validation only.
          </p>
          <RecordForm onSave={() => toast('Example form validated; nothing was stored')} />
        </section>
        <SummaryPanel
          title="Summary panel"
          rows={[
            { label: 'Status', value: 'In progress' },
            { label: 'Team', value: 'Design' },
            { label: 'Completion', value: '68%' },
          ]}
        />
        <PrintableDocument
          title="Project brief"
          reference="DEMO-001"
          sections={[
            { label: 'Project', value: 'Website refresh' },
            { label: 'Owner', value: 'Alex Morgan' },
            { label: 'Team', value: 'Design' },
          ]}
        />
        <section className="card xl:col-span-2">
          <EmptyState
            title="Nothing here yet"
            description="An empty state should explain the next useful step."
            action={
              <Button onClick={() => toast('Add your create action here')}>
                Create your first record
              </Button>
            }
          />
        </section>
      </div>
      <Modal open={dialog === 'modal'} onClose={() => setDialog(null)} title="Example modal form">
        <RecordForm
          onSave={() => {
            setDialog(null);
            toast('Form validated');
          }}
        />
      </Modal>
      <Drawer
        open={dialog === 'drawer'}
        onClose={() => setDialog(null)}
        title="Example drawer form"
      >
        <RecordForm
          onSave={() => {
            setDialog(null);
            toast('Form validated');
          }}
        />
      </Drawer>
      <ConfirmDialog
        open={dialog === 'confirm'}
        onClose={() => setDialog(null)}
        onConfirm={() => toast('Example action confirmed')}
        description="This is a preview. No records will be changed."
      />
    </div>
  );
}
