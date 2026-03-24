import { useState, useEffect } from 'react';
import { Database, Loader2 } from 'lucide-react';

export default function PostCard() {
  const [resource, setResource] = useState('posts');
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`);
      if (!res.ok) throw new Error(`Status ${res.status}: Failed to fetch ${resource}`);
      const json = await res.json();
      
      // Render up to 100 items so the browser doesn't freeze (JSONPlaceholder Photos returns 5,000 items!)
      setDataList(Array.isArray(json) ? json.slice(0, 100) : [json]);
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
            onChange={(e) => setResource(e.target.value)}
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
        </div>
      </div>
      
      <div className="card-content" style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        {loading ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <Loader2 className="spinner" size={32} />
          </div>
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : dataList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Showing {dataList.length} items from /{resource}
            </div>
            {dataList.map((data, index) => (
              <div key={data.id || index} style={{ 
                padding: '1.25rem', 
                border: '1px solid var(--card-border)', 
                borderRadius: '16px', 
                background: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {resource === 'photos' && data.thumbnailUrl && (
                  <div style={{ width: '100px', height: '100px', background: 'rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={data.thumbnailUrl} 
                      alt={data.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<span style="color:var(--text-secondary);font-size:0.7rem;text-align:center;">IMG Error</span>`;
                      }}
                    />
                  </div>
                )}
                
                <h3 style={{ fontSize: '1.1rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent-1)', marginRight: '8px' }}>#{data.id}</span>
                  {(data.title || data.name || '').charAt(0).toUpperCase() + (data.title || data.name || '').slice(1)}
                </h3>
                
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {data.username && <span style={{ display: 'block', fontWeight: 600, color: 'var(--text-primary)' }}>@{data.username}</span>}
                  {data.email && <span style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>{data.email}</span>}
                  {data.phone && <span style={{ display: 'block' }}>Phone: {data.phone}</span>}
                  {data.website && <span style={{ display: 'block' }}>Web: {data.website}</span>}
                  {data.company?.name && <span style={{ display: 'block' }}>Company: {data.company.name}</span>}
                  
                  {data.completed !== undefined && (
                    <span style={{ 
                      display: 'inline-block', 
                      padding: '4px 10px', 
                      borderRadius: '8px',
                      background: data.completed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                      color: data.completed ? 'var(--success-color)' : 'var(--error-color)',
                      fontWeight: 700,
                      marginTop: '0.5rem',
                      fontSize: '0.85rem'
                    }}>
                      {data.completed ? 'Completed ✓' : 'Pending ✗'}
                    </span>
                  )}
                  
                  {data.body && <p style={{ marginTop: '0.5rem' }}>{data.body}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
           <p className="empty-state">No data found</p>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={fetchData} disabled={loading} style={{ width: '100%', flex: 'none' }}>
          {loading ? 'Fetching...' : `Refresh /${resource}`}
        </button>
      </div>
    </div>
  );
}
