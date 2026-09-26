'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { HeroCollection } from './heroData';

// Start the crossfade this long before a clip ends so the outgoing video is still moving.
const FINISH_LEAD_SECONDS = 1;

type Props = { item: HeroCollection; state: 'active' | 'leaving'; onFinish?: () => void };

export default function HeroMedia({ item, state, onFinish }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finished = useRef(false);
  const [playing, setPlaying] = useState(false);

  function checkFinish(video: HTMLVideoElement) {
    if (state !== 'active' || !onFinish || finished.current || !video.duration) return;
    if (video.ended || video.duration - video.currentTime <= FINISH_LEAD_SECONDS) {
      finished.current = true;
      onFinish();
    }
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (state !== 'active') return;
    finished.current = false;
    // Re-activated near its end (quick back-and-forth): restart rather than advancing instantly.
    if (video.duration && video.duration - video.currentTime <= FINISH_LEAD_SECONDS * 1.5) video.currentTime = 0;
    if (!document.hidden) {
      video.play().catch(() => { /* poster remains visible if autoplay is blocked */ });
    }
  }, [state, item.video]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (state !== 'active') return;
      else video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [state]);

  return <div className={`ch-media-layer ${item.video ? 'has-video' : 'has-image'} is-${state}`} aria-hidden={state === 'leaving'}>
    {item.video ? <><Image className="ch-video-poster" src={item.fallbackImage} alt="" fill priority={item.number === '01'} unoptimized /><video
      ref={videoRef}
      className={playing ? 'is-playing' : ''}
      autoPlay={state === 'active'}
      muted
      loop={!onFinish}
      playsInline
      preload={state === 'active' ? 'auto' : 'metadata'}
      poster={item.fallbackImage}
      aria-label={`${item.label.toLowerCase()} cinematic collection film`}
      onPlaying={() => setPlaying(true)}
      onTimeUpdate={event => checkFinish(event.currentTarget)}
      onEnded={event => checkFinish(event.currentTarget)}
    ><source src={item.video} type="video/mp4" /></video></> : <Image
      src={item.fallbackImage}
      alt={`${item.label.toLowerCase()} from the RZO Fashion new collection`}
      fill
      priority={item.number === '01'}
      sizes="(max-width: 768px) 100vw, 60vw"
      style={{ objectPosition: item.objectPosition }}
    />}
  </div>;
}
