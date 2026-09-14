import React from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const SongCard = () => {
  const { currentSong } = usePlayerStore();

  return (
    <div>
      <div>
        <img src={currentSong?.pictureUrl} />
      </div>
      <div>
        <h4>{currentSong?.title || "NOT FOUND"}</h4>
        <p>{currentSong?.uploadedBy || "NOT FOUND"}</p>
      </div>
    </div>
  );
};

export default SongCard;
