import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/global.css";

const Stats = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchStats();
  }, [shortCode]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await api.get(`/api/v1/urls/${shortCode}/stats`);
      setStats(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("Short URL not found. It may have been deleted or never existed.");
        } else if (err.response.status === 410) {
          setError("This short URL has expired.");
        } else {
          setError(err.response.data?.message || "Failed to load statistics");
        }
      } else if (err.request) {
        setError("Unable to connect to server. Please check if the backend is running.");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateDaysRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="not-found-container">
        <div className="not-found-emoji">⚠️</div>
        <h1 className="not-found-title">Oops!</h1>
        <p className="not-found-text">{error}</p>
        <Link to="/" className="home-btn">
          🏠 Go to Homepage
        </Link>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const shortUrl = `${window.location.origin}/r/${stats.shortCode}`;
  const daysRemaining = calculateDaysRemaining(stats.expiresAt);

  return (
    <div className="stats-container">
      {/* Header */}
      <div className="stats-header">
        <h1>📊 URL Analytics</h1>
        <div className="short-code">
          {stats.shortCode}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👆</div>
          <div className="stat-value">{stats.clickCount.toLocaleString()}</div>
          <div className="stat-label">Total Clicks</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">{stats.expired ? "❌" : "✅"}</div>
          <div className="stat-value">
            {stats.expired ? "Expired" : "Active"}
          </div>
          <div className="stat-label">Status</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-value">
            {stats.expired ? "0" : Math.max(0, daysRemaining)}
          </div>
          <div className="stat-label">Days Remaining</div>
        </div>
      </div>

      {/* URL Information */}
      <div className="url-info">
        <h3>🔗 URL Details</h3>
        
        <div className="url-info-item">
          <div className="url-info-label">Short URL</div>
          <div className="url-info-value" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noreferrer noopener"
              style={{ color: '#3b82f6', textDecoration: 'none', wordBreak: 'break-all' }}
            >
              {shortUrl}
            </a>
            <button 
              onClick={() => copyToClipboard(shortUrl)}
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#fff',
                background: '#10b981',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              {copied ? "✓ Copied" : "📋 Copy"}
            </button>
          </div>
        </div>

        <div className="url-info-item">
          <div className="url-info-label">Original URL</div>
          <div className="url-info-value">
            <a 
              href={stats.originalUrl} 
              target="_blank" 
              rel="noreferrer noopener"
              style={{ color: '#3b82f6', textDecoration: 'none', wordBreak: 'break-all' }}
            >
              {stats.originalUrl}
            </a>
          </div>
        </div>

        <div className="url-info-item">
          <div className="url-info-label">Created On</div>
          <div className="url-info-value">{formatDate(stats.createdAt)}</div>
        </div>

        <div className="url-info-item">
          <div className="url-info-label">Expires On</div>
          <div className="url-info-value">
            {formatDate(stats.expiresAt)}
            {stats.expired && (
              <span style={{ marginLeft: '12px' }}>
                <span className="expired-badge">Expired</span>
              </span>
            )}
            {!stats.expired && daysRemaining <= 7 && daysRemaining > 0 && (
              <span style={{ marginLeft: '12px', color: '#f59e0b', fontSize: '0.875rem', fontWeight: '600' }}>
                ⚠️ Expires soon
              </span>
            )}
          </div>
        </div>

        <div className="url-info-item">
          <div className="url-info-label">Current Status</div>
          <div className="url-info-value">
            {stats.expired ? (
              <span className="expired-badge">Expired - No longer accessible</span>
            ) : (
              <span className="active-badge">Active - Accepting clicks</span>
            )}
          </div>
        </div>
      </div>

      {/* QR Code */}
      {/* {!stats.expired && (
        <div className="qr-section">
          <h3>📱 QR Code</h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '16px' }}>
            Share this QR code to make your link easy to access
          </p>
          <div className="qr-code">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`}
              alt="QR Code for short URL"
              width="200"
              height="200"
            />
          </div>
          <a 
            href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(shortUrl)}`}
            download={`qr-${stats.shortCode}.png`}
            style={{
              display: 'inline-block',
              marginTop: '16px',
              padding: '10px 20px',
              background: '#3b82f6',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
          >
            ⬇️ Download QR Code
          </a>
        </div>
      )} */}

      {/* Action Buttons */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Link to="/" className="home-btn">
          ← Create Another Short URL
        </Link>
        <button 
          onClick={fetchStats}
          style={{
            marginLeft: '12px',
            padding: '14px 32px',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#3b82f6',
            background: '#fff',
            border: '2px solid #3b82f6',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          🔄 Refresh Stats
        </button>
      </div>

      {/* Info Box */}
      {stats.clickCount === 0 && !stats.expired && (
        <div style={{
          background: '#eff6ff',
          border: '2px solid #3b82f6',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '24px',
          textAlign: 'center',
        }}>
          <p style={{ color: '#1e40af', fontSize: '0.875rem', margin: 0 }}>
            💡 <strong>No clicks yet!</strong> Share your short URL to start tracking engagement.
          </p>
        </div>
      )}
    </div>
  );
};

export default Stats;