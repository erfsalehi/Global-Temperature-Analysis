'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { RegionalData } from '@/types/temperature';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface HeatMapProps {
  data: RegionalData;
}

export default function HeatMap({ data }: HeatMapProps) {
  // Define zones from North to South
  const zoneKeys = [
    '64N-90N',
    '44N-64N',
    '24N-44N',
    'EQU-24N',
    '24S-EQU',
    '44S-24S',
    '64S-44S',
    '90S-64S'
  ];

  const zoneLabels = [
    'Arctic (64N-90N)',
    'North Temperate (44N-64N)',
    'North Subtropics (24N-44N)',
    'Tropics North (EQU-24N)',
    'Tropics South (24S-EQU)',
    'South Subtropics (44S-24S)',
    'South Temperate (64S-44S)',
    'Antarctic (90S-64S)'
  ];

  // Prepare Z data (temperature anomalies)
  // Each row corresponds to a zone, each column to a year
  const zData = zoneKeys.map(key => data.zones[key]);

  const traces = [
    {
      x: data.years,
      y: zoneLabels,
      z: zData,
      type: 'heatmap' as const,
      colorscale: 'RdBu',
      reversescale: true, // Red for warm, Blue for cold
      zmin: -2,
      zmax: 2,
      hovertemplate: 'Year: %{x}<br>Zone: %{y}<br>Anomaly: %{z:.2f}°C<extra></extra>',
    },
  ];

  const layout = {
    title: { text: 'Zonal Temperature Anomalies (Heatmap)' },
    xaxis: {
      title: { text: 'Year' },
      tickmode: 'linear' as const,
      dtick: 10,
    },
    yaxis: {
      title: { text: 'Latitude Zone' },
      autorange: 'reversed' as const, // North at top
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Inter, sans-serif' },
    margin: { t: 50, r: 20, b: 80, l: 150 },
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as ('lasso2d' | 'select2d')[],
  };

  return (
    <div className="w-full glass-panel p-4">
      <Plot
        data={traces}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '600px' }}
      />
    </div>
  );
}
