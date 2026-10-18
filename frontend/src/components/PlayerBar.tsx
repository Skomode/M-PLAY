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
          <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
</svg>
</button>
        </div>
        <div>
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "pause" : "continue"}
          >

            {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
</svg>
}
          </button>
        </div>

        <div>
          <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>
</button>
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
