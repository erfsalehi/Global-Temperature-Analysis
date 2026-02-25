import requests
import os
from pathlib import Path

# URLs for NASA GISTEMP data
URLS = {
    'global': 'https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv',
    'hemispheric': 'https://data.giss.nasa.gov/gistemp/tabledata_v4/NH.Ts+dSST.csv',
    'zonal': 'https://data.giss.nasa.gov/gistemp/tabledata_v4/ZonAnn.Ts+dSST.csv',
    'co2': 'https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv'
}

def download_data():
    """Download NASA GISTEMP datasets"""
    # Create data/raw directory relative to this script
    script_dir = Path(__file__).parent
    data_dir = script_dir / 'data' / 'raw'
    data_dir.mkdir(parents=True, exist_ok=True)

    for name, url in URLS.items():
        print(f"Downloading {name} data...")
        try:
            response = requests.get(url)
            response.raise_for_status()
            
            filepath = data_dir / f"{name}.csv"
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"Saved to {filepath}")
        except Exception as e:
            print(f"Failed to download {name}: {e}")

if __name__ == '__main__':
    download_data()