import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/global.css";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const isValidUrl = (value) => {
    try {
      const urlObj = new URL(value);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setShortUrl("");
    setShortCode("");
    setCopied(false);

    if (!url.trim()) {
      setError("URL cannot be empty");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (must include http:// or https://)");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/v1/urls", {
        originalUrl: url.trim(),
      });

      const fixedShortUrl = res.data.shortUrl.replace('localhost:5173', 'localhost:8080');
      setShortUrl(fixedShortUrl);
      
      // Extract short code from URL
      const code = res.data.shortUrl.split('/').pop();
      setShortCode(code);
      
      setUrl(""); // reset input after success
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Server error occurred");
      } else if (err.request) {
        setError("Unable to connect to server. Please check if the backend is running.");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // Clipboard access denied or not available
    }
  };

  return (
    <div className="page-container">
      <h1 className="title">🔗 URL Shortener</h1>
      <p className="subtitle">Transform long URLs into short, shareable links</p>

      <form onSubmit={handleSubmit} className="url-form">
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
            disabled={loading}
            autoFocus
          />
          {!url && (
            <button
              type="button"
              onClick={handlePaste}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '0.875rem',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f3f4f6';
                e.target.style.color = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              📋 Paste
            </button>
          )}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? (
            <>
              <span style={{ display: 'inline-block', marginRight: '8px' }}>⏳</span>
              Creating...
            </>
          ) : (
            <>
              <span style={{ display: 'inline-block', marginRight: '8px' }}>✨</span>
              Shorten URL
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="error-text">
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}

      {shortUrl && (
        <div className="result-box">
          <p className="result-label">✅ Your Short URL is Ready!</p>

          <a 
            href={shortUrl} 
            target="_blank" 
            rel="noreferrer noopener" 
            className="short-link"
            title="Click to open in new tab"
          >
            {shortUrl}
          </a>

          <div className="button-group">
            <button 
              onClick={copyToClipboard} 
              className="copy-btn"
              title="Copy to clipboard"
            >
              {copied ? "✓ Copied!" : "📋 Copy Link"}
            </button>

            <Link 
              to={`/stats/${shortCode}`} 
              className="stats-btn"
              title="View analytics"
            >
              📊 View Stats
            </Link>
          </div>

          {/* QR Code Section */}
          {/* <div className="qr-section">
            <h3>📱 QR Code</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '16px' }}>
              Scan to share your short link
            </p>
            <div className="qr-code">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`}
                alt="QR Code"
                width="200"
                height="200"
              />
            </div>
            <a 
              href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(shortUrl)}`}
              download={`qr-${shortCode}.png`}
              style={{
                display: 'inline-block',
                marginTop: '16px',
                padding: '8px 16px',
                background: '#f3f4f6',
                color: '#3b82f6',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#3b82f6';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f3f4f6';
                e.target.style.color = '#3b82f6';
              }}
            >
              ⬇️ Download QR Code
            </a>
          </div> */}
        </div>
      )}

      {/* Features Info Section */}
      {!shortUrl && !loading && (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          borderRadius: '12px', 
          padding: '32px',
          marginTop: '40px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '24px', 
            textAlign: 'center',
            color: '#111827'
          }}>
            Why Use Our URL Shortener?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⚡</div>
              <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: '#111827' }}>
                Instant Generation
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Create short links in seconds
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📊</div>
              <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: '#111827' }}>
                Track Analytics
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Monitor clicks and engagement
              </p>
            </div>
            {/* <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📱</div>
              <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: '#111827' }}>
                QR Codes
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Generate QR codes automatically
              </p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;