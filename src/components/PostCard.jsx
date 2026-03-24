import { useState, useEffect } from 'react';
import { Database, Loader2 } from 'lucide-react';

export default function PostCard() {
  const [resource, setResource] = useState('posts');
  const [resourceId, setResourceId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}/${resourceId}`);
      if (!res.ok) throw new Error(`Status ${res.status}: Failed to fetch ${resource}`);
      const json = await res.json();
      if (Object.keys(json).length === 0) throw new Error(`No data found for ID ${resourceId}`);
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
    <div className="card fade-in" style={{ gridColumn: '1 / -1', animationDelay: '0.4s' }}>
      <div className="card-header" style={{ justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="card-icon"><Database size={24} /></div>
          <h2>API Explorer</h2>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <select 
            value={resource} 
            onChange={(e) => { setResource(e.target.value); setResourceId(1); }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)', 
              color: 'var(--text-primary)', 
              border: '1px solid var(--card-border)', 
              borderRadius: '8px', 
              padding: '0.4rem 0.5rem', 
              outline: 'none', 
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontFamily: 'inherit'
            }}
          >
            <option value="posts" style={{ background: 'var(--bg-top)' }}>Posts</option>
            <option value="comments" style={{ background: 'var(--bg-top)' }}>Comments</option>
            <option value="albums" style={{ background: 'var(--bg-top)' }}>Albums</option>
            <option value="photos" style={{ background: 'var(--bg-top)' }}>Photos</option>
            <option value="todos" style={{ background: 'var(--bg-top)' }}>Todos</option>
            <option value="users" style={{ background: 'var(--bg-top)' }}>Users</option>
          </select>

          <input 
            type="number" 
            min="1" 
            max="500"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)', 
              color: 'var(--text-primary)', 
              border: '1px solid var(--card-border)', 
              borderRadius: '8px', 
              padding: '0.4rem 0.5rem', 
              outline: 'none',
              width: '60px',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              textAlign: 'center'
            }}
          />
        </div>
      </div>
      
      <div className="card-content">
        {loading ? (
          <Loader2 className="spinner" size={32} />
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : data ? (
          <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            {resource === 'photos' && data.url && (
              <div style={{ width: '100%', height: '150px', background: 'rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src={data.url} 
                  alt={data.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span style="color:var(--text-secondary);font-size:0.8rem;text-align:center;padding:1rem;">Image failed to load<br/>(Adblocker may be blocking via.placeholder.com)</span>`;
                  }}
                />
              </div>
            )}
            <h3 style={{ fontSize: '1.2rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>
              {(data.title || data.name || '').charAt(0).toUpperCase() + (data.title || data.name || '').slice(1)}
            </h3>
            
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {data.username && <span style={{ display: 'block', fontWeight: 600, color: 'var(--accent-1)' }}>@{data.username}</span>}
              {data.email && <span style={{ display: 'block', color: 'var(--accent-1)', marginBottom: '4px' }}>{data.email}</span>}
              {data.phone && <span style={{ display: 'block' }}>Phone: {data.phone}</span>}
              {data.website && <span style={{ display: 'block' }}>Web: {data.website}</span>}
              {data.company?.name && <span style={{ display: 'block' }}>Company: {data.company.name}</span>}
              
              {data.completed !== undefined && (
                <span style={{ 
                  display: 'inline-block', 
                  padding: '4px 10px', 
                  borderRadius: '6px',
                  background: data.completed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  color: data.completed ? 'var(--success-color)' : 'var(--error-color)',
                  fontWeight: 700,
                  marginTop: '0.5rem'
                }}>
                  {data.completed ? 'Completed ✓' : 'Pending ✗'}
                </span>
              )}
              
              {data.body && <p style={{ marginTop: '0.5rem' }}>{data.body}</p>}
            </div>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 'auto', paddingTop: '1rem', opacity: 0.8 }}>
              Endpoint: /{resource}/{data.id || resourceId}
            </span>
          </div>
        ) : (
           <p className="empty-state">Select a resource</p>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={fetchData} disabled={loading} style={{ width: '100%', flex: 'none' }}>
          {loading ? 'Fetching...' : `Fetch /${resource}/${resourceId}`}
        </button>
      </div>
    </div>
  );
}
