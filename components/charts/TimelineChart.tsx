'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { TemperatureData } from '@/types/temperature';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface TimelineChartProps {
  data: TemperatureData;
}

export default function TimelineChart({ data }: TimelineChartProps) {
  const traces = [
    {
      x: data.years,
      y: data.temperatures,
      type: 'scatter' as const,
      mode: 'lines' as const,
      name: 'Annual Mean',
      line: { color: '#EF4444', width: 2 },
      hovertemplate: '<b>%{x}</b><br>Anomaly: %{y:.2f}°C<extra></extra>'
    },
    {
      x: data.years,
      y: data.trend,
      type: 'scatter' as const,
      mode: 'lines' as const,
      name: 'Trend Line',
      line: { color: '#1F4788', width: 3, dash: 'dash' as const },
      hoverinfo: 'skip' as const
    }
  ];

  const layout = {
    title: { text: 'Global Temperature Anomaly (1880-Present)' },
    xaxis: {
      title: { text: 'Year' },
      gridcolor: '#E5E7EB'
    },
    yaxis: {
      title: { text: 'Temperature Anomaly (°C)' },
      gridcolor: '#E5E7EB',
      zeroline: true,
      zerolinecolor: '#9CA3AF'
    },
    hovermode: 'closest' as const,
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Inter, sans-serif' },
    margin: { t: 50, r: 50, b: 50, l: 60 },
    autosize: true
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as ('lasso2d' | 'select2d')[]
  };

  return (
    <div className="w-full h-[500px] glass-panel p-4">
      <Plot
        data={traces}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
}
