'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import React Leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Rectangle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Rectangle),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('react-leaflet').then((mod) => mod.Tooltip),
  { ssr: false }
);

// Define zones with their coordinates and colors
const ZONES = [
  { name: 'Arctic', range: '64N-90N', bounds: [[64, -180], [90, 180]], color: '#3B82F6' },
  { name: 'North Temperate', range: '44N-64N', bounds: [[44, -180], [64, 180]], color: '#60A5FA' },
  { name: 'North Subtropics', range: '24N-44N', bounds: [[24, -180], [44, 180]], color: '#93C5FD' },
  { name: 'Tropics North', range: 'EQU-24N', bounds: [[0, -180], [24, 180]], color: '#FCD34D' },
  { name: 'Tropics South', range: '24S-EQU', bounds: [[-24, -180], [0, 180]], color: '#FCD34D' },
  { name: 'South Subtropics', range: '44S-24S', bounds: [[-44, -180], [-24, 180]], color: '#93C5FD' },
  { name: 'South Temperate', range: '64S-44S', bounds: [[-64, -180], [-44, 180]], color: '#60A5FA' },
  { name: 'Antarctic', range: '90S-64S', bounds: [[-90, -180], [-64, 180]], color: '#3B82F6' },
];

export default function ZoneMap() {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200 relative z-0">
      <MapContainer
        center={[0, 0]}
        zoom={1}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        minZoom={1}
        maxZoom={3}
        dragging={false} // Disable dragging to keep it static if desired, or enable
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {ZONES.map((zone, index) => (
          <Rectangle
            key={index}
            bounds={zone.bounds as any}
            pathOptions={{ color: zone.color, weight: 1, fillOpacity: 0.3 }}
          >
            <Tooltip sticky direction="center" permanent={false}>
              <div className="text-center">
                <div className="font-bold">{zone.name}</div>
                <div className="text-xs text-gray-500">{zone.range}</div>
              </div>
            </Tooltip>
          </Rectangle>
        ))}
      </MapContainer>
    </div>
  );
}
