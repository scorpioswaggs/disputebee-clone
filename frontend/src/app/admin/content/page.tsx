import React from 'react';
import Link from 'next/link';

export default function AdminContent() {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <div className="flex space-x-3">
          <Link 
            href="/admin/content/create" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Content
          </Link>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Content Categories</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Articles</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">24 Items</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Educational articles about credit repair, financial literacy, and dispute strategies.</p>
            <Link href="/admin/content/articles" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage Articles →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Videos</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">12 Items</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Video tutorials and educational content about credit repair and financial empowerment.</p>
            <Link href="/admin/content/videos" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage Videos →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Resources</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">18 Items</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Downloadable resources, templates, and guides for credit repair and financial planning.</p>
            <Link href="/admin/content/resources" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage Resources →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Letter Templates</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">8 Items</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Dispute letter templates for various credit issues and bureaus.</p>
            <Link href="/admin/disputes/templates" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage Templates →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">FAQs</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">32 Items</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Frequently asked questions about credit repair, disputes, and the platform.</p>
            <Link href="/admin/content/faqs" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage FAQs →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Testimonials</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">15 Items</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Success stories and testimonials from users of the platform.</p>
            <Link href="/admin/content/testimonials" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage Testimonials →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recent Content</h2>
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search content..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="resource">Resources</option>
              <option value="template">Templates</option>
              <option value="faq">FAQs</option>
              <option value="testimonial">Testimonials</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(10)].map((_, index) => {
                // Generate mock content data
                const contentTypes = ['Article', 'Video', 'Resource', 'Template', 'FAQ', 'Testimonial'];
                const categories = ['Credit Basics', 'Dispute Strategies', 'Legal Rights', 'Credit Building', 'Debt Management'];
                const statuses = ['Published', 'Draft', 'Archived'];
                
                const titles = [
                  'How to Dispute Late Payments on Your Credit Report',
                  'Understanding Your FCRA Rights',
                  'The Ultimate Guide to Credit Scores',
                  'How to Remove Collection Accounts',
                  '5 Ways to Improve Your Credit Score Fast',
                  'What to Do After a Credit Dispute',
                  'How to Read Your Credit Report',
                  'Dealing with Identity Theft',
                  'Credit Repair vs. Credit Building',
                  'How to Negotiate with Creditors'
                ];
                
                const contentType = contentTypes[index % contentTypes.length];
                const category = categories[index % categories.length];
                const status = statuses[index % statuses.length];
                const title = titles[index % titles.length];
                
                // Generate status color based on status
                let statusColor = '';
                switch (status) {
                  case 'Published':
                    statusColor = 'bg-green-100 text-green-800';
                    break;
                  case 'Draft':
                    statusColor = 'bg-yellow-100 text-yellow-800';
                    break;
                  case 'Archived':
                    statusColor = 'bg-gray-100 text-gray-800';
                    break;
                  default:
                    statusColor = 'bg-gray-100 text-gray-800';
                }
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contentType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`Mar ${10 + index}, 2025`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`Mar ${15 + index}, 2025`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/admin/content/${index + 1}`} className="text-blue-600 hover:text-blue-900">
                          View
                        </Link>
                        <Link href={`/admin/content/${index + 1}/edit`} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">109</span> items
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </a>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </a>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  11
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>