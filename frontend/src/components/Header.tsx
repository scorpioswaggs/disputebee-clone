import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-800">
                CrediSure
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/features" 
                className="border-transparent text-gray-700 hover:text-blue-800 hover:border-blue-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Features
              </Link>
              <Link 
                href="/learn" 
                className="border-transparent text-gray-700 hover:text-blue-800 hover:border-blue-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Learn
              </Link>
              <Link 
                href="/pricing" 
                className="border-transparent text-gray-700 hover:text-blue-800 hover:border-blue-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="border-transparent text-gray-700 hover:text-blue-800 hover:border-blue-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-800 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-800"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu button */}
              <svg 
                className="block h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="hidden sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            href="/features" 
            className="text-gray-700 hover:bg-gray-100 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Features
          </Link>
          <Link 
            href="/learn" 
            className="text-gray-700 hover:bg-gray-100 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Learn
          </Link>
          <Link 
            href="/pricing" 
            className="text-gray-700 hover:bg-gray-100 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-700 hover:bg-gray-100 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
            </div>
            <div className="ml-3">
              <Link 
                href="/register" 
                className="bg-blue-800 text-white hover:bg-blue-700 block px-4 py-2 rounded-md text-base font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
