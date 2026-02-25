import { TemperatureData } from '@/types/temperature';

interface StatsPanelProps {
  data: TemperatureData;
}

export default function StatsPanel({ data }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Current Anomaly"
        value={`${data.statistics.current_anomaly > 0 ? '+' : ''}${data.statistics.current_anomaly}°C`}
        description="Compared to 1951-1980 baseline"
      />
      <StatCard
        title="Warming Rate"
        value={`+${data.statistics.warming_rate}°C`}
        description="Per decade (recent trend)"
      />
      <StatCard
        title="Hottest Year"
        value={data.warmest_years[0].Year.toString()}
        description={`${data.warmest_years[0]['J-D']}°C anomaly`}
      />
    </div>
  );
}

function StatCard({ title, value, description }: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="glass-panel p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/70 group">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
        {title}
      </h3>
      <p className="text-4xl font-bold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 group-hover:from-primary group-hover:to-secondary transition-all duration-300">
        {value}
      </p>
      <p className="mt-2 text-sm text-gray-500 font-medium">{description}</p>
    </div>
  );
}
