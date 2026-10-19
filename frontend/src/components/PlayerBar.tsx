import React from "react";
import { usePlayerStore } from "../store/usePlayerStore";
import { HiSpeakerXMark } from "react-icons/hi2";
import { HiSpeakerWave } from "react-icons/hi2";
import  HiSpeakerLowWave  from  "../customIcons/HiSpeakerLowWave"


const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
};

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

  const duration = currentSong?.duration || 100;
  const progressPercentage = (progress / duration) * 100;

  return (
    /* Reducimos la altura de h-24 a h-20 (o h-18) y compactamos los paddings */
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-zinc-800 px-4 flex items-center justify-between text-white z-50 shadow-2xl">
      
      {/* 1. SECCIÓN IZQUIERDA: Info de la canción más compacta */}
      <div className="flex items-center gap-3 w-1/4 min-w-[160px]">
        {currentSong ? (
          <>
            <img 
              src={currentSong.pictureUrl} 
              alt={currentSong.title} 
              className="w-12 h-12 rounded object-cover shadow" 
            />
            <div className="overflow-hidden">
              <p className="font-medium text-xs truncate hover:underline cursor-pointer">
                {currentSong.title}
              </p>
              <p className="text-[11px] text-zinc-400 truncate hover:underline cursor-pointer">
                {currentSong.uploadedBy}
              </p>
            </div>
          </>
        ) : (
          <p className="text-xs text-zinc-500 italic">Empty</p>
        )}
      </div>

      {/* 2. SECCIÓN CENTRAL: Controles y barra de progreso reducidos */}
      <div className="flex flex-col items-center gap-1.5 w-2/4 max-w-sm">
        <div className="flex items-center gap-4">
          {/* Botón Anterior */}
          <button 
            className="text-zinc-400 hover:text-white transition"
            aria-label="Canción anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
            </svg>
          </button>

          {/* Botón Play / Pause principal más pequeño */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition shadow flex items-center justify-center"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            )}
          </button>

          {/* Botón Siguiente */}
          <button 
            className="text-zinc-400 hover:text-white transition"
            aria-label="Siguiente canción"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
            </svg>
          </button>
        </div>

        {/* Barra de progreso compacta */}
        <div className="w-full flex items-center gap-2 text-[10px] text-zinc-400">
          <span className="tabular-nums">{formatTime(progress)}</span>

          <div className="relative group cursor-pointer flex items-center w-full h-3">
            <div className="w-full bg-zinc-700 rounded-full overflow-hidden h-1 group-hover:h-1.5 transition-all">
              <div 
                className="bg-white h-full rounded-full group-hover:bg-red-500 transition-colors" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            <div 
              className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ left: `${progressPercentage}%` }}
            />

            <input
              type="range"
              min={0}
              max={duration}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. SECCIÓN DERECHA: Volumen más estilizado y compacto */}
<div className="flex items-center justify-end gap-2.5 w-1/4">
  <button 
    onClick={toggleVolume} 
    className="text-zinc-400 hover:text-white transition text-sm"
    aria-label="Silenciar"
  >
    {isMuted || volume === 0 ? (<HiSpeakerXMark />) : (volume > 60 ? (<HiSpeakerWave />) : (<HiSpeakerLowWave/>))}
  </button> 
  
  <input
    type="range"
    min={0}
    max={100}
    value={isMuted ? 0 : volume}
    onChange={(e) => setVolume(Number(e.target.value))}
    style={{
      background: `linear-gradient(to right, white ${isMuted ? 0 : volume}%, #3f3f46 ${isMuted ? 0 : volume}%)`
    }}
    className="w-20 h-1 rounded-lg appearance-none cursor-pointer accent-white transition-all"
  />
</div>
    </footer>
  );
};

export default PlayerBar;