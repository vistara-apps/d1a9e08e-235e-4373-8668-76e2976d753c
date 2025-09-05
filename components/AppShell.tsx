'use client';

import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/Button';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-card m-4 mb-0 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">RightsGuardian</h1>
              <p className="text-sm text-purple-300">Your pocket legal guide</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="primary" size="sm">
              Rights Now
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-purple-300 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="glass-card m-4 mt-2 p-4">
          <nav className="space-y-2">
            <a href="#dashboard" className="block py-2 text-white hover:text-purple-300 transition-colors duration-200">
              Dashboard
            </a>
            <a href="#guides" className="block py-2 text-white hover:text-purple-300 transition-colors duration-200">
              Emergency Guides
            </a>
            <a href="#contacts" className="block py-2 text-white hover:text-purple-300 transition-colors duration-200">
              Emergency Contacts
            </a>
            <a href="#education" className="block py-2 text-white hover:text-purple-300 transition-colors duration-200">
              Rights Education
            </a>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 pt-2">
        {children}
      </main>
    </div>
  );
}
