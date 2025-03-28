import React from 'react';
import Link from 'next/link';

export default function CreditReportUpload() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Credit Report</h1>
        <p className="text-gray-600">Upload your credit report from any bureau for analysis and dispute generation.</p>
      </div>
      
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Upload New Report</h2>
          <p className="text-gray-600 text-sm">
            We support credit reports from Experian, Equifax, TransUnion, and Annual Credit Report.
          </p>
        </div>
        
        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-700 mb-2">Drag and drop your credit report file here</p>
          <p className="text-gray-500 text-sm mb-4">or</p>
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
            Browse Files
          </button>
          <p className="text-gray-500 text-xs mt-4">
            Supported file types: PDF, JPG, PNG (Max size: 10MB)
          </p>
        </div>
        
        {/* Report Source Selection */}
        <div className="mb-6">
          <label htmlFor="reportSource" className="block text-sm font-medium text-gray-700 mb-2">
            Credit Report Source
          </label>
          <select
            id="reportSource"
            name="reportSource"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          >
            <option value="">Select a source</option>
            <option value="experian">Experian</option>
            <option value="equifax">Equifax</option>
            <option value="transunion">TransUnion</option>
            <option value="annualcreditreport">Annual Credit Report</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        {/* Report Date */}
        <div className="mb-6">
          <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700 mb-2">
            Report Date
          </label>
          <input
            type="date"
            id="reportDate"
            name="reportDate"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          />
        </div>
        
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
          Upload and Analyze
        </button>
      </div>
      
      {/* Tips Section */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-blue-800 mb-4">Tips for Uploading Credit Reports</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Make sure your credit report is complete and includes all pages.</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>For best results, upload a PDF version of your credit report.</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>If uploading images, ensure they are clear and all text is legible.</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-800 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>For the most comprehensive analysis, upload reports from all three major bureaus.</span>
          </li>
        </ul>
      </div>
      
      {/* Previous Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Previously Uploaded Reports</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
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
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                      <span className="text-blue-800 font-medium text-sm">EX</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Experian</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 15, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 16, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Analyzed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link href="/dashboard/credit-reports/1" className="text-blue-800 hover:text-blue-600 mr-4">
                    View
                  </Link>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                      <span className="text-blue-800 font-medium text-sm">EQ</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Equifax</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 10, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 12, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Analyzed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link href="/dashboard/credit-reports/2" className="text-blue-800 hover:text-blue-600 mr-4">
                    View
                  </Link>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                      <span className="text-blue-800 font-medium text-sm">TU</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">TransUnion</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 15, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 27, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Analyzed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link href="/dashboard/credit-reports/3" className="text-blue-800 hover:text-blue-600 mr-4">
                    View
                  </Link>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
