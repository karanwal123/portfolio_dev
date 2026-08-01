import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  Shuffle,
  Heart,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Music,
  ChevronDown,
} from "lucide-react";

// ── Hardcoded track data (from your "Drums please, Fab" playlist) ──
const TRACKS = [
  {
    name: "Selfless",
    artist: "The Strokes",
    album: "The New Abnormal",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273e3f1ba3de4659708c25d0f39",
    spotifyUri: "spotify:track:2t0wwvR15fc3K1ey8OiOaN",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/63/1a/8c/631a8c00-385a-ebc2-a7a3-2bba76b62dd0/mzaf_567507115470257818.plus.aac.p.m4a",
    duration: 30000,
  },
  {
    name: "Ode To The Mets",
    artist: "The Strokes",
    album: "The New Abnormal",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273e3f1ba3de4659708c25d0f39",
    spotifyUri: "spotify:track:1BLOVHYYlH4JUHQGcpt75R",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/f9/e8/ee/f9e8ee45-ecf4-c0b3-0791-caf1b56c5cff/mzaf_18062014156050835872.plus.aac.p.m4a",
    duration: 30000,
  },
  {
    name: "Reptilia",
    artist: "The Strokes",
    album: "Room On Fire",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b2730f35726025e0f025da4c688f",
    spotifyUri: "spotify:track:57Xjny5yNzAcsxnusKmAfA",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/dc/fd/e4/dcfde43f-2c21-0778-f32a-f4380293f74f/mzaf_10139901306940368873.plus.aac.p.m4a",
    duration: 30000,
  },
  {
    name: "Why Are Sundays So Depressing",
    artist: "The Strokes",
    album: "The New Abnormal",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273e3f1ba3de4659708c25d0f39",
    spotifyUri: "spotify:track:1aOxOpH4AkGAd8OMrKjyNY",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/db/ea/a4/dbeaa4d6-ac0c-a99b-cea3-326d0d91bf16/mzaf_8023085417680564781.plus.aac.p.m4a",
    duration: 30000,
  },
  {
    name: "Instant Crush",
    artist: "Daft Punk, Julian Casablancas",
    album: "Random Access Memories",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b2739b9b36b0e22870b9f542d937",
    spotifyUri: "spotify:track:2cGxRwrMyEAp8dEbuZaVv6",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/1a/3b/90/1a3b90d2-b984-b042-1822-e19f388524e0/mzaf_7080651603608009369.plus.aac.p.m4a",
    duration: 30000,
  },
  {
    name: "Not The Same Anymore",
    artist: "The Strokes",
    album: "The New Abnormal",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273e3f1ba3de4659708c25d0f39",
    spotifyUri: "spotify:track:5ncofiedz9Ej6YkvvXMKVn",
    audioUrl:
      "https://cdnt-preview.dzcdn.net/api/1/1/7/c/9/0/7c949bd10cfb702a44c94dbae7998933.mp3?hdnea=exp=1785571221~acl=/api/1/1/7/c/9/0/7c949bd10cfb702a44c94dbae7998933.mp3*~data=user_id=0,application_id=42~hmac=3bcafce8f5971c93c37fec770d5d8302604081645347bfd3ca5343ebc654aaaa",
    duration: 30000,
  },
  {
    name: "Brooklyn Bridge To Chorus",
    artist: "The Strokes",
    album: "The New Abnormal",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273e3f1ba3de4659708c25d0f39",
    spotifyUri: "spotify:track:2mDYYGaGd9uXKkK2YhDA3i",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/54/fb/a6/54fba699-f66c-fee0-4895-70c2e6969ea5/mzaf_11692190190689907843.plus.aac.p.m4a",
    duration: 30000,
  },
  {
    name: "At The Door",
    artist: "The Strokes",
    album: "The New Abnormal",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273e3f1ba3de4659708c25d0f39",
    spotifyUri: "spotify:track:7lu6YLrlB1MU7HW8DJSuPa",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c1/34/8b/c1348bff-996a-2341-6e9e-8fd89ac45989/mzaf_10172867369559483071.plus.aac.p.m4a",
    duration: 30000,
  },
  {
    name: "The Adults Are Talking",
    artist: "The Strokes",
    album: "The New Abnormal",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273e3f1ba3de4659708c25d0f39",
    spotifyUri: "spotify:track:5ruzrDWcT0vuJIOMW7gMnW",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c6/88/a9/c688a995-5b21-dba9-e6e7-eb5e708b0dda/mzaf_13451222908984221620.plus.aac.p.m4a",
    duration: 30000,
  },
  {
    name: "Eternal Summer",
    artist: "The Strokes",
    album: "The New Abnormal",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273e3f1ba3de4659708c25d0f39",
    spotifyUri: "spotify:track:6IRzBP4gVoV4D2zHmocoWy",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/42/8e/96/428e9624-cdaa-25bf-79e9-1f8d0f011923/mzaf_16881972936179244660.plus.aac.p.m4a",
    duration: 30000,
  },
];

