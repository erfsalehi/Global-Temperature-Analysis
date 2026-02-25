'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { RegionalData } from '@/types/temperature';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface RegionalChartProps {
  data: RegionalData;
}

export default function RegionalChart({ data }: RegionalChartProps) {
  const traces = [
    {
      x: data.years,
      y: data.hemispheres.Northern,
      type: 'scatter' as const,
      mode: 'lines' as const,
      name: 'Northern Hemisphere',
      line: { color: '#EF4444', width: 2 },
    },
    {
      x: data.years,
      y: data.hemispheres.Southern,
      type: 'scatter' as const,
      mode: 'lines' as const,
      name: 'Southern Hemisphere',
      line: { color: '#3B82F6', width: 2 },
    },
    {
      x: data.years,
      y: data.hemispheres.Global,
      type: 'scatter' as const,
      mode: 'lines' as const,
      name: 'Global Mean',
      line: { color: '#10B981', width: 2, dash: 'dot' as const },
    }
  ];

  const layout = {
    title: { text: 'Regional Temperature Anomalies' },
    xaxis: {
      title: { text: 'Year' },
      gridcolor: '#E5E7EB',
    },
    yaxis: {
      title: { text: 'Temperature Anomaly (°C)' },
      gridcolor: '#E5E7EB',
      zeroline: true,
      zerolinecolor: '#9CA3AF',
    },
    hovermode: 'closest' as const,
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Inter, sans-serif' },
    margin: { t: 50, r: 20, b: 50, l: 60 },
    legend: { orientation: 'h' as const, y: -0.2 },
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
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
}
