import { create } from "zustand";

interface IMusic {
  id: string;
  uploadedBy: string;
  title: string;
  duration: number;
  like: string;
  views: number;
  pictureUrl: string;
  audioUrl: string;
  createDate: Date;
}

interface IPlayerState {
    currentSong: IMusic | null,
    isPlaying: boolean,
    isRepeating: boolean,
    isMuted: boolean,
    volume: number,
    progress: number

    setCurrentSong: (song: IMusic) => void;
    toggleVolume: () => void;
    togglePlay: ()=>void;
    togglePause: ()=> void;
    setVolume: (volume:number) => void;
    setProgress: (progress: number) =>void;
}

export const usePlayerStore = create<IPlayerState>((set) => ({
    currentSong: null,
    isPlaying: false,
    isRepeating:false,
    isMuted:false,
    volume: 60,
    progress: 0,

    setCurrentSong: (song) => set({
        currentSong: song,
        isPlaying: true,
    }),

    togglePlay: ()=> set ((state) => ({
        isPlaying: !state.isPlaying,
    })),

    togglePause: ()=> set ({
        isPlaying: false
    }),

    toggleVolume: ()=> set((state) =>({
        isMuted: !state.isMuted
    })),

    setVolume: (volume)=> set ({
        volume,
        isMuted: volume === 0
    }),

    setProgress: (progress) => set ({
        progress
    })
}))