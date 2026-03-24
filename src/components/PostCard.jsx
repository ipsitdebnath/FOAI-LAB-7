import { useState, useEffect } from 'react';
import { Database, Loader2, ArrowRight } from 'lucide-react';

export default function PostCard() {
  const [resource, setResource] = useState('posts');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const randomId = Math.floor(Math.random() * 50) + 1; // 50 items exist for most resources safely
      const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}/${randomId}`);
      if (!res.ok) throw new Error(`Failed to fetch ${resource}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resource]);

  return (
    <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="card-header" style={{ justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="card-icon"><Database size={24} /></div>
          <h2>JSONPlaceholder</h2>
        </div>
        <select 
          value={resource} 
          onChange={(e) => setResource(e.target.value)}
          style={{
            background: 'rgba(255, 255, 255, 0.1)', 
            color: 'var(--text-color)', 
            border: '1px solid var(--card-border)', 
            borderRadius: '8px', 
            padding: '0.4rem 0.5rem', 
            outline: 'none', 
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontFamily: 'inherit'
          }}
        >
          <option value="posts" style={{ background: 'var(--bg-color)' }}>Posts</option>
          <option value="comments" style={{ background: 'var(--bg-color)' }}>Comments</option>
          <option value="todos" style={{ background: 'var(--bg-color)' }}>Todos</option>
          <option value="photos" style={{ background: 'var(--bg-color)' }}>Photos</option>
        </select>
      </div>
      
      <div className="card-content">
        {loading ? (
          <Loader2 className="spinner" size={32} />
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : data ? (
          <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            {resource === 'photos' && data.thumbnailUrl && (
              <img src={data.thumbnailUrl} alt={data.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            )}
            <h3 style={{ fontSize: '1.2rem', lineHeight: 1.4, color: '#f1f5f9' }}>
              {(data.title || data.name || '').charAt(0).toUpperCase() + (data.title || data.name || '').slice(1)}
            </h3>
            {(data.body || data.email || data.completed !== undefined) && (
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {data.email ? <span style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '4px' }}>{data.email}</span> : null}
                {data.completed !== undefined ? (
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    background: data.completed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: data.completed ? 'var(--success-color)' : 'var(--error-color)',
                    fontWeight: 600
                  }}>
                    {data.completed ? 'Completed ✓' : 'Pending ✗'}
                  </span>
                ) : null}
                {data.body}
              </p>
            )}
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 'auto', paddingTop: '1rem' }}>
              Resource: {resource} | ID: {data.id}
            </span>
          </div>
        ) : (
           <p className="empty-state">Select a resource</p>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
          {loading ? 'Fetching...' : `Get Random ${resource.slice(0, -1)}`}
        </button>
        <button className="btn" onClick={fetchData} disabled={loading} title="Get Random">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
