import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Take Control of Your Credit Journey</h1>
              <p className="text-xl mb-8">
                Powerful tools to help you identify errors, generate dispute letters, and improve your credit score.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/register" 
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md text-center transition duration-300"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/features" 
                  className="bg-white text-blue-800 hover:bg-gray-100 font-medium py-3 px-6 rounded-md text-center transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Placeholder for hero image */}
              <div className="bg-blue-600 h-80 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">Credit Report Analysis Illustration</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3-Step Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 3-step process helps you take control of your credit report and dispute inaccuracies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Upload Your Credit Report</h3>
              <p className="text-gray-600">
                Upload your credit report from any bureau. Our system will automatically scan for errors and inaccuracies.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">Generate Dispute Letters</h3>
              <p className="text-gray-600">
                Select the errors you want to dispute and our AI will generate legally compliant dispute letters tailored to your situation.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Track Your Progress</h3>
              <p className="text-gray-600">
                Monitor the status of your disputes, receive updates, and watch your credit score improve over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to take control of your credit journey in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Dispute Letters</h3>
              <p className="text-gray-600">
                Our advanced AI generates legally compliant dispute letters based on FCRA, FDCPA, and Metro 2 guidelines.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Credit Score Simulator</h3>
              <p className="text-gray-600">
                See how different actions could impact your credit score before you take them.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Error Detection</h3>
              <p className="text-gray-600">
                Our OCR technology automatically scans your credit reports to identify potential errors and inaccuracies.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Dispute Tracking</h3>
              <p className="text-gray-600">
                Track the status of all your disputes in one place with real-time updates and notifications.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
              <p className="text-gray-600">
                Access our comprehensive library of articles, guides, and videos to learn more about credit repair.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and protected with bank-level security. We never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of people have improved their credit scores with CrediSure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "I was able to remove 3 incorrect late payments from my credit report using CrediSure. My score jumped 45 points in just 30 days!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center text-blue-800 font-bold">JD</div>
                <div className="ml-3">
                  <h4 className="font-medium">James D.</h4>
                  <p className="text-sm text-gray-500">Score increased by 45 points</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "The dispute letter templates were so professional. I had a collection account completely removed after my first letter. Thank you CrediSure!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center text-blue-800 font-bold">SM</div>
                <div className="ml-3">
                  <h4 className="font-medium">Sarah M.</h4>
                  <p className="text-sm text-gray-500">Collection account removed</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "The educational resources helped me understand my rights. I was able to dispute and remove 2 inquiries I never authorized. Great service!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center text-blue-800 font-bold">RL</div>
                <div className="ml-3">
                  <h4 className="font-medium">Robert L.</h4>
                  <p className="text-sm text-gray-500">Unauthorized inquiries removed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that's right for your credit repair journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Get started with basic tools</p>
              <p className="text-4xl font-bold mb-6">$0<span className="text-gray-500 text-lg font-normal">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="f<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>