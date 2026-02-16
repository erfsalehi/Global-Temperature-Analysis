# NASA Global Temperature Analysis 🌍🌡️

An interactive web application visualizing Earth's surface temperature anomalies from 1880 to the present, based on the **NASA GISTEMP v4** dataset.

![Project Preview](https://github.com/erfsalehi/Global-Temperature-Analysis/assets/placeholder/preview.png)
*(Note: Replace with actual screenshot if available)*

## 🚀 Features

### 1. Global Overview 🌐
*   **Timeline Chart**: Interactive line graph showing global surface temperature anomalies over time (1880–Present).
*   **Trend Analysis**: Visualizes the long-term warming trend with a 5-year Lowess smoothing curve.
*   **Key Statistics**: Real-time cards displaying:
    *   Current Temperature Anomaly
    *   Warming Rate (per decade)
    *   Hottest Year on Record

### 2. Regional Analysis 🗺️
*   **Hemispheric Comparison**: Compare warming trends between the Northern and Southern Hemispheres.
*   **Warming Stripes**: A "climate stripes" visualization representing annual temperature changes using a color scale (blue to red).

### 3. Geographic View 📍
*   **Interactive World Map**: A color-coded map showing temperature anomalies by latitude zone.
    *   *Note: Approximated using zonal means as country-specific GISTEMP data is not available.*
*   **Zonal Heatmap**: A detailed heatmap visualizing temperature changes across different latitude bands (Arctic, Tropics, Antarctic) over time.
*   **Zone Reference Map**: An educational map explaining the specific latitude bands used in the analysis.

### 4. Modern UI/UX 🎨
*   **Glassmorphism Design**: Inspired by modern iOS aesthetics with mesh gradients, blurred backgrounds (`backdrop-filter`), and soft shadows.
*   **Responsive Layout**: Fully optimized for desktop and mobile devices.
*   **Interactive Charts**: Powered by Plotly.js for zooming, panning, and hovering.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Visualization**:
    *   [Plotly.js](https://plotly.com/javascript/) (via `react-plotly.js`)
    *   [Leaflet](https://leafletjs.com/) (via `react-leaflet`) for maps

### Backend / Data Processing
*   **Data Source**: [NASA GISS Surface Temperature Analysis (GISTEMP v4)](https://data.giss.nasa.gov/gistemp/)
*   **Processing**: Python scripts (`pandas`, `scipy`) to fetch, clean, and format NASA CSV data into JSON for the frontend.

---

## 📂 Project Structure

```
├── app/
│   ├── page.tsx                 # Global Overview (Home)
│   ├── regional-analysis/       # Regional Analysis Page
│   └── geographic-view/         # Geographic View Page
├── components/
│   ├── charts/                  # Reusable Chart Components
│   │   ├── TimelineChart.tsx
│   │   ├── RegionalChart.tsx
│   │   ├── HeatMap.tsx
│   │   ├── WorldMap.tsx
│   │   └── ZoneMap.tsx
│   └── ui/                      # UI Components (Header, Footer, Cards)
├── lib/
│   └── data-loader.ts           # Data fetching logic
├── public/
│   └── data/                    # Processed JSON data files
└── data-pipeline/               # Python scripts for data processing
```

---

## 🏃‍♂️ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/erfsalehi/Global-Temperature-Analysis.git
    cd Global-Temperature-Analysis
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in browser**:
    Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📊 Data Pipeline

To update the data manually:

1.  Navigate to the `data-pipeline` directory.
2.  Install Python dependencies:
    ```bash
    pip install requests pandas scipy
    ```
3.  Run the processing script:
    ```bash
    python process_data.py
    ```
    This will download the latest CSVs from NASA and generate updated JSON files in `public/data/`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

**Data Attribution**:  
GISTEMP Team, 2024: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA Goddard Institute for Space Studies. Dataset accessed from [data.giss.nasa.gov/gistemp/](https://data.giss.nasa.gov/gistemp/).
