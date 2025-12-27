"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            AUTO<span className="text-red-500">MATTEN</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-zinc-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/configurator" className="text-zinc-300 hover:text-white transition">
              Configurator
            </Link>
            <Link href="/contact" className="text-zinc-300 hover:text-white transition">
              Contact
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block text-zinc-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/configurator" className="block text-zinc-300 hover:text-white transition">
              Configurator
            </Link>
            <Link href="/contact" className="block text-zinc-300 hover:text-white transition">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
