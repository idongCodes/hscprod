"use client";

import AuthGuard from "../AuthGuard";
import { useAuth } from "../AuthProvider";
import { useState } from "react";

export default function Dashboard() {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const currentCredentials = {
    name: "idong essien",
    title: "Dev | Admin",
    phone: process.env.NEXT_PUBLIC_ADMIN_PHONE || "+1 (774) 312-6471",
    code: "••••••••"
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
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Admin Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={currentCredentials.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={currentCredentials.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={currentCredentials.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Login Code</label>
                  <div className="relative">
                    <input
                      type="password"
                      defaultValue="••••••••"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => setShowCode(!showCode)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showCode ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-7a9.97 9.97 0 01-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
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
                        {showCode ? process.env.ADMIN_CODE || '••••••••' : '••••••••'}
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
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
