import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-header transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors">
                NASA Global Temp
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/">Global Overview</NavLink>
            <NavLink href="/regional-analysis">Regional Analysis</NavLink>
            <NavLink href="/geographic-view">Geographic View</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm font-medium text-gray-600 hover:text-primary transition-colors relative py-2"
    >
      {children}
    </Link>
  );
}
