import { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState([]);

  const handleSubmit = () => {
    axios.post("http://localhost:3000/api/short", { originalUrl })
      .then((res) => {
        setShortUrl(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAnalytics = () => {
    axios.get("http://localhost:3000/api/analytics")
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1 className="heading">⭐ URL Shortener ⭐</h1>
        <input
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          type="text"
          placeholder=" Enter your URL here... "
          className="input-box"
        />
        <button onClick={handleSubmit} className="crazy-button">
          🚀 Shorten Now
        </button>

        {shortUrl && (
          <div className="short-url-box">
            <p className="short-url-text">Shortened URL:</p>
            <a href={shortUrl.shortUrl} target="_blank" rel="noopener noreferrer" className="short-url-link">
              {shortUrl.shortUrl}
            </a>
            {shortUrl.qrCodeImg && <img src={shortUrl.qrCodeImg} alt="Generated QR Code" className="qr-code" />}
          </div>
        )}

        {shortUrl && (
          <button onClick={fetchAnalytics} className="analytics-button">
            📊 Show Click Analytics
          </button>
        )}

        {analytics.length > 0 && (
          <div className="analytics-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Short URL</th>
                  <th>Original URL</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((url, index) => (
                  <tr key={index}>
                    <td>
                      <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                        {url.shortUrl}
                      </a>
                    </td>
                    <td>{url.originalUrl}</td>
                    <td>{url.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}