import React from 'react';
import Link from 'next/link';

export default function DisputeCenter() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dispute Center</h1>
        <p className="text-gray-600">Create, manage, and track your credit dispute letters.</p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          href="/dashboard/disputes/new" 
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center"
        >
          <div className="bg-green-100 rounded-full p-3 mr-4">
            <svg className="h-6 w-6 text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Create New Dispute</h3>
            <p className="text-sm text-gray-500">Generate a new dispute letter</p>
          </div>
        </Link>
        
        <Link 
          href="/dashboard/disputes/templates" 
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center"
        >
          <div className="bg-blue-100 rounded-full p-3 mr-4">
            <svg className="h-6 w-6 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Letter Templates</h3>
            <p className="text-sm text-gray-500">Browse and use pre-made templates</p>
          </div>
        </Link>
        
        <Link 
          href="/dashboard/disputes/bulk" 
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center"
        >
          <div className="bg-purple-100 rounded-full p-3 mr-4">
            <svg className="h-6 w-6 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Bulk Generation</h3>
            <p className="text-sm text-gray-500">Create multiple letters at once</p>
          </div>
        </Link>
      </div>
      
      {/* Dispute Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Dispute Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <p className="text-sm text-gray-500">Total Disputes</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-800 mb-1">5</div>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">6</div>
            <p className="text-sm text-gray-500">Successful</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">1</div>
            <p className="text-sm text-gray-500">Unsuccessful</p>
          </div>
        </div>
      </div>
      
      {/* Active Disputes */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Active Disputes</h2>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search disputes..."
                className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select
              className="text-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
            >
              <option value="all">All Disputes</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="successful">Successful</option>
              <option value="unsuccessful">Unsuccessful</option>
            </select>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispute ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bureau
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Sent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">DIS-2025-001</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-100 rounded-full">
                      <span className="text-blue-800 font-medium text-xs">EX</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-900">Experian</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Late Payment</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 20, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link href="/dashboard/disputes/1" className="text-blue-800 hover:text-blue-600 mr-4">
                    View
                  </Link>
                  <button className="text-gray-600 hover:text-gray-800 mr-4">
                    Print
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">DIS-2025-002</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-100 rounded-full">
                      <span className="text-blue-800 font-medium text-xs">EQ</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-900">Equifax</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Account Not Mine</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 15, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Responded
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link href="/dashboard/disputes/2" className="text-blue-800 hover:text-blue-600 mr-4">
                    View
                  </Link>
                  <button className="text-gray-600 hover:text-gray-800 mr-4">
                    Print
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">DIS-2025-003</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-100 rounded-full">
                      <span className="text-blue-800 font-medium text-xs">TU</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-900">TransUnion</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Incorrect Balance</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 10, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Successful
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link href="/dashboard/disputes/3" className="text-blue-800 hover:text-blue-600 mr-4">
                    View
                  </Link>
                  <button className="text-gray-600 hover:text-gray-800 mr-4">
                    Print
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">5</span> results
            </div>
            <div className="flex-1 flex justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tips Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-800 mb-4">Dispute Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Always keep copies of all dispute letters and supporting documentation.</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Send dispute letters via certified mail with return receipt for proof of delivery.</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Credit bureaus must respond to your dispute within 30 days (45 days in some cases).</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Include supporting documentation whenever possible to strengthen your case.</span>
          </li>
        </ul>
        <div className="mt-4">
          <Link 
            href="/dashboard/learning/dispute-strategies" 
            className="text-blue-800 hover:text-blue-600 text-sm font-medium"
          >
            Learn more about effective dispute strategies →
          </Link>
        </div>
      </div>
    </div>
  );
}
