import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle, Shield } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Review {
  id: string;
  username: string;
  content: string;
  verified: boolean;
  created_at: string;
}

export const Reviews: React.FC<Props> = ({ isOpen, onClose }) => {
  const [review, setReview] = useState('');
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('reviews').insert({
        username,
        content: review,
        verified: false
      });

      if (error) throw error;

      toast.success('Review submitted for verification!');
      setReview('');
      setUsername('');
      setVerificationCode('');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to submit review');
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ verified: true })
        .eq('id', id);

      if (error) throw error;

      toast.success('Review verified successfully!');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to verify review');
      console.error('Error verifying review:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Review deleted successfully!');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
      console.error('Error deleting review:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Customer Reviews
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Submit a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Your username"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Enter your verification code"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Your Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 h-32"
                  placeholder="Share your experience with our configs..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Star size={16} />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Latest Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-cyan-400">{review.username}</span>
                      {review.verified && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle size={12} />
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-300">{review.content}</p>
                  {isAdmin && (
                    <div className="mt-2 flex gap-2">
                      {!review.verified && (
                        <button
                          onClick={() => handleVerify(review.id)}
                          className="text-green-400 text-sm hover:text-green-300 transition-colors"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-red-400 text-sm hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-gray-400 text-center">No reviews yet. Be the first to share your experience!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};