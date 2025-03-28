import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's an overview of your credit repair progress.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Credit Score</h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">+15 pts</span>
          </div>
          <div className="flex items-end">
            <p className="text-3xl font-bold text-gray-900">682</p>
            <p className="text-sm text-gray-500 ml-2 mb-1">/ 850</p>
          </div>
          <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-800 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Active Disputes</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">In Progress</span>
          </div>
          <div className="flex items-end">
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-500 ml-2 mb-1">disputes</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="font-bold text-gray-900">3</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Responded</p>
              <p className="font-bold text-gray-900">1</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Resolved</p>
              <p className="font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Credit Reports</h3>
          </div>
          <div className="flex items-end">
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-500 ml-2 mb-1">bureaus</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-xs text-gray-500">Experian</p>
              <p className="font-bold text-gray-900">✓</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Equifax</p>
              <p className="font-bold text-gray-900">✓</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">TransUnion</p>
              <p className="font-bold text-gray-900">✓</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Subscription</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Basic</span>
          </div>
          <div className="flex items-end">
            <p className="text-3xl font-bold text-gray-900">10</p>
            <p className="text-sm text-gray-500 ml-2 mb-1">letters left</p>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/billing" 
              className="text-blue-800 hover:text-blue-600 text-sm font-medium flex items-center"
            >
              Upgrade Plan
              <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/dashboard/credit-reports/upload" 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center"
          >
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Upload Credit Report</h3>
              <p className="text-sm text-gray-500">Upload a new credit report for analysis</p>
            </div>
          </Link>
          
          <Link 
            href="/dashboard/disputes/new" 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center"
          >
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Create Dispute Letter</h3>
              <p className="text-sm text-gray-500">Generate a new dispute letter</p>
            </div>
          </Link>
          
          <Link 
            href="/dashboard/score-simulator" 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center"
          >
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Simulate Score Changes</h3>
              <p className="text-sm text-gray-500">See how actions affect your score</p>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <Link 
            href="/dashboard/activity" 
            className="text-blue-800 hover:text-blue-600 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <svg className="h-5 w-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Dispute letter sent to Experian</p>
                  <p className="text-xs text-gray-500">Regarding Account #1234</p>
                </div>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <svg className="h-5 w-5 text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Uploaded TransUnion credit report</p>
                  <p className="text-xs text-gray-500">Report dated March 15, 2025</p>
                </div>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-full p-2 mr-4">
                  <svg className="h-5 w-5 text-yellow-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Equifax responded to dispute</p>
                  <p className="text-xs text-gray-500">Regarding late payment on Account #5678</p>
                </div>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="bg-red-100 rounded-full p-2 mr-4">
                  <svg className="h-5 w-5 text-red-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Deleted draft dispute letter</p>
                  <p className="text-xs text-gray-500">Regarding inquiry from XYZ Company</p>
                </div>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Tips & Resources */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Tips & Resources</h2>
          <Link 
            href="/dashboard/learning" 
            className="text-blue-800 hover:text-blue-600 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">Understanding Credit Utilization</h3>
              <p className="text-sm text-gray-600 mb-4">
                Learn how credit utilization affects your score and strategies to improve it.
              </p>
              <Link 
                href="/dashboard/learning/credit-utilization" 
                className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              >
                Read Article →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">5 Common Credit Report Errors</h3>
              <p className="text-sm text-gray-600 mb-4">
                Discover the most common errors on credit reports and how to dispute them effectively.
              </p>
              <Link 
                href="/dashboard/learning/common-errors" 
                className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              >
                Read Article →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
