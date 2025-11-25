import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef();

  const handlePlay = () => audioRef.current.play();
  const handlePause = () => audioRef.current.pause();
  const handleNext = () => {
    const idx = playlist.findIndex((track) => track === currentTrack);
    if (idx < playlist.length - 1) setCurrentTrack(playlist[idx + 1]);
  };

  const toggleMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <header className="header">
        <h1>🎵 Music Player</h1>
        <button className="mode-btn" onClick={toggleMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Main Section */}
      <main className="main">
        <div className="upload-section">
          <input
            type="file"
            onChange={(e) => {
              const file = URL.createObjectURL(e.target.files[0]);
              setPlaylist([...playlist, file]);
              if (!currentTrack) setCurrentTrack(file);
            }}
          />
        </div>

        {currentTrack && (
          <div className="player-controls">
            <audio ref={audioRef} src={currentTrack} controls />
            <div className="buttons">
              <button onClick={handlePlay}>▶ Play</button>
              <button onClick={handlePause}>⏸ Pause</button>
              <button onClick={handleNext}>⏭ Next</button>
            </div>
          </div>
        )}

        <div className="playlist">
          <h2>Playlist</h2>
          <ul>
            {playlist.map((track, i) => (
              <li key={i} onClick={() => setCurrentTrack(track)}>
                Track {i + 1}
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Music Player | Built with React</p>
      </footer>
    </div>
  );
}
export default App;