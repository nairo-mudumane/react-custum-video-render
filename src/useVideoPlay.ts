import React, { useEffect, useState } from "react";
import { useVideoPlayProps } from "./types";

export function useVideoPlay({ video: videoRef }: useVideoPlayProps) {
  const { current: video } = videoRef;

  const [playerState, setPlayerState] = useState({
    playing: false,
    currentPercentage: 0,
  });

  const toggleVideoPlay = () => {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  };

  const onTimeUpdate = () => {
    if (video) {
      const currentPercentage = (video.currentTime / video.duration) * 100;
      setPlayerState({
        ...playerState,
        currentPercentage,
      });
    }
  };

  const onTimeManuallyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (video) {
      const currentPercentage = Number(event.target.value);
      video.currentTime = (video.duration / 100) * currentPercentage;
      setPlayerState({
        ...playerState,
        currentPercentage,
      });
    }
  };

  useEffect(() => {
    playerState.playing ? video?.play() : video?.pause();
  }, [playerState.playing, video]);

  return {
    playerState,
    toggleVideoPlay,
    onTimeUpdate,
    onTimeManuallyChange,
  };
}
