import { getTemperatureData, getRegionalData } from '@/lib/data-loader';
import StatsPanel from '@/components/ui/StatsPanel';
import TimelineChart from '@/components/charts/TimelineChart';
import RegionalChart from '@/components/charts/RegionalChart';
import HeatMap from '@/components/charts/HeatMap';
import WorldMap from '@/components/charts/WorldMap';
import ZoneMap from '@/components/charts/ZoneMap';
import WarmingStripes from '@/components/charts/WarmingStripes';

export default async function Home() {
  const globalData = await getTemperatureData('global-annual');
  const regionalData = await getRegionalData();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 font-bold text-xl tracking-tight text-gray-900">
              NASA Global Temp
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#global-overview" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Global</a>
                <a href="#regional-analysis" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Regional</a>
                <a href="#geographic-view" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Geographic</a>
                <a href="#about" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Global Overview Section */}
      <section id="global-overview" className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Global Temperature Anomalies</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Tracking Earth's changing climate from 1880 to present using NASA GISTEMP v4 data.
          </p>
        </div>

        <StatsPanel data={globalData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
             <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Global Mean Temperature & CO₂</h2>
                <p className="text-gray-500">Correlation between temperature anomalies and atmospheric CO₂ levels.</p>
             </div>
             <TimelineChart data={globalData} />
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-2">Warming Stripes</h3>
               <p className="text-sm text-gray-500 mb-4">Visualizing the shift from cooler (blue) to warmer (red) years.</p>
               <WarmingStripes data={regionalData} />
            </div>
             <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">Key Insight</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                   The last decade has been the warmest on record. The correlation between rising CO₂ levels and global temperature anomalies is clearly visible in the data, with a significant acceleration in warming trends since 1980.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Regional Analysis Section */}
      <section id="regional-analysis" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Regional Analysis</h2>
              <p className="text-lg text-gray-600">Comparing Northern and Southern Hemisphere temperature trends.</p>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-1">
                 <RegionalChart data={regionalData} />
              </div>
              <div className="space-y-6">
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Hemispheric Divergence</h3>
                    <p className="text-gray-700 leading-relaxed">
                       The Northern Hemisphere is warming faster than the Southern Hemisphere. This is largely due to the greater landmass in the north, which warms faster than the ocean-dominated south.
                    </p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Latitude Zones</h3>
                    <p className="text-sm text-gray-500 mb-4">Reference map for zonal analysis.</p>
                    <ZoneMap />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Geographic View Section */}
      <section id="geographic-view" className="py-16 bg-gray-50 border-t border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
               <h2 className="text-3xl font-bold text-gray-900 mb-2">Geographic Distribution</h2>
               <p className="text-lg text-gray-600">Exploring how warming varies across different latitude zones and time.</p>
            </div>

            <div className="grid grid-cols-1 gap-12">
               <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-lg">
                  <div className="mb-6">
                     <h3 className="text-xl font-bold text-gray-900">Interactive World Map</h3>
                     <p className="text-gray-500">Explore temperature anomalies by latitude zone for any year.</p>
                  </div>
                  <WorldMap data={regionalData} />
               </div>

               <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-lg">
                  <div className="mb-6">
                     <h3 className="text-xl font-bold text-gray-900">Zonal Heatmap</h3>
                     <p className="text-gray-500">A comprehensive view of warming intensity across all latitudes over time.</p>
                  </div>
                  <HeatMap data={regionalData} />
               </div>
            </div>
         </div>
      </section>

      {/* About / Footer Section */}
      <section id="about" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">About This Project</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            This visualization dashboard utilizes data from NASA's GISS Surface Temperature Analysis (GISTEMP v4). 
            It is designed to provide clear, interactive insights into global climate change trends.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
             <div className="bg-gray-800 p-6 rounded-xl max-w-sm mx-auto">
                <h3 className="font-bold text-lg mb-2 text-blue-400">Data Source</h3>
                <p className="text-gray-300 text-sm">NASA Goddard Institute for Space Studies (GISS). GISTEMP Team, 2024: GISS Surface Temperature Analysis (GISTEMP), version 4.</p>
             </div>
             <div className="bg-gray-800 p-6 rounded-xl max-w-sm mx-auto">
                <h3 className="font-bold text-lg mb-2 text-blue-400">Methodology</h3>
                <p className="text-gray-300 text-sm">Temperature anomalies are deviations from the corresponding 1951-1980 mean. Global means are estimated from surface air temperature (meteorological stations) and sea surface temperature data.</p>
             </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-left">
              <span className="text-lg font-bold">NASA Global Temp Analysis</span>
              <p className="text-gray-500 text-sm mt-1">Built with Next.js & Recharts</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://data.giss.nasa.gov/gistemp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                NASA GISS Data
              </a>
              <a href="https://github.com/erfsalehi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}