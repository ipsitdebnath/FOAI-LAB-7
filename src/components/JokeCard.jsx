import { useState, useEffect } from 'react';
import { Smile, Loader2, ArrowRight } from 'lucide-react';

export default function JokeCard() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=twopart');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="card-header">
        <div className="card-icon"><Smile size={24} /></div>
        <h2>Joke Generator</h2>
      </div>
      
      <div className="card-content">
        {loading ? (
          <Loader2 className="spinner" size={32} />
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : joke ? (
          <div style={{ textAlign: 'left', width: '100%', background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px' }}>
            <p style={{ fontWeight: 500, marginBottom: '0.75rem', fontSize: '1.1rem', color: '#f1f5f9' }}>
              {joke.setup}
            </p>
            <p style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '1.2rem' }}>
              {joke.delivery || joke.punchline}
            </p>
          </div>
        ) : (
          <p className="empty-state">Ready for a laugh?</p>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={fetchJoke} disabled={loading}>
          {loading ? 'Finding Joke...' : 'Get Joke'}
        </button>
        <button className="btn" onClick={fetchJoke} disabled={loading} title="Next Joke">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
