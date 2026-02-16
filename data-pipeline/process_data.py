import pandas as pd
import numpy as np
from scipy import stats
from pathlib import Path
import json
import os

def load_and_clean_data(filepath):
    """Load and clean NASA data"""
    print(f"Loading data from {filepath}")
    # NASA format: Year, Jan, Feb, ..., Dec, J-D, D-N, DJF, MAM, JJA, SON
    df = pd.read_csv(filepath, skiprows=1)
    
    # Handle missing values (NASA uses *** for missing)
    df = df.replace('***', np.nan)
    
    # Convert to numeric
    numeric_cols = df.columns[1:]
    df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')
    
    return df

def calculate_trends(df, column='J-D'):
    """Calculate linear trend and statistics"""
    years = df['Year'].values
    temps = df[column].values
    
    # Remove NaN values
    mask = ~np.isnan(temps)
    years_clean = years[mask]
    temps_clean = temps[mask]
    
    if len(years_clean) == 0:
        return {
            'slope': 0,
            'intercept': 0,
            'r_squared': 0,
            'p_value': 0,
            'warming_rate_per_decade': 0,
            'trend_line': []
        }

    # Linear regression
    slope, intercept, r_value, p_value, std_err = stats.linregress(
        years_clean, temps_clean
    )
    
    # Calculate trend line
    trend_line = slope * years + intercept
    
    return {
        'slope': slope,
        'intercept': intercept,
        'r_squared': r_value ** 2,
        'p_value': p_value,
        'warming_rate_per_decade': slope * 10,
        'trend_line': trend_line.tolist()
    }

def process_zonal_data(filepath):
    """Process zonal data for regional analysis"""
    print(f"Loading zonal data from {filepath}")
    df = pd.read_csv(filepath)
    
    # Replace *** and nulls
    df = df.replace('***', np.nan)
    numeric_cols = df.columns[1:]
    df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')
    
    # Structure for JSON
    regional_data = {
        'years': df['Year'].tolist(),
        'hemispheres': {
            'Global': [x if not np.isnan(x) else None for x in df['Glob']],
            'Northern': [x if not np.isnan(x) else None for x in df['NHem']],
            'Southern': [x if not np.isnan(x) else None for x in df['SHem']]
        },
        'zones': {
            col: [x if not np.isnan(x) else None for x in df[col]]
            for col in df.columns if col not in ['Year', 'Glob', 'NHem', 'SHem']
        }
    }
    
    return regional_data

def generate_output_data():
    """Generate processed JSON files for frontend"""
    script_dir = Path(__file__).parent
    raw_data_dir = script_dir / 'data' / 'raw'
    
    # Output directory should be in public/data
    # Assuming script is in data-pipeline/, so public/data is ../public/data
    output_dir = script_dir.parent / 'public' / 'data'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Processing data from {raw_data_dir} to {output_dir}")

    try:
        # Load data
        global_df = load_and_clean_data(raw_data_dir / 'global.csv')
        
        # Calculate overall trend
        trend_stats = calculate_trends(global_df)
        
        # Prepare annual data
        # Replace NaN with None for JSON serialization
        temperatures = [x if not np.isnan(x) else None for x in global_df['J-D']]
        
        # Get last valid temperature for current anomaly
        last_valid_temp = global_df['J-D'].dropna().iloc[-1]
        
        annual_data = {
            'years': global_df['Year'].tolist(),
            'temperatures': temperatures,
            'trend': trend_stats['trend_line'],
            'statistics': {
                'warming_rate': round(trend_stats['warming_rate_per_decade'], 3),
                'r_squared': round(trend_stats['r_squared'], 4),
                'current_anomaly': round(last_valid_temp, 2)
            }
        }
        
        # Find warmest years
        warmest = global_df.nlargest(10, 'J-D')[['Year', 'J-D']].to_dict('records')
        annual_data['warmest_years'] = warmest
        
        # Calculate decadal averages
        global_df['decade'] = (global_df['Year'] // 10) * 10
        decadal = global_df.groupby('decade')['J-D'].mean().reset_index()
        annual_data['decadal_averages'] = decadal.to_dict('records')
        
        # Save to public directory
        with open(output_dir / 'global-annual.json', 'w') as f:
            json.dump(annual_data, f, indent=2)
            
        print("Processed global data saved successfully!")
        
        # Process Zonal Data
        regional_data = process_zonal_data(raw_data_dir / 'zonal.csv')
        
        # Save regional data
        with open(output_dir / 'regional.json', 'w') as f:
            json.dump(regional_data, f, indent=2)
            
        print("Processed regional data saved successfully!")
        
    except Exception as e:
        print(f"Error processing data: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    generate_output_data()