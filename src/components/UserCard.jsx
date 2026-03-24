import { useState, useEffect } from 'react';
import { UserCircle, Mail, MapPin, Phone, Loader2 } from 'lucide-react';

export default function UserCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://randomuser.me/api/');
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      setUser(data.results[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="card fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="card-header">
        <div className="card-icon"><UserCircle size={24} /></div>
        <h2>Random User</h2>
      </div>
      
      <div className="card-content">
        {loading ? (
          <Loader2 className="spinner" size={32} />
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : user ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
            <img 
              src={user.picture.large} 
              alt="Profile" 
              style={{
                width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover',
                border: '3px solid var(--accent-color)',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
              }}
            />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>{`${user.name.first} ${user.name.last}`}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <Mail size={16} color="var(--accent-1)" /> {user.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <MapPin size={16} color="var(--accent-1)" /> {user.location.country} ({user.dob.age} yrs)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <Phone size={16} color="var(--accent-1)" /> {user.phone}
              </div>
            </div>
          </div>
        ) : (
          <p className="empty-state">No user found</p>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={fetchUser} disabled={loading}>
          {loading ? 'Finding User...' : 'Get User'}
        </button>
      </div>
    </div>
  );
}
