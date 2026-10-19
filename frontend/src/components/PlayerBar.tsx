
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
  const effectiveVolume = isMuted ? 0 : volume;

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-900 border-t border-zinc-800 px-4 py-2 flex items-center justify-between text-white z-50 shadow-2xl">
      {/* Info de la canción */}
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
      <div className="flex flex-col items-center justify-center w-2/4 max-w-sm my-auto">
        <div className="flex items-center gap-1.5">
          {/* Botón Anterior */}
          <button
            className="hover:bg-zinc-700 text-black p-3 rounded-sm transition shadow flex items-center justify-center text-sm"
            aria-label="Canción anterior"
          >
            <TbPlayerTrackPrevFilled className="text-white" />
          </button>

          {/* Botón Play / Pause principal */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className="hover:bg-zinc-700 text-black p-3 rounded-sm transition shadow flex items-center justify-center text-2xl"
          >
            {isPlaying ? (
              <TbPlayerPauseFilled className="text-white" />
            ) : (
              <TbPlayerPlayFilled className="text-white" />
            )}
          </button>

          {/* Botón Siguiente */}
          <button
            className="hover:bg-zinc-700 text-black p-3 rounded-sm transition shadow flex items-center justify-center text-sm"
            aria-label="Siguiente canción"
          >
            <TbPlayerTrackNextFilled className="text-white" />
          </button>
        </div>

        {/* Barra de progreso de la canción */}
        <div className="w-full flex items-center gap-2 text-[10px] text-zinc-400">
          <span className="tabular-nums">{formatTime(progress)}</span>

          <div className="relative group cursor-pointer flex items-center w-full h-3">
            <div className="w-full bg-zinc-700 rounded-full overflow-hidden h-1 group-hover:h-1.5 transition-all">
              <div
                className="bg-white h-full rounded-full group-hover:bg-white transition-colors"
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

      {/*. Volumen estilizado con capas */}
<div className="flex items-center justify-end gap-2.5 w-1/4">
  <button
    onClick={toggleVolume}
    aria-label="Silenciar"
    className={`p-2 rounded-md transition-colors flex items-center justify-center ${
      isMuted || volume === 0
        ? "bg-zinc-800 text-white shadow-inner"
        : "text-zinc-400 hover:text-white"
    }`}
  >
    {isMuted || volume === 0 ? (
      <HiSpeakerXMark className="text-base w-3.5 h-3.5" />
    ) : volume > 60 ? (
      <HiSpeakerWave className="w-3.5 h-3.5"/>
    ) : (
      <HiSpeakerLowWave className="w-3.5 h-3.5" />
    )}
  </button>

  {/* Contenedor de volumen en capas con la clase 'group' para el hover */}
  <div className="relative group cursor-pointer flex items-center w-20 h-5">
    
    {/* --- INDICADOR NUMÉRICO FLOTANTE (Aparece justo encima del punto al hacer hover) --- */}
    <div
      className="absolute -top-7 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-1.5 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 border border-zinc-700"
      style={{ left: `${effectiveVolume}%` }}
    >
      {effectiveVolume}
    </div>

    {/* Riel de fondo con la parte rellenada dinámica */}
    <div className="w-full bg-zinc-700 rounded-full overflow-hidden h-1 group-hover:h-1.5 transition-all">
      <div
        className="bg-white h-full rounded-full group-hover:bg-white transition-colors"
        style={{ width: `${effectiveVolume}%` }}
      />
    </div>

    {/* Círculo deslizante (Thumb) que aparece al hacer hover */}
    <div
      className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      style={{ left: `${effectiveVolume}%` }}
    />

    {/* Input de rango transparente superpuesto */}
    <input
      type="range"
      min={0}
      max={100}
      value={effectiveVolume}
      onChange={(e) => setVolume(Number(e.target.value))}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </div>
</div>
    </footer>
  );
};

export default PlayerBar;
