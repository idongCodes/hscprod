"use client";

import { useState, useEffect } from "react";
import ConfirmDialog from "./ConfirmDialog";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  message: string;
  is_approved: number;
  created_at: string;
  updated_at: string;
}

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    testimonialId: string | null;
    testimonialName: string;
  }>({
    isOpen: false,
    testimonialId: null,
    testimonialName: ""
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      setMessage("❌ Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    setMessage("");
    
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action: 'approve' }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Testimonial approved successfully");
        fetchTestimonials(); // Refresh list
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to approve testimonial");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    setMessage("");
    
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action: 'reject' }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Testimonial rejected successfully");
        fetchTestimonials(); // Refresh list
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to reject testimonial");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    setDeleteDialog({
      isOpen: true,
      testimonialId: id,
      testimonialName: name
    });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.testimonialId) return;
    
    setActionLoading(deleteDialog.testimonialId);
    setMessage("");
    
    try {
      const response = await fetch(`/api/admin/testimonials?id=${deleteDialog.testimonialId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Testimonial deleted successfully");
        fetchTestimonials(); // Refresh list
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to delete testimonial");
    } finally {
      setActionLoading(null);
      setDeleteDialog({ isOpen: false, testimonialId: null, testimonialName: "" });
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ isOpen: false, testimonialId: null, testimonialName: "" });
  };

  const pendingTestimonials = testimonials.filter(t => t.is_approved === 0);
  const approvedTestimonials = testimonials.filter(t => t.is_approved === 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div className={`p-4 rounded-md ${
          message.includes('✅') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Pending Testimonials */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pending Approval ({pendingTestimonials.length})
        </h3>
        
        {pendingTestimonials.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No pending testimonials</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Pending
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{testimonial.message}</p>
                
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Submitted: {new Date(testimonial.created_at).toLocaleDateString()}
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(testimonial.id)}
                      disabled={actionLoading === testimonial.id}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === testimonial.id ? '...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleReject(testimonial.id)}
                      disabled={actionLoading === testimonial.id}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === testimonial.id ? '...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id, testimonial.name)}
                      disabled={actionLoading === testimonial.id}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Permanently delete"
                    >
                      {actionLoading === testimonial.id ? '...' : '🗑️'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Testimonials */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Approved ({approvedTestimonials.length})
        </h3>
        
        {approvedTestimonials.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No approved testimonials</p>
          </div>
        ) : (
          <div className="space-y-4">
            {approvedTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Approved
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{testimonial.message}</p>
                
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Submitted: {new Date(testimonial.created_at).toLocaleDateString()} | 
                    Approved: {new Date(testimonial.updated_at).toLocaleDateString()}
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReject(testimonial.id)}
                      disabled={actionLoading === testimonial.id}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === testimonial.id ? '...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id, testimonial.name)}
                      disabled={actionLoading === testimonial.id}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Permanently delete"
                    >
                      {actionLoading === testimonial.id ? '...' : '🗑️'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Custom Confirm Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Testimonial"
        message={`Are you sure you want to permanently delete the testimonial from "${deleteDialog.testimonialName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
