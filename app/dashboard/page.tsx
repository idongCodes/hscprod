"use client";

import AuthGuard from "../AuthGuard";
import { useAuth } from "../AuthProvider";
import { useState } from "react";
import TestimonialManagement from "../components/TestimonialManagement";

export default function Dashboard() {
  const { logout } = useAuth();
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const currentCredentials = {
    name: "idong essien",
    title: "Dev | Admin",
    phone: process.env.NEXT_PUBLIC_ADMIN_PHONE || "+1 (774) 312-6471",
    code: "126471"
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header with logout */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'info'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Admin Information
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'testimonials'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Testimonial Management
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'info' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Name</h3>
                    <p className="text-gray-600">{currentCredentials.name}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Title</h3>
                    <p className="text-gray-600">{currentCredentials.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Number</h3>
                    <p className="text-gray-600">{currentCredentials.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Login Code</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600">
                        {showCode ? currentCredentials.code : '••••••••'}
                      </p>
                      <button
                        onClick={() => setShowCode(!showCode)}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        {showCode ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>To update credentials:</strong> Edit your <code className="bg-blue-100 px-1 rounded">.env.local</code> file and restart the development server.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Testimonial Management</h2>
              <TestimonialManagement />
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
