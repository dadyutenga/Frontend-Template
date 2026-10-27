import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { Button, DateRangePicker, Alert, Badge, type DateRange } from '@/components/ui';
import { ChartCard, AreaChart, BarChart, LineChart, PieChart } from '@/components/shared/Charts';
import { exportCsv } from '@/lib/utils';
const points = Array.from({ length: 28 }, (_, i) => ({
  date: `2026-10-${String(i + 1).padStart(2, '0')}`,
  name: String(i + 1),
  value: Math.round(120 + Math.sin(i * 0.7) * 70 + i * 12),
}));
export default function Reports() {
  const [range, setRange] = useState<DateRange>({ from: '2026-10-01', to: '2026-10-28' });
  const data = useMemo(
    () =>
      points.filter(
        (p) => (!range.from || p.date >= range.from) && (!range.to || p.date <= range.to),
      ),
    [range],
  );
  const valid = !range.from || !range.to || range.from <= range.to;
  return (
    <div className="page">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1>Reports & analytics</h1>
          <p className="muted">Filter and export clearly labeled mock activity.</p>
        </div>
        <Button
          disabled={!valid || !data.length}
          onClick={() =>
            exportCsv(
              data,
              [
                { header: 'Date', value: (r) => r.date },
                { header: 'Activity', value: (r) => r.value },
              ],
              'activity-report.csv',
            )
          }
        >
          <Download size={16} />
          Export report
        </Button>
      </div>
      <div className="card flex flex-wrap items-end justify-between gap-5">
        <DateRangePicker value={range} onChange={setRange} />
        <Badge>{data.length} mock days in range</Badge>
      </div>
      {!valid ? (
        <Alert tone="error">The end date must be after the start date.</Alert>
      ) : !data.length ? (
        <Alert>No mock data in this range. Try October 2026.</Alert>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <ChartCard title="Activity trend" description="Daily mock events">
            <AreaChart data={data} />
          </ChartCard>
          <ChartCard title="Daily volume" description="Mock events per day">
            <BarChart data={data} />
          </ChartCard>
          <ChartCard title="Engagement" description="Mock progression">
            <LineChart data={data} />
          </ChartCard>
          <ChartCard title="Team mix" description="Mock distribution for the selected days">
            <PieChart
              data={[
                { name: 'Design', value: data.length * 4 },
                { name: 'Engineering', value: data.length * 3 },
                { name: 'Operations', value: data.length * 2 },
              ]}
            />
          </ChartCard>
        </div>
      )}
    </div>
  );
}
