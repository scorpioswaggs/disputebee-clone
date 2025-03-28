import React from 'react';
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">CrediSure Admin</h2>
        <p className="text-xs text-gray-400">Management Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link 
              href="/admin/dashboard" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
            >
              <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li className="pt-4">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              User Management
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <Link 
                  href="/admin/users" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>All Users</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/users/subscriptions" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span>Subscriptions</span>
                </Link>
              </li>
            </ul>
          </li>
          
          <li className="pt-4">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Dispute Management
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <Link 
                  href="/admin/disputes" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>All Disputes</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/disputes/templates" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                  <span>Letter Templates</span>
                </Link>
              </li>
            </ul>
          </li>
          
          <li className="pt-4">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Content Management
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <Link 
                  href="/admin/content/articles" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>Articles</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/content/videos" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Videos</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/content/resources" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Resources</span>
                </Link>
              </li>
            </ul>
          </li>
          
          <li className="pt-4">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Billing & Analytics
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <Link 
                  href="/admin/billing" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Billing</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/analytics" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/reports" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Reports</span>
                </Link>
              </li>
            </ul>
          </li>
          
          <li className="pt-4">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Settings
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <Link 
                  href="/admin/settings" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>General Settings</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/settings/admins" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Admin Users</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <Link 
          href="/admin/logout" 
          className="flex items-center text-gray-300 hover:text-white"
        >
          <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
