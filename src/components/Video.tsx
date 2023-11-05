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
    let hls: Hls;

    if (video) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // iOS 기기에서 네이티브 m3u8 지원
        video.src = src;
        // 자동 재생을 위한 코드 추가
        video.play().catch((error) => console.error("Auto-play failed", error));
      } else if (Hls.isSupported()) {
        // Hls.js를 사용하는 경우
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video
            .play()
            .catch((error) => console.error("Auto-play failed", error));
        });
      } else {
        console.error("이 브라우저에서는 HLS를 지원하지 않습니다.");
      }
    }

    return () => {
      if (hls) {
        // HLS 인스턴스 정리
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
      loop
      style={{
        maxWidth: "100%",
        maxHeight: "450px",
        objectFit: "contain",
        width: "100%", // 비디오가 부모 요소의 폭을 꽉 채우도록 설정
        height: "auto", // 높이는 비디오의 비율에 따라 자동으로 설정
      }}
    />
  );
};

export default VideoPlayer;
