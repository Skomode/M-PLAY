import React from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    progress,
    togglePlay,
    toggleVolume,
    setVolume,
    setProgress,
  } = usePlayerStore();

  return (
    <footer>
      <div>
        {currentSong ? (
          <>
            <img src={currentSong.pictureUrl} />
            <div></div>
          </>
        ) : (
          <p>Selecciona una cancion</p>
        )}
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={currentSong?.duration || 100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
        />
        <span>
          {currentSong
            ? `${Math.floor(currentSong.duration / 60)}:${String(currentSong.duration % 60).padStart(2, "0")}`
            : "0:00"}
        </span>
      </div>

      <div>
        <div>
          <button>previous</button>
        </div>
        <div>
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "pause" : "continue"}
          >
            {isPlaying ? "pause" : "play"}
          </button>
        </div>

        <div>
          <button>next</button>
        </div>

        <div>
          <button onClick={toggleVolume}>
            {isMuted || volume === 0 ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;
