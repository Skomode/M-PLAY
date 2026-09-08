import React from 'react'
import { usePlayerStore } from '../store/usePlayerStore'


const PlayerBar = () => {

  const {currentSong, isPlaying, volume, isMuted, progress, togglePlay, toggleVolume, setVolume, setProgress } = usePlayerStore();

  return (
    <footer>
      
      <div>
        {currentSong ? (
        <>
          <img src={currentSong.pictureUrl} />
          <div>
          </div>
        </>
        ) : (<p>Selecciona una cancion</p>)}

      </div>


      <div>
      <button>previous</button>
      </div>
      <div>
      <button>Play</button>
      </div>
      <div>
      <button>next</button>
      </div>
      <div>
      <button>Repeat</button>
      </div>
      <div>
      <button>Volume</button>
      </div>

    </footer>
  )
}

export default PlayerBar
