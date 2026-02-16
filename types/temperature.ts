export interface TemperatureData {
  years: number[];
  temperatures: (number | null)[];
  trend: number[];
  statistics: {
    warming_rate: number;
    r_squared: number;
    current_anomaly: number;
  };
  warmest_years: Array<{
    Year: number;
    'J-D': number;
  }>;
  decadal_averages: Array<{
    decade: number;
    'J-D': number;
  }>;
}

export interface RegionalData {
  years: number[];
  hemispheres: {
    Global: (number | null)[];
    Northern: (number | null)[];
    Southern: (number | null)[];
  };
  zones: {
    [key: string]: (number | null)[];
  };
}

export interface ChartConfig {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  showLegend: boolean;
  height: number;
}
