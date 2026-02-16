'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-header transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/nasa-global-temp" className="flex items-center space-x-2 group">
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors">
                NASA Global Temp
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/nasa-global-temp">Global Overview</NavLink>
            <NavLink href="/nasa-global-temp/regional-analysis">Regional Analysis</NavLink>
            <NavLink href="/nasa-global-temp/geographic-view">Geographic View</NavLink>
            <NavLink href="/ecg-classification">ECG Project</NavLink>
            <NavLink href="/nasa-global-temp/about">About</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/nasa-global-temp" onClick={() => setIsMenuOpen(false)}>Global Overview</MobileNavLink>
            <MobileNavLink href="/nasa-global-temp/regional-analysis" onClick={() => setIsMenuOpen(false)}>Regional Analysis</MobileNavLink>
            <MobileNavLink href="/nasa-global-temp/geographic-view" onClick={() => setIsMenuOpen(false)}>Geographic View</MobileNavLink>
            <MobileNavLink href="/ecg-classification" onClick={() => setIsMenuOpen(false)}>ECG Project</MobileNavLink>
            <MobileNavLink href="/nasa-global-temp/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
          </div>
        </div>
      )}
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

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-white/50 transition-all"
    >
      {children}
    </Link>
  );
}
