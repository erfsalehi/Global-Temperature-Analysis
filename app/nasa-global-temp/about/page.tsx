export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="glass-panel p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About NASA Global Temperature Analysis</h1>
        
        <div className="prose max-w-none text-gray-700 space-y-4">
          <p>
            This project provides an interactive visualization of global surface temperature anomalies using data from the 
            NASA Goddard Institute for Space Studies (GISS). The GISS Surface Temperature Analysis (GISTEMP v4) is an 
            estimate of global surface temperature change.
          </p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Methodology</h2>
          <p>
            Graphs and tables are updated around the middle of every month using current data files from NOAA GHCN v4 
            (meteorological stations) and ERSST v5 (ocean areas), combined as described in our publications Hansen et al. (2010) 
            and Lenssen et al. (2019). These updated files incorporate reports for the previous month and also late reports 
            and corrections for earlier months.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Data Source</h2>
          <p>
            The data is sourced directly from <a href="https://data.giss.nasa.gov/gistemp/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">NASA GISS</a>.
            The analysis uses the &quot;Global-mean monthly, seasonal, and annual means&quot; dataset (GLB.Ts+dSST.csv).
          </p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Project Tech Stack</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Next.js 14 (App Router)</li>
            <li>React Server Components</li>
            <li>Tailwind CSS</li>
            <li>Plotly.js for visualizations</li>
            <li>Python for data processing (Pandas, SciPy)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
