'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { RegionalData } from '@/types/temperature';

// Dynamically import React Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
);

interface WorldMapProps {
  data: RegionalData;
}

// Define zones and their latitude ranges based on GISTEMP zonal data
const ZONES = [
  { name: '64N-90N', min: 64, max: 90, label: 'Arctic' },
  { name: '44N-64N', min: 44, max: 64, label: 'North Temperate' },
  { name: '24N-44N', min: 24, max: 44, label: 'North Subtropics' },
  { name: 'EQU-24N', min: 0, max: 24, label: 'Tropics North' },
  { name: '24S-EQU', min: -24, max: 0, label: 'Tropics South' },
  { name: '44S-24S', min: -44, max: -24, label: 'South Subtropics' },
  { name: '64S-44S', min: -64, max: -44, label: 'South Temperate' },
  { name: '90S-64S', min: -90, max: -64, label: 'Antarctic' },
];

export default function WorldMap({ data }: WorldMapProps) {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Load GeoJSON
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error('Failed to load GeoJSON:', err));
  }, []);

  // Get data for the selected year
  const yearIndex = data.years.indexOf(selectedYear);
  const zoneDataForYear = useMemo(() => {
    if (yearIndex === -1) return {};
    const result: Record<string, number | null> = {};
    ZONES.forEach((zone) => {
      // Access zone data safely
      const zoneValues = data.zones[zone.name];
      if (zoneValues && zoneValues.length > yearIndex) {
        result[zone.name] = zoneValues[yearIndex];
      } else {
        result[zone.name] = null;
      }
    });
    return result;
  }, [data, yearIndex]);

  // Helper to get color based on temperature anomaly
  const getColor = (anomaly: number | null) => {
    if (anomaly === null) return '#E5E7EB'; // Gray for no data
    
    // Color scale: Blue (cold) -> White (neutral) -> Red (hot)
    // Range: -2.0°C to +2.0°C
    
    if (anomaly > 0) {
      // Warm anomalies (White to Red)
      // Cap at +2.0°C for max intensity
      const intensity = Math.min(1, anomaly / 2.0);
      return `rgba(239, 68, 68, ${0.2 + intensity * 0.8})`; // Red-500 base
    } else {
      // Cold anomalies (White to Blue)
      // Cap at -2.0°C for max intensity
      const intensity = Math.min(1, Math.abs(anomaly) / 2.0);
      return `rgba(59, 130, 246, ${0.2 + intensity * 0.8})`; // Blue-500 base
    }
  };

  // Helper to find zone for a latitude
  const getZoneForLat = (lat: number) => {
    // Default to 'Tropics North' if something goes wrong, or find matching zone
    return ZONES.find((z) => lat >= z.min && lat < z.max) || ZONES.find(z => z.name === 'EQU-24N')!;
  };

  // Style function for GeoJSON
  const style = (feature: any) => {
    // Estimate centroid latitude from geometry
    let lat = 0;
    if (feature.geometry.type === 'Polygon') {
      const coords = feature.geometry.coordinates[0];
      // Simple average of latitude points
      lat = coords.reduce((sum: number, c: number[]) => sum + c[1], 0) / coords.length;
    } else if (feature.geometry.type === 'MultiPolygon') {
      // Use the first polygon (usually the largest/main landmass)
      const coords = feature.geometry.coordinates[0][0];
      lat = coords.reduce((sum: number, c: number[]) => sum + c[1], 0) / coords.length;
    }

    const zone = getZoneForLat(lat);
    const anomaly = zoneDataForYear[zone.name];

    return {
      fillColor: getColor(anomaly),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    let lat = 0;
    if (feature.geometry.type === 'Polygon') {
      const coords = feature.geometry.coordinates[0];
      lat = coords.reduce((sum: number, c: number[]) => sum + c[1], 0) / coords.length;
    } else if (feature.geometry.type === 'MultiPolygon') {
      const coords = feature.geometry.coordinates[0][0];
      lat = coords.reduce((sum: number, c: number[]) => sum + c[1], 0) / coords.length;
    }
    const zone = getZoneForLat(lat);
    const anomaly = zoneDataForYear[zone.name];

    layer.bindPopup(`
      <div class="font-sans min-w-[200px]">
        <h3 class="font-bold text-lg border-b border-gray-200 pb-1 mb-2">${feature.properties.name}</h3>
        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Latitude Zone:</span>
                <span class="text-sm font-medium">${zone.label}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Anomaly (${selectedYear}):</span>
                <span class="text-lg font-bold" style="color: ${anomaly && anomaly > 0 ? '#EF4444' : '#3B82F6'}">
                    ${anomaly ? (anomaly > 0 ? '+' : '') + anomaly.toFixed(2) : 'N/A'}°C
                </span>
            </div>
        </div>
        <p class="text-xs text-gray-400 mt-3 italic">
          * Approximated from zonal mean data (${zone.name})
        </p>
      </div>
    `);

    layer.on({
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.9,
        });
      },
      mouseout: (e: any) => {
        const layer = e.target;
        // Reset style
        // Note: Ideally we'd reset to the exact computed style, but this is a simplification
        // A full implementation would re-compute the style or save the original style
        if (geoJsonData) {
            // Re-apply the style function logic briefly or just reset to basic defaults
            // For better performance in this simple example, we just reset to "default-ish" look
            // but keeping the color is tricky without re-running style().
            // Let's try to just reset weight/color/opacity
            layer.setStyle({
                weight: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            });
        }
      },
      click: () => {
        setSelectedZone(zone.name);
      }
    });
  };

  if (!geoJsonData) {
    return (
      <div className="w-full h-[500px] glass-panel flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-500 font-medium">Loading Map Data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Global Temperature Anomalies by Zone
          </h2>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Year:</span>
            <input
              type="range"
              min={data.years[0]}
              max={data.years[data.years.length - 1]}
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-32 md:w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-lg font-bold text-primary w-12 text-center">{selectedYear}</span>
          </div>
        </div>

        <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/20 relative z-0 shadow-inner bg-blue-50/50">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
            minZoom={2}
            maxBounds={[[-90, -180], [90, 180]]}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <GeoJSON
              data={geoJsonData}
              style={style}
              onEachFeature={onEachFeature}
            />
          </MapContainer>
        </div>

        <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center space-x-1 mb-2 text-sm font-medium text-gray-600">
                <span>-2°C</span>
                <span className="flex-grow text-center mx-2">Anomaly Scale</span>
                <span>+2°C</span>
            </div>
            <div className="w-full max-w-md h-3 rounded-full bg-gradient-to-r from-blue-500 via-white to-red-500 shadow-sm border border-gray-100"></div>
        </div>
        
        <p className="mt-4 text-xs text-gray-500 text-center italic">
          * Note: Countries are colored based on the average temperature anomaly of their latitude zone. 
          This is an approximation using NASA GISTEMP Zonal Means and does not reflect local microclimates.
        </p>
      </div>
    </div>
  );
}