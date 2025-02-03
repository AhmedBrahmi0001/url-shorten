import React, { useState } from "react";
import "./App.css";
import { shortenUrl } from "./api";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await shortenUrl(url);
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error("Failed to shorten URL");
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