// ── Helpers ──
const formatTime = (ms) => {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

// ── Reusable Win95-style beveled button ──
const Win95Btn = ({
  children,
  onClick,
  className = "",
  active = false,
  small = false,
  title = "",
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`
      ${small ? "px-1.5 py-0.5" : "px-2 py-1"}
      bg-[#c0c0c0] select-none cursor-pointer
      ${
        active
          ? "border-t-[#808080] border-l-[#808080] border-b-white border-r-white bg-[#b0b0b0]"
          : "border-t-white border-l-white border-b-[#808080] border-r-[#808080] hover:bg-[#d0d0d0]"
      }
      border-2 active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white
      ${className}
    `}
  >
    {children}
  </button>
);

// ── Spinning CD component ──
const SpinningCD = ({ isPlaying, albumArt }) => {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
      <div
        className={`w-full h-full rounded-full border-2 border-[#808080] overflow-hidden ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
        style={{
          background: `conic-gradient(from 0deg, #c0c0c0, #e8e8e8, #a0a0a0, #d0d0d0, #b0b0b0, #c0c0c0)`,
        }}
      >
        {/* CD inner ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#808080]">
            <img src={albumArt} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* CD center hole */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#808080]"></div>
        </div>
        {/* CD grooves */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, transparent 20%, rgba(0,0,0,0.03) 21%, transparent 22%, transparent 35%, rgba(0,0,0,0.03) 36%, transparent 37%, transparent 50%, rgba(0,0,0,0.03) 51%, transparent 52%, transparent 65%, rgba(0,0,0,0.03) 66%, transparent 67%)`,
          }}
        ></div>
      </div>
    </div>
  );
};

// ── Volume Control ──
const VolumeControl = ({ volume, onVolumeChange }) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <Win95Btn small onClick={() => onVolumeChange(Math.min(100, volume + 10))}>
        <span className="text-xs font-bold">+</span>
      </Win95Btn>
      {/* Volume bar */}
      <div className="w-4 h-16 sm:h-20 bg-[#808080] border border-[#404040] relative">
        <div
          className="absolute bottom-0 w-full bg-[#00aa00]"
          style={{ height: `${volume}%` }}
        ></div>
        {/* Notch lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-[#606060]"
            style={{ bottom: `${(i + 1) * 20}%` }}
          ></div>
        ))}
      </div>
      <Win95Btn small onClick={() => onVolumeChange(Math.max(0, volume - 10))}>
        <span className="text-xs font-bold">−</span>
      </Win95Btn>
    </div>
  );
};

// ── Progress Bar ──
const ProgressBar = ({ current, total, onSeek }) => {
  const pct = total > 0 ? (current / total) * 100 : 0;
  const barRef = useRef(null);

  const handleClick = (e) => {
    if (!barRef.current || !onSeek || total <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickPct = (e.clientX - rect.left) / rect.width;
    onSeek(Math.floor(clickPct * total));
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs font-mono text-black min-w-[32px]">
        {formatTime(current)}
      </span>
      <div
        ref={barRef}
        onClick={handleClick}
        className="flex-1 h-3 bg-[#808080] border border-[#404040] relative cursor-pointer"
      >
        <div className="h-full bg-[#000080]" style={{ width: `${pct}%` }}></div>
        {/* Thumb */}
        <div
          className="absolute top-[-2px] w-3 h-[calc(100%+4px)] bg-[#c0c0c0] border border-[#404040]"
          style={{ left: `calc(${Math.max(0, Math.min(100, pct))}% - 6px)` }}
        ></div>
      </div>
      <span className="text-xs font-mono text-black min-w-[32px] text-right">
        {formatTime(total)}
      </span>
    </div>
  );
};

// ── Main Retro Player Widget ──
const RetroPlayer = ({
  track,
  onPrev,
  onNext,
  onShuffle,
  isShuffled,
  isPlaying,
  progress,
  duration,
  onTogglePlay,
  onSeek,
  volume,
  onVolumeChange,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Window frame */}
      <div
        className="bg-[#c0c0c0] border-2"
        style={{
          borderColor: "white #808080 #808080 white",
          boxShadow: "2px 2px 0 #404040",
        }}
      >
        {/* Title bar */}
        <div className="bg-[#000080] px-2 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center">
              <Music size={10} className="text-black" />
            </div>
            <span className="text-white text-sm font-bold select-none tracking-wide">
              Song
            </span>
          </div>
          <div className="flex gap-0.5">
            <Win95Btn small className="!px-1 !py-0">
              <span className="text-[10px] font-bold leading-none">_</span>
            </Win95Btn>
            <Win95Btn small className="!px-1 !py-0">
              <span className="text-[10px] font-bold leading-none">□</span>
            </Win95Btn>
            <Win95Btn small className="!px-1 !py-0">
              <span className="text-[10px] font-bold leading-none">✕</span>
            </Win95Btn>
          </div>
        </div>

        {/* Player body */}
        <div className="p-3 sm:p-4">
          {/* Top section: Album art + Spinning CD */}
          <div className="flex gap-3 sm:gap-4 mb-3">
            {/* Album art */}
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 border-2 flex-shrink-0 overflow-hidden"
              style={{ borderColor: "#808080 white white #808080" }}
            >
              <img
                src={track.albumArt}
                alt={track.album}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side: CD */}
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 flex-1">
              <SpinningCD isPlaying={isPlaying} albumArt={track.albumArt} />
            </div>

            {/* Volume control */}
            <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
          </div>

          {/* Playback controls */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-3">
            <Win95Btn
              onClick={onTogglePlay}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause size={14} className="fill-black text-black" />
              ) : (
                <Play size={14} className="fill-black text-black ml-0.5" />
              )}
            </Win95Btn>
            <Win95Btn onClick={onShuffle} active={isShuffled} title="Shuffle">
              <Shuffle size={14} className="text-black" />
            </Win95Btn>
            <Win95Btn
              onClick={() => setLiked(!liked)}
              active={liked}
              title="Like"
            >
              <Heart
                size={14}
                className={liked ? "fill-red-600 text-red-600" : "text-black"}
              />
            </Win95Btn>
            <div className="w-2"></div>
            <Win95Btn onClick={onPrev} title="Previous">
              <SkipBack size={14} className="fill-black text-black" />
            </Win95Btn>
            <Win95Btn
              onClick={() => onSeek(Math.max(0, progress - duration * 0.1))}
              title="Rewind"
            >
              <Rewind size={14} className="fill-black text-black" />
            </Win95Btn>
            <Win95Btn
              onClick={() =>
                onSeek(Math.min(duration, progress + duration * 0.1))
              }
              title="Forward"
            >
              <FastForward size={14} className="fill-black text-black" />
            </Win95Btn>
            <Win95Btn onClick={onNext} title="Next">
              <SkipForward size={14} className="fill-black text-black" />
            </Win95Btn>
          </div>

          {/* Artist field */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-black min-w-[40px]">
              Artist:
            </span>
            <div
              className="flex-1 bg-white px-2 py-1 border-2 text-xs sm:text-sm truncate"
              style={{ borderColor: "#808080 white white #808080" }}
            >
              {track.artist}
            </div>
            <Win95Btn small>
              <ChevronDown size={10} className="text-black" />
            </Win95Btn>
          </div>

          {/* Title field */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-black min-w-[40px]">
              Title:
            </span>
            <div
              className="flex-1 bg-white px-2 py-1 border-2 text-xs sm:text-sm truncate"
              style={{ borderColor: "#808080 white white #808080" }}
            >
              {track.name}
            </div>
            <Win95Btn small>
              <ChevronDown size={10} className="text-black" />
            </Win95Btn>
          </div>

          {/* Progress bar */}
          <ProgressBar current={progress} total={duration} onSeek={onSeek} />
        </div>
      </div>
    </div>
  );
};

// ── Track List Item ──
const TrackListItem = ({ track, index, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 flex items-center gap-3 border-b border-[#c0c0c0] transition-colors cursor-pointer ${
      isActive
        ? "bg-[#000080] text-white"
        : "bg-white hover:bg-[#e0e0ff] text-black"
    }`}
  >
    <span
      className={`text-xs font-mono min-w-[18px] ${
        isActive ? "text-white" : "text-[#808080]"
      }`}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
    <img
      src={track.albumArt}
      alt=""
      className="w-8 h-8 border border-[#808080] flex-shrink-0 object-cover"
    />
    <div className="flex-1 min-w-0">
      <div
        className={`text-xs sm:text-sm font-bold truncate ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {track.name}
      </div>
      <div
        className={`text-[10px] sm:text-xs truncate ${
          isActive ? "text-[#a0a0ff]" : "text-[#808080]"
        }`}
      >
        {track.artist} · {track.album}
      </div>
    </div>
    <span
      className={`text-[10px] sm:text-xs font-mono flex-shrink-0 ${
        isActive ? "text-[#a0a0ff]" : "text-[#808080]"
      }`}
    >
      {formatTime(track.duration)}
    </span>
  </button>
);

// ── Main Music Page ──
const MusicPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackOrder, setTrackOrder] = useState(TRACKS.map((_, i) => i));
  const [isShuffled, setIsShuffled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0].duration);
  const [volume, setVolume] = useState(75);

  const audioRef = useRef(null);
  const currentTrack = TRACKS[trackOrder[currentIndex]];

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.audioUrl);
    audioRef.current.volume = volume / 100;

    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setProgress(Math.floor(audio.currentTime * 1000));
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.floor(audio.duration * 1000));
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      handleNext();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Update track source when track changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;
    const wasPlaying = isPlaying;

    audio.src = currentTrack.audioUrl;
    audio.currentTime = 0;
    setProgress(0);
    setDuration(currentTrack.duration);

    if (wasPlaying) {
      audio.play().catch((err) => {
        console.error("Audio playback error:", err);
        setIsPlaying(false);
      });
    }
  }, [currentIndex, trackOrder]);

  // Handle volume changes
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Play / Pause toggle
  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
          setIsPlaying(false);
        });
    }
  };

  const handlePrev = () => {
    setCurrentIndex((i) => (i <= 0 ? trackOrder.length - 1 : i - 1));
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i >= trackOrder.length - 1 ? 0 : i + 1));
  };

  const handleShuffle = () => {
    if (isShuffled) {
      setTrackOrder(TRACKS.map((_, i) => i));
      setCurrentIndex(0);
    } else {
      const shuffled = [...Array(TRACKS.length).keys()];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setTrackOrder(shuffled);
      setCurrentIndex(0);
    }
    setIsShuffled(!isShuffled);
  };

  const handleTrackClick = (originalIndex) => {
    const orderIndex = trackOrder.indexOf(originalIndex);
    if (orderIndex !== -1) {
      setCurrentIndex(orderIndex);
    }
  };

  const handleSeek = (positionMs) => {
    if (audioRef.current) {
      audioRef.current.currentTime = positionMs / 1000;
      setProgress(positionMs);
    }
  };

  return (
    <div
      className="min-h-screen py-6 sm:py-8 px-3 sm:px-4"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)",
      }}
    >
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        {/* Page title */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1 text-black tracking-tight"
          style={{ fontFamily: "monospace", textShadow: "3px 3px 0 #00aa00" }}
        >
          NOW PLAYING
        </h1>
        <p
          className="text-xs sm:text-sm mb-6 font-bold tracking-wide text-center"
          style={{ fontFamily: "monospace" }}
        >
          ≈ Drums please, Fab ≈
        </p>

        {/* Retro Player widget */}
        <RetroPlayer
          track={currentTrack}
          onPrev={handlePrev}
          onNext={handleNext}
          onShuffle={handleShuffle}
          isShuffled={isShuffled}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />

        {/* Track list */}
        <div className="w-full max-w-md mx-auto mt-4">
          <div
            className="bg-[#c0c0c0] border-2"
            style={{
              borderColor: "white #808080 #808080 white",
              boxShadow: "2px 2px 0 #404040",
            }}
          >
            {/* Title bar */}
            <div className="bg-[#808080] px-2 py-1 flex items-center justify-between">
              <span className="text-white text-xs font-bold select-none">
                Playlist — {TRACKS.length} tracks
              </span>
              <span className="text-white text-[10px] select-none flex items-center gap-1">
                {isShuffled ? (
                  <>
                    <Shuffle size={10} /> Shuffled
                  </>
                ) : (
                  <>
                    <Play size={10} className="fill-white" /> In Order
                  </>
                )}
              </span>
            </div>

            {/* Track list */}
            <div
              className="max-h-64 sm:max-h-80 overflow-y-auto bg-white border-2"
              style={{ borderColor: "#808080 white white #808080" }}
            >
              {trackOrder.map((originalIndex, displayIndex) => (
                <TrackListItem
                  key={TRACKS[originalIndex].name}
                  track={TRACKS[originalIndex]}
                  index={displayIndex}
                  isActive={displayIndex === currentIndex}
                  onClick={() => handleTrackClick(originalIndex)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Spotify link */}
        <a
          href="https://open.spotify.com/playlist/5buNY33DTJ9MIbLAfccL5t"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-bold text-xs sm:text-sm border-2 border-black hover:bg-gray-800 transition-colors"
          style={{ fontFamily: "monospace" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          OPEN FULL PLAYLIST ON SPOTIFY
        </a>

        {/* Footer note */}
        {/* <div
          className="mt-4 text-[10px] sm:text-xs text-[#808080] text-center flex items-center justify-center gap-1.5"
          style={{ fontFamily: "monospace" }}
        >
          <Music size={12} />
          <span>30-sec previews • Log into Spotify for full tracks</span>
          <Music size={12} />
        </div> */}
      </div>
    </div>
  );
};

export default MusicPage;
