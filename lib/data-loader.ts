import { TemperatureData, RegionalData } from '@/types/temperature';

const BASE_PATH = '/nasa-global/temp';

export async function getTemperatureData(dataset: string = 'global-annual'): Promise<TemperatureData> {
  // In a real production app, this might fetch from an API route or external storage.
  // Since we are using static JSON files in public/data, we can fetch them directly via HTTP
  // or read from the filesystem if we are on the server side (for SSG/ISR).
  
  // For client-side or server-side fetch wrapper:
  if (typeof window !== 'undefined') {
    const response = await fetch(`${BASE_PATH}/data/${dataset}.json`);
    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    return response.json();
  } else {
    // Server-side: Read file directly to avoid localhost fetch issues during build
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'public', 'data', `${dataset}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  }
}

export async function getRegionalData(): Promise<RegionalData> {
  if (typeof window !== 'undefined') {
    const response = await fetch(`${BASE_PATH}/data/regional.json`);
    if (!response.ok) {
      throw new Error('Failed to load regional data');
    }
    return response.json();
  } else {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'regional.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  }
}
