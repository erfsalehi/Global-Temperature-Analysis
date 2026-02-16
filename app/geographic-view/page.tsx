import { getRegionalData } from '@/lib/data-loader';
import HeatMap from '@/components/charts/HeatMap';
import WorldMap from '@/components/charts/WorldMap';
import ZoneMap from '@/components/charts/ZoneMap';

export default async function GeographicViewPage() {
  const data = await getRegionalData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Geographic View</h1>
      <p className="text-gray-600 mb-8">
        Visualize temperature anomalies across latitude zones over time.
      </p>

      <section className="mb-8">
        <WorldMap data={data} />
      </section>

      <section>
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Zonal Heatmap (1880-Present)</h2>
          <p className="text-gray-600 mb-6 text-sm">
            This heatmap displays temperature anomalies across different latitude bands. 
            Red areas indicate warmer than average temperatures, while blue areas indicate cooler than average temperatures.
            Notice the widespread warming in recent decades, particularly in the Northern Hemisphere (top rows).
          </p>
          <HeatMap data={data} />
        </div>
      </section>

      <section className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About Latitude Zones</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              The earth is divided into latitude zones to analyze regional climate patterns.
              These zones help scientists understand how warming varies from the equator to the poles.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Arctic (64N-90N):</strong> Shows the most rapid warming ("Arctic Amplification").</li>
              <li><strong>North Temperate (44N-64N):</strong> Mid-latitude region including much of Europe, Asia, and North America.</li>
              <li><strong>Tropics (24S-24N):</strong> Generally show more stable but consistently rising temperatures.</li>
              <li><strong>Antarctic (90S-64S):</strong> Shows more variability and slower warming compared to the Arctic.</li>
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-900 mb-2">Why Zonal Analysis?</h4>
              <p className="text-xs text-blue-800">
                Zonal averages reduce noise and reveal large-scale climate trends that might be obscured in local data.
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <ZoneMap />
            <p className="text-center text-xs text-gray-500 mt-2">
              Reference map showing the latitude bands used in the NASA GISTEMP analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Source</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Data is derived from the NASA GISTEMP Zonal Means dataset (ZonAnn.Ts+dSST.csv).
          It represents surface temperature anomalies relative to the 1951-1980 baseline.
        </p>
      </section>
    </div>
  );
}
