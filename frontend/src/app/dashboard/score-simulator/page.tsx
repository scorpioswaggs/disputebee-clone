import React from 'react';
import Link from 'next/link';

export default function ScoreSimulator() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Credit Score Simulator</h1>
        <p className="text-gray-600">See how different actions could affect your credit score.</p>
      </div>
      
      {/* Current Score */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Your Current Credit Score</h2>
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              Based on your latest credit report from Experian (Mar 15, 2025)
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-32 h-32 rounded-full border-8 border-blue-800 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">682</p>
                <p className="text-sm text-gray-500">Fair</p>
              </div>
            </div>
            <div className="ml-6">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-600">Poor (300-579)</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-600">Fair (580-669)</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Good (670-739)</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">Very Good (740-799)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600">Excellent (800-850)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Actions Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Simulate Actions</h3>
            <p className="text-sm text-gray-600 mb-6">
              Select actions to see how they might affect your credit score.
            </p>
            
            <div className="space-y-6">
              {/* Action 1 */}
              <div>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Pay off credit card balance</span>
                </label>
                <div className="pl-6">
                  <label className="block text-xs text-gray-500 mb-1">Select card to pay off</label>
                  <select className="w-full text-sm border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent">
                    <option>Chase Freedom ($2,500)</option>
                    <option>Capital One Venture ($1,800)</option>
                    <option>Discover It ($950)</option>
                  </select>
                </div>
              </div>
              
              {/* Action 2 */}
              <div>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Remove late payment</span>
                </label>
                <div className="pl-6">
                  <label className="block text-xs text-gray-500 mb-1">Select account</label>
                  <select className="w-full text-sm border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent">
                    <option>Bank of America Loan (30 days late)</option>
                    <option>Wells Fargo Mortgage (60 days late)</option>
                  </select>
                </div>
              </div>
              
              {/* Action 3 */}
              <div>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Apply for new credit</span>
                </label>
                <div className="pl-6">
                  <label className="block text-xs text-gray-500 mb-1">Credit type</label>
                  <select className="w-full text-sm border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent">
                    <option>Credit Card</option>
                    <option>Auto Loan</option>
                    <option>Mortgage</option>
                    <option>Personal Loan</option>
                  </select>
                </div>
              </div>
              
              {/* Action 4 */}
              <div>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Remove collection account</span>
                </label>
                <div className="pl-6">
                  <label className="block text-xs text-gray-500 mb-1">Select collection</label>
                  <select className="w-full text-sm border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent">
                    <option>Medical Collection ($750)</option>
                    <option>Utility Collection ($320)</option>
                  </select>
                </div>
              </div>
              
              {/* Action 5 */}
              <div>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Increase credit limits</span>
                </label>
                <div className="pl-6">
                  <label className="block text-xs text-gray-500 mb-1">Amount of increase</label>
                  <select className="w-full text-sm border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent">
                    <option>$1,000 on all cards</option>
                    <option>$2,500 on all cards</option>
                    <option>$5,000 on all cards</option>
                  </select>
                </div>
              </div>
              
              <button className="w-full bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                Simulate Changes
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Simulation Results</h3>
            
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-400">682</p>
                    <p className="text-sm text-gray-400">Current</p>
                  </div>
                </div>
                
                <div className="mx-8 text-center">
                  <svg className="h-12 w-12 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <p className="text-sm text-gray-500 mt-2">Potential Impact</p>
                </div>
                
                <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">725</p>
                    <p className="text-sm text-gray-500">Potential</p>
                  </div>
                </div>
                
                <div className="ml-6 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  +43 points
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="text-md font-medium text-gray-900 mb-3">Impact Breakdown</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span className="text-sm font-medium">Pay off credit card balance</span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-green-800">+20 pts</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span className="text-sm font-medium">Remove late payment</span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-green-800">+15 pts</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <span className="text-sm font-medium">Apply for new credit</span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-red-800">-5 pts</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span className="text-sm font-medium">Remove collection account</span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-green-800">+10 pts</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span className="text-sm font-medium">Increase credit limits</span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-green-800">+3 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Focus on paying off your credit card balances to reduce your <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>