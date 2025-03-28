import React from 'react';
import Link from 'next/link';

export default function LearningCenter() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Center</h1>
        <p className="text-gray-600">Expand your knowledge about credit repair and financial literacy.</p>
      </div>
      
      {/* Featured Content */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Featured Content</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-gray-200 md:w-64 h-48 md:h-auto flex items-center justify-center">
              <span className="text-gray-500">Featured Image</span>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Featured</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">New</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">The Ultimate Guide to Credit Dispute Letters</h3>
              <p className="text-gray-600 mb-4">
                Learn how to write effective dispute letters that get results. This comprehensive guide covers everything from basic templates to advanced legal arguments.
              </p>
              <Link 
                href="/dashboard/learning/ultimate-dispute-guide" 
                className="text-blue-800 hover:text-blue-600 font-medium"
              >
                Read Article →
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1 */}
          <Link 
            href="/dashboard/learning/credit-basics" 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200"
          >
            <div className="bg-blue-100 rounded-full p-3 inline-flex mb-4">
              <svg className="h-6 w-6 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Credit Basics</h3>
            <p className="text-sm text-gray-600">
              Learn the fundamentals of credit scores, reports, and how the credit system works.
            </p>
          </Link>
          
          {/* Category 2 */}
          <Link 
            href="/dashboard/learning/dispute-strategies" 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200"
          >
            <div className="bg-green-100 rounded-full p-3 inline-flex mb-4">
              <svg className="h-6 w-6 text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dispute Strategies</h3>
            <p className="text-sm text-gray-600">
              Discover effective strategies for disputing errors and inaccuracies on your credit report.
            </p>
          </Link>
          
          {/* Category 3 */}
          <Link 
            href="/dashboard/learning/legal-rights" 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200"
          >
            <div className="bg-purple-100 rounded-full p-3 inline-flex mb-4">
              <svg className="h-6 w-6 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Legal Rights</h3>
            <p className="text-sm text-gray-600">
              Understand your rights under FCRA, FDCPA, and other consumer protection laws.
            </p>
          </Link>
        </div>
      </div>
      
      {/* Recent Articles */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Articles</h2>
          <Link 
            href="/dashboard/learning/all" 
            className="text-blue-800 hover:text-blue-600 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Article 1 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-200 h-40 flex items-center justify-center">
              <span className="text-gray-500">Article Image</span>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Credit Basics</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding Your Credit Report: A Comprehensive Guide</h3>
              <p className="text-sm text-gray-600 mb-4">
                Learn how to read and interpret your credit report, identify errors, and understand what factors impact your credit score.
              </p>
              <Link 
                href="/dashboard/learning/understanding-credit-report" 
                className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              >
                Read Article →
              </Link>
            </div>
          </div>
          
          {/* Article 2 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-200 h-40 flex items-center justify-center">
              <span className="text-gray-500">Article Image</span>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Dispute Strategies</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">The 5 Most Effective Dispute Letter Templates</h3>
              <p className="text-sm text-gray-600 mb-4">
                Discover the most effective dispute letter templates for different situations and how to customize them for your needs.
              </p>
              <Link 
                href="/dashboard/learning/dispute-templates" 
                className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              >
                Read Article →
              </Link>
            </div>
          </div>
          
          {/* Article 3 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-200 h-40 flex items-center justify-center">
              <span className="text-gray-500">Article Image</span>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Legal Rights</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your Rights Under the Fair Credit Reporting Act (FCRA)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Understand your legal rights under the FCRA and how to leverage them when disputing inaccuracies on your credit report.
              </p>
              <Link 
                href="/dashboard/learning/fcra-rights" 
                className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              >
                Read Article →
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Resources */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Video Resources</h2>
          <Link 
            href="/dashboard/learning/videos" 
            className="text-blue-800 hover:text-blue-600 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Video 1 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-800 h-48 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How to Read Your Credit Report</h3>
              <p className="text-sm text-gray-600 mb-4">
                A step-by-step video guide to understanding and interpreting your credit report.
              </p>
              <Link 
                href="/dashboard/learning/videos/read-credit-report" 
                className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              >
                Watch Video →
              </Link>
            </div>
          </div>
          
          {/* Video 2 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-800 h-48 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Writing Effective Dispute Letters</h3>
              <p className="text-sm text-gray-600 mb-4">
                Learn how to write compelling dispute letters that get results from credit bureaus.
              </p>
              <Link 
                href="/dashboard/learning/videos/effective-dispute-letters" 
                className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              >
                Watch Video →
              </Link>
            </div>
          </div>
          
          {/* Video 3 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-800 h-48 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding FICO Score Factors</h3>
              <p className="text-sm text-gray-600 mb-4">
                A detailed explanation of the factors that make up your FICO score and how to improve each one.
              </p>
              <Link 
                href="/dashboard/learning/videos/fico-score-factors" 
                className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              >
                Watch Video →
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resources */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Downloadable Resources</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resource 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="h-6 w-6 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-md font-medium text-gray-900 mb-1">Credit Dispute Letter Templates Pack</h3>
                <p className="text-sm text-gray-600 mb-2">
                  A collection of 10 professionally written dispute letter templates for various situations.
                </p>
                <Link 
                  href="/dashboard/resources/dispute-templates.pdf" 
                  className="text-blue-800 hover:text-blue-600 text-sm font-medium"
                >
                  Download PDF
                </Link>
              </div>
            </div>
            
            {/* Resource 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-green-100 rounded-lg p-3">
                  <svg className="h-6 w-6 text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-md font-medium text-gray-900 mb-1">Credit Repair Checklist</h3>
                <p className="text-sm text-gray-600 mb-2">
                  A step-by-step checklist to guide you through the credit repair process.
                </p>
                <Link 
                  href="/dashboard/resources/credit-repair-checklist.pdf" 
                  className="text-blue-800 hover:text-blue-600 text-sm font-medium"
                >
                  Download PDF
                </<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>