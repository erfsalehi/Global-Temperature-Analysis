export default function Footer() {
  return (
    <footer className="mt-12 py-8 glass-header border-t-0 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            <p>Data source: NASA GISTEMP v4</p>
            <p className="mt-1">© {new Date().getFullYear()} NASA Global Temperature Analysis</p>
            <p className="mt-1 font-medium">Developed by <span className="text-primary font-bold">Erfan Salehi</span></p>
          </div>
          <div className="mt-4 md:mt-0">
            <a
              href="https://data.giss.nasa.gov/gistemp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              NASA GISS Surface Temperature Analysis
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
