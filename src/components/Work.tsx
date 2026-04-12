"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import AlbumCard from "./AlbumCard";

/* ─── Album data — add new albums here ─── */
interface Album {
  id: string;
  src: string;
  title: string;
  /** Longer title shown in the featured display; falls back to title */
  displayTitle?: string;
  artist?: string;
  /** Direct audio URL (Cloudinary). Upload .wav, reference as .mp3 for auto-transcode. */
  audio?: string;
  /** External link (SoundCloud, Spotify, etc.) — used when no direct audio */
  externalUrl?: string;
  links?: { spotify?: string; apple?: string; youtube?: string; soundcloud?: string };
}

const albums: Album[] = [
  /*
   * ── HOW TO ADD ITEMS ──
   *
   * Albums (external platforms only — no direct audio):
   *   { id: "album-1", src: "https://res.cloudinary.com/.../cover.jpg", title: "My Album",
   *     links: { spotify: "https://open.spotify.com/...", apple: "https://music.apple.com/...", youtube: "https://youtube.com/..." } },
   *
   * Demos (direct .wav upload to Cloudinary — change extension to .mp3 in the URL):
   *   { id: "demo-1", src: "https://res.cloudinary.com/.../cover.jpg", title: "Demo Track",
   *     audio: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v.../my_demo.mp3" },
   *
   * Mixtapes (hosted on SoundCloud):
   *   { id: "mixtape-1", src: "https://res.cloudinary.com/.../cover.jpg", title: "Mixtape Vol. 1",
   *     externalUrl: "https://soundcloud.com/..." },
   */
  {
    id: "album-1",
    src: "/Knossos.JPG",
    title: "Risible",
    artist: "Santiago",
    audio: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1776007340/Laugh_Smile_-_Santiago_v4_MSTR_wzkxlw.wav",
  },
  {
    id: "album-2",
    src: "/Knossos.JPG",
    title: "Fire Exit",
    artist: "Santiago, Jivan Calderone, Max Stipanovich",
    audio: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774368303/Fire_Exit_MASTER_nsk8ap.wav",
  },
  {
    id: "album-3",
    src: "/Knossos.JPG",
    title: "Phonic",
    artist: "Santiago",
    audio: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774369045/Phonic_v3_MASTER_uqczo5.wav",
  },
  {
    id: "album-4",
    src: "/Knossos.JPG",
    title: "Limbic",
    artist: "Santiago",
    audio: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774369548/Santiago_-_Groover_Master_bfwxkx.wav",
  },
  {
    id: "album-5",
    src: "/Knossos.JPG",
    title: "Quaternary",
    artist: "Santiago",
    audio: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1776006931/Quaternary_tf0oyn.mp3",
  },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Work() {
  const [activeId, setActiveId] = useState(albums[0].id);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldAutoPlayRef = useRef(false);

  const activeAlbum = albums.find((a) => a.id === activeId)!;
  const hasAudio = !!activeAlbum.audio;

  const selectAlbum = useCallback((id: string) => {
    const album = albums.find((a) => a.id === id);
    shouldAutoPlayRef.current = !!album?.audio;
    setActiveId(id);
    setProgress(0);
    setPlaying(false);
  }, []);

  // Sync <audio> element with active album
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeAlbum.audio) {
      audio.src = activeAlbum.audio;
      audio.load();
    } else {
      audio.removeAttribute("src");
      audio.load();
    }
    setDuration(0);
    setProgress(0);

    if (shouldAutoPlayRef.current) {
      shouldAutoPlayRef.current = false;
      setPlaying(true);
    }
  }, [activeAlbum.audio]);

  // Play / pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, hasAudio]);

  // Time updates from the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncDuration = () => {
      if (audio.duration && isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const onTimeUpdate = () => {
      syncDuration();
      if (audio.duration && isFinite(audio.duration)) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("canplay", syncDuration);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
      audio.removeEventListener("canplay", syncDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const currentTime = hasAudio ? progress * duration : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasAudio) return;
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setProgress(ratio);
  };

  const togglePlay = () => {
    if (!hasAudio && activeAlbum.externalUrl) {
      window.open(activeAlbum.externalUrl, "_blank", "noopener");
      return;
    }
    if (hasAudio) setPlaying((p) => !p);
  };

  const activeLinks = activeAlbum.links || {};

  return (
    <section id="work" className="relative min-h-screen lg:h-screen px-4 lg:px-6 pt-8 pb-8 flex flex-col items-center lg:flex-row lg:items-stretch overflow-hidden" style={{ background: "#1a1a1a" }}>
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto" />

      {/* Top-left — secondary text (desktop only) */}
      <p className="hidden lg:block absolute top-8 left-6 max-w-sm text-base leading-relaxed text-neutral-400">
        The records tell part of the story. This is where the rest of it
        lives — rough cuts, live recordings, and whatever&apos;s being
        worked on right now. It won&apos;t sound the same next time
        you&apos;re here.
      </p>

      {/* Left — Bottom-aligned heading + paragraph (desktop only) */}
      <div className="hidden lg:flex w-1/3 flex-col justify-end pb-8">
        <h2 className="text-8xl font-medium uppercase leading-[0.9] tracking-tight text-white">
          WORK
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-400">
          The records tell part of the story. This is where the rest of it
          lives — rough cuts, live recordings, and whatever&apos;s being
          worked on right now. It won&apos;t sound the same next time
          you&apos;re here.
        </p>
      </div>

      {/* Mobile-only heading + paragraph */}
      <div className="lg:hidden text-center mb-6">
        <h2 className="text-2xl font-medium uppercase tracking-tight text-white">
          WORK
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400 px-4">
          The records tell part of the story. This is where the rest of it
          lives — rough cuts, live recordings, and whatever&apos;s being
          worked on right now. It won&apos;t sound the same next time
          you&apos;re here.
        </p>
      </div>

      {/* Right — Featured + shelf */}
      <div className="w-full lg:w-2/3 flex flex-col items-center mt-16 lg:mt-0 lg:flex-row lg:items-center lg:justify-end lg:gap-10 lg:pt-16">
        {/* Featured display + controls */}
        <div className="flex-shrink-0 flex flex-col w-full max-w-[220px] lg:max-w-none lg:w-[420px]">
          {/* Album display */}
          <div className="relative aspect-square">
            {albums.map((album) => (
              <motion.div
                key={album.id}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: album.id === activeId ? 1 : 0,
                  scale: album.id === activeId ? 1 : 0.9,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ pointerEvents: album.id === activeId ? "auto" : "none" }}
              >
                <AlbumCard
                  src={album.src}
                  title={album.title}
                  size="large"
                  active={album.id === activeId}
                  spinning={playing && album.id === activeId}
                />
              </motion.div>
            ))}
          </div>

          {/* Title + artist — left-aligned */}
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-sm font-medium uppercase tracking-tight text-white">
              {activeAlbum.displayTitle ?? activeAlbum.title}
            </p>
            {activeAlbum.artist && (
              <p className="text-sm tracking-tight text-neutral-400">
                {activeAlbum.artist}
              </p>
            )}
          </div>

          {/* Playback controls row */}
          <div className="mt-2 flex items-center gap-3">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="flex-shrink-0 cursor-pointer text-white hover:text-neutral-400 transition-colors"
              title={!hasAudio && activeAlbum.externalUrl ? "Open on SoundCloud" : undefined}
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="2" width="4" height="12" rx="1" />
                  <rect x="9" y="2" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              )}
            </button>

            {/* Current time */}
            <span className="flex-shrink-0 text-xs tabular-nums text-neutral-500 w-8">
              {formatTime(currentTime)}
            </span>

            {/* Progress bar */}
            <div
              className={`flex-1 relative h-1 bg-neutral-700 rounded-full group/bar ${hasAudio ? "cursor-pointer" : "cursor-default"}`}
              onClick={handleProgressClick}
            >
              <div
                className="absolute left-0 top-0 h-full bg-white rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
              {hasAudio && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity"
                  style={{ left: `${progress * 100}%`, marginLeft: -5 }}
                />
              )}
            </div>

            {/* Total time */}
            <span className="flex-shrink-0 text-xs tabular-nums text-neutral-500 w-8 text-right">
              {formatTime(duration)}
            </span>

            {/* Per-album links — only show icons that have URLs */}
            <div className="flex-shrink-0 flex items-center gap-2 ml-1">
              {activeLinks.spotify && (
                <a href={activeLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </a>
              )}
              {activeLinks.apple && (
                <a href={activeLinks.apple} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </a>
              )}
              {activeLinks.youtube && (
                <a href={activeLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {(activeAlbum.externalUrl || activeLinks.soundcloud) && (
                <a href={activeAlbum.externalUrl || activeLinks.soundcloud} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.038.104-.094l.209-1.282-.209-1.332c-.014-.057-.047-.094-.104-.094m1.794-1.563c-.063 0-.107.055-.116.116l-.214 2.873.214 2.762c.009.063.053.116.116.116.065 0 .107-.053.118-.116l.24-2.762-.24-2.873c-.011-.062-.053-.116-.118-.116m.893-.502c-.076 0-.12.063-.13.132l-.2 3.376.2 3.225c.01.071.054.132.13.132.074 0 .12-.061.131-.132l.226-3.225-.226-3.376c-.011-.069-.057-.132-.131-.132m.921-.329c-.074 0-.13.072-.14.148l-.186 3.706.186 3.451c.01.077.066.148.14.148.076 0 .131-.071.142-.148l.208-3.451-.208-3.706c-.011-.076-.066-.148-.142-.148m.947-.18c-.086 0-.143.078-.152.162l-.174 3.886.174 3.584c.009.085.066.162.152.162.085 0 .143-.077.153-.162l.197-3.584-.197-3.886c-.01-.084-.068-.162-.153-.162m.976-.263c-.098 0-.155.088-.164.178l-.16 4.15.16 3.727c.009.09.066.178.164.178.096 0 .155-.088.165-.178l.18-3.727-.18-4.15c-.01-.09-.069-.178-.165-.178m1.392-.464c-.109 0-.167.095-.176.195l-.146 4.614.146 3.858c.009.098.067.195.176.195.108 0 .166-.097.177-.195l.162-3.858-.162-4.614c-.011-.1-.069-.195-.177-.195m.557-.028c-.006 0-.013.001-.019.002-.105 0-.175.103-.184.207l-.134 4.642.134 3.857c.009.105.079.207.184.207l.018.002c.107 0 .176-.103.186-.209l.15-3.857-.15-4.642c-.01-.106-.079-.207-.186-.207m1.005-.037c-.118 0-.188.108-.197.222l-.121 4.679.121 3.843c.009.114.079.222.197.222.116 0 .187-.108.197-.222l.136-3.843-.136-4.679c-.01-.114-.081-.222-.197-.222m1.001.144c-.13 0-.199.12-.208.238l-.109 4.535.109 3.82c.009.12.078.238.208.238.128 0 .198-.118.209-.238l.12-3.82-.12-4.535c-.011-.118-.081-.238-.209-.238m2.228-1.596c-.02-.012-.044-.019-.069-.019-.032 0-.061.011-.084.029-.028.022-.047.054-.051.092l-.092 5.96.092 3.755c.004.038.023.07.051.093.023.018.052.029.084.029.025 0 .049-.007.069-.019.043-.025.072-.068.076-.12l.103-3.738-.103-5.96c-.004-.052-.033-.095-.076-.12m-1.14.582c-.14 0-.21.125-.22.254l-.096 5.124.096 3.792c.01.129.08.254.22.254.139 0 .21-.125.221-.254l.109-3.792-.109-5.124c-.011-.129-.082-.254-.221-.254m2.227-1.39c-.03-.017-.063-.026-.098-.026-.038 0-.073.012-.103.033-.041.029-.066.075-.072.128l-.074 6.249.074 3.704c.006.053.031.099.072.128.03.021.065.033.103.033.035 0 .068-.009.098-.026.05-.031.08-.082.086-.142l.082-3.697-.082-6.249c-.006-.06-.036-.111-.086-.142m1.08-.9c-.048-.028-.102-.044-.158-.044-.056 0-.11.016-.158.044-.073.046-.12.126-.126.217l-.064 7.149.064 3.66c.006.091.053.171.126.217.048.028.102.044.158.044.056 0 .11-.016.158-.044.073-.046.12-.126.126-.217l.072-3.66-.072-7.149c-.006-.091-.053-.171-.126-.217m1.806-.291c-.065 0-.126.019-.178.054-.087.058-.143.157-.149.27l-.052 7.44.052 3.627c.006.114.062.213.149.27.052.035.113.054.178.054.065 0 .126-.019.178-.054.087-.058.143-.157.149-.27l.058-3.627-.058-7.44c-.006-.113-.062-.212-.149-.27-.052-.035-.113-.054-.178-.054m1.83-.425c-.066 0-.13.019-.186.055-.094.06-.155.163-.161.281l-.04 7.865.04 3.597c.006.118.067.221.161.281.056.036.12.055.186.055.068 0 .132-.019.188-.055.094-.06.155-.163.161-.281l.047-3.597-.047-7.865c-.006-.118-.067-.221-.161-.281-.056-.036-.12-.055-.188-.055m1.141 1.048c-.101.064-.167.177-.173.305l-.028 6.512.028 3.563c.006.128.072.241.173.305.06.038.13.06.202.06.073 0 .142-.022.202-.06.101-.064.167-.177.173-.305l.033-3.563-.033-6.512c-.006-.128-.072-.241-.173-.305-.06-.038-.13-.06-.202-.06-.073 0-.142.022-.202.06m2.92-2.41c-.022-.012-.047-.019-.073-.019-.024 0-.047.006-.068.017l-.009.005c-.032.02-.055.052-.063.09l-.009 9.329.009 3.523c.003.028.014.052.031.071l.012.012c.019.017.044.028.072.03l.012.001c.024 0 .046-.007.065-.018.035-.02.06-.057.064-.1l.009-3.519-.009-9.329c-.004-.043-.029-.08-.064-.1m-1.178.67c-.108.068-.178.188-.184.322l-.017 8.327.017 3.543c.006.134.076.254.184.322.065.042.14.065.217.065.078 0 .152-.023.217-.065.108-.068.178-.188.184-.322l.02-3.543-.02-8.327c-.006-.134-.076-.254-.184-.322-.065-.042-.14-.065-.217-.065-.078 0-.152.023-.217.065"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Shelf — album list with dots */}
        <div className="flex flex-row gap-2 mt-6 justify-center scale-75 lg:scale-100 lg:flex-col lg:gap-12 lg:mt-0 flex-shrink-0">
          {albums.map((album) => (
            <motion.button
              key={album.id}
              onClick={() => selectAlbum(album.id)}
              className="cursor-pointer flex items-center gap-3"
              animate={{
                opacity: album.id === activeId ? 1 : 0.5,
                scale: album.id === activeId ? 1.05 : 1,
              }}
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.3 }}
            >
              <AlbumCard src={album.src} title={album.title} size="small" />
              <span
                className="hidden lg:block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: album.id === activeId ? "#ffffff" : "#555555" }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
