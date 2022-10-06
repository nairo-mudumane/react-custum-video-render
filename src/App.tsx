import React, { useRef, useState } from "react";
import { VIDEO_POSTER, VIDEO_URL } from "./config";
import { useVideoPlay } from "./useVideoPlay";

function App() {
  // HTMLVideoElement

  const video = useRef<HTMLVideoElement | null>(null);

  const { playerState, toggleVideoPlay, onTimeUpdate, onTimeManuallyChange } =
    useVideoPlay({
      video,
    });

  return (
    <div className="mt-[6rem] mx-auto w-[600px] h-[300px] relative">
      <video
        ref={video}
        className="bg-black !w-full !h-full absolute"
        controls={false}
        poster={VIDEO_POSTER}
        onTimeUpdate={onTimeUpdate}
      >
        <source
          className="absolute !w-full !h-full"
          src={VIDEO_URL}
          type="video/mp4"
        />
      </video>

      <div className="absolute bottom-0 w-full py-2 px-4 text-white bg-[rgba(0,0,0,0.5)]">
        <div className="w-full h-full flex items-center justify-between">
          <button onClick={toggleVideoPlay}>
            {playerState.playing ? "pause" : "play"}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.currentPercentage}
            onChange={onTimeManuallyChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
