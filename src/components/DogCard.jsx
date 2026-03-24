import { useState, useEffect } from 'react';
import { Dog, Copy, Check, Loader2 } from 'lucide-react';

export default function DogCard() {
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchDog = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      // Parse breed from URL: https://images.dog.ceo/breeds/hound-afghan/n02089867_3534.jpg
      const urlParts = data.message.split('/');
      const breedIndex = urlParts.indexOf('breeds') + 1;
      let breedName = 'Unknown breed';
      if (breedIndex > 0 && breedIndex < urlParts.length) {
        // Formatting "hound-afghan" to "Afghan Hound"
        breedName = urlParts[breedIndex]
          .split('-')
          .reverse()
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      
      setDog({ image: data.message, breed: breedName });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = async () => {
    if (dog?.image) {
      await navigator.clipboard.writeText(dog.image);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="card-header">
        <div className="card-icon"><Dog size={24} /></div>
        <h2>Dog Finder</h2>
      </div>
      
      <div className="card-content" style={{ padding: 0, justifyContent: 'flex-start' }}>
        {loading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 className="spinner" size={32} />
          </div>
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : dog ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              backgroundImage: `url(${dog.image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              borderRadius: '12px'
            }} />
            <h3 style={{ marginTop: '1rem', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{dog.breed}</h3>
          </div>
        ) : (
          <p className="empty-state">No dog found</p>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={fetchDog} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Dog'}
        </button>
        {dog && (
          <button className="btn" onClick={copyUrl} disabled={loading} title="Copy Image URL">
            {copied ? <Check size={18} color="var(--success-color)" /> : <Copy size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
