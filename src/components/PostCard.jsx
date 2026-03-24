import { useState, useEffect } from 'react';
import { MessageSquare, Loader2, ArrowRight } from 'lucide-react';

export default function PostCard() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const randomId = Math.floor(Math.random() * 100) + 1; // 100 posts available
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
      if (!res.ok) throw new Error('Failed to fetch post');
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="card-header">
        <div className="card-icon"><MessageSquare size={24} /></div>
        <h2>JSONPlaceholder</h2>
      </div>
      
      <div className="card-content">
        {loading ? (
          <Loader2 className="spinner" size={32} />
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : post ? (
          <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', lineHeight: 1.4, color: '#f1f5f9' }}>
              {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {post.body}
            </p>
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
              Post ID: {post.id}
            </span>
          </div>
        ) : (
          <p className="empty-state">No post available</p>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={fetchPost} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Post'}
        </button>
        <button className="btn" onClick={fetchPost} disabled={loading} title="Random Post">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
