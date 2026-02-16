import { getRegionalData } from '@/lib/data-loader';
import RegionalChart from '@/components/charts/RegionalChart';
import WarmingStripes from '@/components/charts/WarmingStripes';

export default async function RegionalAnalysisPage() {
  const data = await getRegionalData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Regional Analysis</h1>
      <p className="text-gray-600 mb-8">
        Compare temperature anomalies across different hemispheres and latitude zones.
      </p>

      <div className="space-y-8">
        <section className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hemispheric Comparison</h2>
          <RegionalChart data={data} />
        </section>

        <section className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Global Warming Stripes</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Visual representation of global temperature change over time. Each stripe represents a year.
          </p>
          <WarmingStripes data={data} />
        </section>

        <section className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Insights</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              The <strong>Northern Hemisphere</strong> generally shows more rapid warming than the Southern Hemisphere, likely due to its larger landmass.
            </li>
            <li>
              <strong>Arctic Amplification</strong> is visible in the zonal data, where high northern latitudes show significantly higher anomalies than the global average.
            </li>
            <li>
              Recent decades show a clear acceleration in warming trends across all regions.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
