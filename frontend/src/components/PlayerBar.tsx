import { usePlayerStore } from "../store/usePlayerStore";
import { HiSpeakerXMark } from "react-icons/hi2";
import { HiSpeakerWave } from "react-icons/hi2";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";
import HiSpeakerLowWave from "../customIcons/HiSpeakerLowWave";

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
    /* h-24 y py-2 otorgan mayor espacio vertical para que los botones no queden al límite */
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-900 border-t border-zinc-800 px-4 py-2 flex items-center justify-between text-white z-50 shadow-2xl">
      {/* 1. SECCIÓN IZQUIERDA: Info de la canción */}
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

      {/* 2. SECCIÓN CENTRAL: Controles y barra de progreso */}
      <div className="flex flex-col items-center justify-center  w-2/4 max-w-sm my-auto">
        <div className="flex items-center gap-1.5">
          {/* Botón Anterior */}
          <button
            className="hover:bg-gray-500 text-black p-3 rounded-sm transition shadow flex items-center justify-center text- xl"
            aria-label="Canción anterior"
          >
            <TbPlayerTrackPrevFilled className="text-white hover:bg-gray-500" />
          </button>

          {/* Botón Play / Pause principal con holgura segura */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className=" hover:bg-gray-500 text-black p-3 rounded-sm transition shadow flex items-center justify-center text-2xl"
          >
            {isPlaying ? (
              <TbPlayerPauseFilled className="text-white" />
            ) : (
              <TbPlayerPlayFilled className="text-white"/>
            )}
          </button>

          {/* Botón Siguiente */}
          <button
            className= "hover:bg-gray-500 text-black p-3 rounded-sm transition shadow flex items-center justify-center text- xl"

            aria-label="Siguiente canción"
          >
            <TbPlayerTrackNextFilled className="text-white" />
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

      {/* 3. SECCIÓN DERECHA: Volumen */}
      <div className="flex items-center justify-end gap-2.5 w-1/4">
        <button
          onClick={toggleVolume}
          className="text-zinc-400 hover:text-white transition text-sm"
          aria-label="Silenciar"
        >
          {isMuted || volume === 0 ? (
            <HiSpeakerXMark />
          ) : volume > 60 ? (
            <HiSpeakerWave />
          ) : (
            <HiSpeakerLowWave />
          )}
        </button>

        <input
          type="range"
          min={0}
          max={100}
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, white ${isMuted ? 0 : volume}%, #3f3f46 ${isMuted ? 0 : volume}%)`,
          }}
          className="w-20 h-1 rounded-lg appearance-none cursor-pointer accent-white transition-all"
        />
      </div>
    </footer>
  );
};

export default PlayerBar;
