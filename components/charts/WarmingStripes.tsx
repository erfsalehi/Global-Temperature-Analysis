'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { RegionalData } from '@/types/temperature';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface WarmingStripesProps {
  data: RegionalData;
}

export default function WarmingStripes({ data }: WarmingStripesProps) {
  const traces = [
    {
      x: data.years,
      y: Array(data.years.length).fill(1), // Uniform height
      type: 'bar' as const,
      marker: {
        color: data.hemispheres.Global,
        colorscale: 'RdBu',
        cmin: -1,
        cmax: 1,
        reversescale: true, // Red for warm, Blue for cold
        line: { width: 0 }
      },
      hoverinfo: 'x+text' as const,
      text: data.hemispheres.Global.map(t => `${t?.toFixed(2)}°C`),
    }
  ];

  const layout = {
    title: { text: 'Global Warming Stripes (1880-Present)' },
    xaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: true,
      tickfont: { size: 10, color: '#6B7280' },
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      visible: false,
    },
    bargap: 0,
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 40, r: 20, b: 30, l: 20 },
    height: 300,
  };

  const config = {
    responsive: true,
    displayModeBar: false,
  };

  return (
    <div className="w-full glass-panel p-4">
      <Plot
        data={traces}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '300px' }}
      />
      <div className="mt-2 text-center text-sm text-gray-600 font-medium">
        Each stripe represents one year. Blue indicates cooler than average, red indicates warmer than average.
      </div>
    </div>
  );
}
