import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Learn() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Credit Education Center</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Empower yourself with knowledge about credit repair, financial literacy, and your legal rights.
            </p>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive library of educational resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Credit Basics</h3>
              <p className="text-gray-600 mb-6">
                Learn the fundamentals of credit scores, reports, and how the credit system works.
              </p>
              <Link 
                href="/learn/credit-basics" 
                className="text-blue-800 hover:text-blue-600 font-medium"
              >
                Explore Articles →
              </Link>
            </div>
            
            {/* Category 2 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Dispute Strategies</h3>
              <p className="text-gray-600 mb-6">
                Discover effective strategies for disputing errors and inaccuracies on your credit report.
              </p>
              <Link 
                href="/learn/dispute-strategies" 
                className="text-blue-800 hover:text-blue-600 font-medium"
              >
                Explore Articles →
              </Link>
            </div>
            
            {/* Category 3 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Legal Rights</h3>
              <p className="text-gray-600 mb-6">
                Understand your rights under FCRA, FDCPA, and other consumer protection laws.
              </p>
              <Link 
                href="/learn/legal-rights" 
                className="text-blue-800 hover:text-blue-600 font-medium"
              >
                Explore Articles →
              </Link>
            </div>
            
            {/* Category 4 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Credit Scoring</h3>
              <p className="text-gray-600 mb-6">
                Learn how credit scores are calculated and strategies to improve your score.
              </p>
              <Link 
                href="/learn/credit-scoring" 
                className="text-blue-800 hover:text-blue-600 font-medium"
              >
                Explore Articles →
              </Link>
            </div>
            
            {/* Category 5 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Debt Management</h3>
              <p className="text-gray-600 mb-6">
                Discover strategies for managing and reducing debt to improve your financial health.
              </p>
              <Link 
                href="/learn/debt-management" 
                className="text-blue-800 hover:text-blue-600 font-medium"
              >
                Explore Articles →
              </Link>
            </div>
            
            {/* Category 6 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Financial Planning</h3>
              <p className="text-gray-600 mb-6">
                Learn how to create a financial plan that supports your long-term goals.
              </p>
              <Link 
                href="/learn/financial-planning" 
                className="text-blue-800 hover:text-blue-600 font-medium"
              >
                Explore Articles →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and helpful resources to get you started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Credit Basics</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Understanding Your Credit Report: A Comprehensive Guide</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to read and interpret your credit report, identify errors, and understand what factors impact your credit score.
                </p>
                <Link 
                  href="/learn/understanding-credit-report" 
                  className="text-blue-800 hover:text-blue-600 font-medium"
                >
                  Read Article →
                </Link>
              </div>
            </div>
            
            {/* Article 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Dispute Strategies</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">The Ultimate Guide to Disputing Errors on Your Credit Report</h3>
                <p className="text-gray-600 mb-4">
                  A step-by-step guide to identifying errors, preparing dispute letters, and following up with credit bureaus.
                </p>
                <Link 
                  href="/learn/ultimate-dispute-guide" 
                  className="text-blue-800 hover:text-blue-600 font-medium"
                >
                  Read Article →
                </Link>
              </div>
            </div>
            
            {/* Article 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Legal Rights</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Rights Under the Fair Credit Reporting Act (FCRA)</h3>
                <p className="text-gray-600 mb-4">
                  Understand your legal rights under the FCRA and how to leverage them when disputing inaccuracies on your credit report.
                </p>
                <Link 
                  href="/learn/fcra-rights" 
                  className="text-blue-800 hover:text-blue-600 font-medium"
                >
                  Read Article →
                </Link>
              </div>
            </div>
            
            {/* Article 4 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Credit Scoring</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">The 5 Factors That Determine Your Credit Score</h3>
                <p className="text-gray-600 mb-4">
                  Learn about the five key factors that make up your FICO score and how to optimize each one to improve your credit.
                </p>
                <Link 
                  href="/learn/credit-score-factors" 
                  className="text-blue-800 hover:text-blue-600 font-medium"
                >
                  Read Article →
                </Link>
              </div>
            </div>
            
            {/* Article 5 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Debt Management</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Strategies for Paying Off Debt While Building Credit</h3>
                <p className="text-gray-600 mb-4">
                  Discover effective strategies for reducing debt while simultaneously improving your credit score.
                </p>
                <Link 
                  href="/learn/debt-payoff-strategies" 
                  className="text-blue-800 hover:text-blue-600 font-medium"
                >
                  Read Article →
                </Link>
              </div>
            </div>
            
            {/* Article 6 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Financial Planning</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Building a Solid Financial Foundation After Credit Repair</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to maintain good credit and build a strong financial foundation after completing your credit repair journey.
                </p>
                <Link 
                  href="/learn/financial-foundation" 
                  className="text-blue-800 hover:text-blue-600 font-medium"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/learn/all" 
              className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md inline-block transition duration-300"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>
      
      {/* Video Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Video Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch our educational videos to learn more about credit repair and financial literacy.
            </p>
          </div>
          
          <div clas<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>