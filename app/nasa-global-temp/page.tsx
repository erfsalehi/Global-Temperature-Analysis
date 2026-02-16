import StatsPanel from '@/components/ui/StatsPanel';
import TimelineChart from '@/components/charts/TimelineChart';
import { getTemperatureData } from '@/lib/data-loader';

export default async function Home() {
  const data = await getTemperatureData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Global Temperature Trends</h1>
        <p className="mt-2 text-lg text-gray-600">
          Analyzing Earth&apos;s surface temperature anomalies from 1880 to present.
        </p>
      </div>

      <StatsPanel data={data} />
      
      <div className="glass-panel p-6 mb-8">
        <TimelineChart data={data} />
      </div>

      <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About This Data</h2>
          <p className="text-gray-700">
              This visualization uses the GISTEMP v4 dataset provided by NASA Goddard Institute for Space Studies (GISS).
              The data represents surface temperature anomalies relative to the 1951-1980 baseline period.
              Positive values indicate temperatures warmer than the baseline, while negative values indicate cooler temperatures.
          </p>
      </div>
    </div>
  );
}
