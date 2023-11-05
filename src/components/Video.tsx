// components/VideoPlayer.tsx
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string; // m3u8 파일의 URL
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls: any; // hls 인스턴스를 저장하기 위한 변수를 정의합니다.

    if (video) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else if (Hls.isSupported()) {
        hls = new Hls(); // 여기에서 hls 인스턴스를 생성합니다.
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else {
        console.error("이 브라우저에서는 HLS를 지원하지 않습니다.");
      }
    }

    return () => {
      if (hls) {
        // Clean up the HLS instance
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      style={{ maxWidth: "100%", maxHeight: "450px", objectFit: "contain" }}
    />
  );
};

export default VideoPlayer;
