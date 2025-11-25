import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const audioRef = useRef();

  const handlePlay = () => audioRef.current.play();
  const handlePause = () => audioRef.current.pause();
  const handleNext = () => {
    const idx = playlist.findIndex((track) => track === currentTrack);
    if (idx < playlist.length - 1) setCurrentTrack(playlist[idx + 1]);
  };

  const toggleMode = () => setDarkMode(!darkMode);

  const filteredPlaylist = playlist.filter((track, i) =>
    `Track ${i + 1}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <header className="header">
        <h1>🎵 Music Player</h1>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search track..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="mode-btn" onClick={toggleMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="main">
        {/* Playlist */}
        <aside className="playlist">
          <h2>Playlist</h2>
          <input
            type="file"
            onChange={(e) => {
              const file = URL.createObjectURL(e.target.files[0]);
              setPlaylist([...playlist, file]);
              if (!currentTrack) setCurrentTrack(file);
            }}
          />
          <ul>
            {filteredPlaylist.map((track, i) => (
              <li key={i} onClick={() => setCurrentTrack(track)}>
                Track {i + 1}
              </li>
            ))}
          </ul>
        </aside>

        {/* Player */}
        <section className="player">
          {currentTrack ? (
            <>
              <div className="album-art">🎶</div>
              <p className="track-info">
                Now Playing: Track {playlist.indexOf(currentTrack) + 1}
              </p>
              <audio ref={audioRef} src={currentTrack} controls />
              <div className="buttons">
                <button onClick={handlePlay}>▶ Play</button>
                <button onClick={handlePause}>⏸ Pause</button>
                <button onClick={handleNext}>⏭ Next</button>
              </div>
            </>
          ) : (
            <p>No track selected</p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Music Player | Built with React</p>
      </footer>
    </div>
  );
}

export default App;
