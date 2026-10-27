import type { ReactNode } from 'react';
import {
  ResponsiveContainer,
  LineChart as RL,
  Line,
  AreaChart as RA,
  Area,
  BarChart as RB,
  Bar,
  PieChart as RP,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
export interface ChartPoint {
  name: string;
  value: number;
  secondary?: number;
}
const colors = ['var(--accent)', '#22b8a0', '#f7b955', '#e990a5'];
export function ChartCard({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="card min-w-0">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2>{title}</h2>
          {description && <p className="muted text-xs">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
function CartesianChart({
  data,
  type,
  label,
}: {
  data: ChartPoint[];
  type: 'line' | 'bar' | 'area';
  label: string;
}) {
  const Chart = type === 'line' ? RL : type === 'bar' ? RB : RA;
  return (
    <div
      role="img"
      aria-label={`${label}: ${data.map((point) => `${point.name}: ${point.value}`).join(', ')}`}
      className="h-64 w-full min-w-0"
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <Chart data={data} margin={{ left: -20, right: 12, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted)', fontSize: 11 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
            }}
          />
          {type === 'line' ? (
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--accent)"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
          ) : type === 'bar' ? (
            <Bar
              dataKey="value"
              fill="var(--accent)"
              radius={[5, 5, 0, 0]}
              isAnimationActive={false}
            />
          ) : (
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--accent)"
              strokeWidth={3}
              fill="var(--accent-soft)"
              isAnimationActive={false}
            />
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}
export function LineChart({ data, label = 'Line chart' }: { data: ChartPoint[]; label?: string }) {
  return <CartesianChart data={data} type="line" label={label} />;
}
export function BarChart({ data, label = 'Bar chart' }: { data: ChartPoint[]; label?: string }) {
  return <CartesianChart data={data} type="bar" label={label} />;
}
export function AreaChart({ data, label = 'Area chart' }: { data: ChartPoint[]; label?: string }) {
  return <CartesianChart data={data} type="area" label={label} />;
}
export function PieChart({
  data,
  label = 'Distribution chart',
}: {
  data: ChartPoint[];
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${data.map((point) => `${point.name}: ${point.value}`).join(', ')}`}
      className="h-64"
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <RP>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            isAnimationActive={false}
          >
            {data.map((point, i) => (
              <Cell key={point.name} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
          />
          <Legend />
        </RP>
      </ResponsiveContainer>
    </div>
  );
}
export const demoChart: ChartPoint[] = [
  { name: 'Mon', value: 180 },
  { name: 'Tue', value: 260 },
  { name: 'Wed', value: 220 },
  { name: 'Thu', value: 380 },
  { name: 'Fri', value: 310 },
  { name: 'Sat', value: 460 },
  { name: 'Sun', value: 420 },
];
