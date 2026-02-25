'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { TemperatureData } from '@/types/temperature';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface TimelineChartProps {
  data: TemperatureData;
}

export default function TimelineChart({ data }: TimelineChartProps) {
  const traces: any[] = [
    {
      x: data.years,
      y: data.temperatures,
      type: 'scatter',
      mode: 'lines',
      name: 'Temperature Anomaly',
      line: { color: '#EF4444', width: 2 },
      hovertemplate: '<b>%{x}</b><br>Anomaly: %{y:.2f}°C<extra></extra>'
    },
    {
      x: data.years,
      y: data.trend,
      type: 'scatter',
      mode: 'lines',
      name: 'Trend Line',
      line: { color: '#1F4788', width: 3, dash: 'dash' },
      hoverinfo: 'skip'
    }
  ];

  if (data.co2) {
    traces.push({
      x: data.co2.years,
      y: data.co2.co2_mean,
      type: 'scatter',
      mode: 'lines',
      name: 'CO₂ Concentration',
      yaxis: 'y2',
      line: { color: '#10B981', width: 2, dash: 'dot' },
      hovertemplate: '<b>%{x}</b><br>CO₂: %{y:.1f} ppm<extra></extra>'
    });
  }

  const layout = {
    title: { text: 'Global Temperature & CO₂ Correlation' },
    xaxis: {
      title: { text: 'Year' },
      gridcolor: '#E5E7EB',
      domain: [0.05, 0.95]
    },
    yaxis: {
      title: { text: 'Temperature Anomaly (°C)', font: { color: '#EF4444' } },
      gridcolor: '#E5E7EB',
      zeroline: true,
      zerolinecolor: '#9CA3AF',
      tickfont: { color: '#EF4444' }
    },
    yaxis2: {
      title: { text: 'CO₂ Concentration (ppm)', font: { color: '#10B981' } },
      overlaying: 'y',
      side: 'right',
      showgrid: false,
      tickfont: { color: '#10B981' }
    },
    hovermode: 'closest' as const,
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Inter, sans-serif' },
    margin: { t: 50, r: 60, b: 50, l: 60 },
    legend: { orientation: 'h' as const, y: -0.2 },
    autosize: true
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as any
  };

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-lg border border-white/20 bg-white/70 backdrop-blur-md p-4">
      <Plot
        data={traces}
        layout={layout as any}
        config={config}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
}
