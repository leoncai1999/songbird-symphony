import { useEffect, useRef, useState } from 'react';
import { IoVolumeMediumOutline } from 'react-icons/io5';
import './App.css';
import headerBird from './assets/header-bird.png';
import blueStar from './assets/blue-star.png';
import pinkStar from './assets/pink-star.png';
import indigoBuntingVideo from './assets/indigo-bunting.mp4';
import commonYellowthroatVideo from './assets/common-yellowthroat.mp4';
import northernMockingbirdVideo from './assets/northern-mockingbird.mp4';
import redWingedBlackbirdVideo from './assets/red-winged-blackbird.mp4';
import songSparrowVideo from './assets/song-sparrow.mp4';
import northernCardinalVideo from './assets/northern-cardinal.mp4';
import indigoBuntingAudio from './assets/indigo-bunting.mp3';
import commonYellowthroatAudio from './assets/common-yellowthroat.mp3';
import northernMockingbirdAudio from './assets/northern-mockingbird.mp3';
import redWingedBlackbirdAudio from './assets/red-winged-blackbird.mp3';
import songSparrowAudio from './assets/song-sparrow.mp3';
import northernCardinalAudio from './assets/northern-cardinal.mp3';
import indigoBuntingPoster from './assets/indigo-bunting.png';
import commonYellowthroatPoster from './assets/common-yellowthroat.png';
import northernMockingbirdPoster from './assets/northern-mockingbird.png';
import redWingedBlackbirdPoster from './assets/red-winged-blackbird.png';
import songSparrowPoster from './assets/song-sparrow.png';
import northernCardinalPoster from './assets/northern-cardinal.png';

const BIRDS = [
  {
    id: 'indigo-bunting',
    video: indigoBuntingVideo,
    audio: indigoBuntingAudio,
    poster: indigoBuntingPoster,
    name: 'Indigo Bunting',
    description: 'Sweet Chirping',
  },
  {
    id: 'common-yellowthroat',
    video: commonYellowthroatVideo,
    audio: commonYellowthroatAudio,
    poster: commonYellowthroatPoster,
    name: 'Common Yellowthroat',
    description: 'witchety-witchety-witchety',
  },
  {
    id: 'northern-mockingbird',
    video: northernMockingbirdVideo,
    audio: northernMockingbirdAudio,
    poster: northernMockingbirdPoster,
    name: 'Northern Mockingbird',
    description: 'Short Musical Chirps',
  },
  {
    id: 'red-winged-blackbird',
    video: redWingedBlackbirdVideo,
    audio: redWingedBlackbirdAudio,
    poster: redWingedBlackbirdPoster,
    name: 'Red Winged Blackbird',
    description: 'cokn-la-ree!',
  },
  {
    id: 'song-sparrow',
    video: songSparrowVideo,
    audio: songSparrowAudio,
    poster: songSparrowPoster,
    name: 'Song Sparrow',
    description: 'Chirp Chirp Chirp Trill',
  },
  {
    id: 'northern-cardinal',
    video: northernCardinalVideo,
    audio: northernCardinalAudio,
    poster: northernCardinalPoster,
    name: 'Northern Cardinal',
    description: 'Pure-toned Repeated Whistles',
  },
];

// const getVideoSource = (video) => `${video}#t=0.001`;

function App() {
  const videoRefs = useRef({});
  const audioRefs = useRef({});
  // const loadedVideoIds = useRef(new Set());
  const [playingIds, setPlayingIds] = useState(() => new Set());
  const [readyVideoIds, setReadyVideoIds] = useState(() => new Set());
  const [showRestingPopup, setShowRestingPopup] = useState(false);

  const playingCount = playingIds.size;

  useEffect(() => {
    const refs = videoRefs.current;
    return () => {
      Object.values(refs).forEach((video) => {
        video.pause();
      });
    };
  }, []);

  const handleBirdEnded = (birdId) => {
    const video = videoRefs.current[birdId];
    if (video) {
      resetVideoToStart(video);
    }

    setPlayingIds((prev) => {
      if (!prev.has(birdId)) return prev;
      const next = new Set(prev);
      next.delete(birdId);
      return next;
    });
  };

  const handleVideoReady = (birdId) => {
    setReadyVideoIds((prev) => {
      if (prev.has(birdId)) return prev;
      const next = new Set(prev);
      next.add(birdId);
      return next;
    });
  };

  // const ensureVideoLoaded = (bird, video) => {
  //   if (loadedVideoIds.current.has(bird.id)) return;

  //   video.src = getVideoSource(bird.video);
  //   video.load();
  //   loadedVideoIds.current.add(bird.id);
  // };

  const resetVideoToStart = (video) => {
    if (video.readyState === 0) {
      return;
    }

    try {
      video.currentTime = 0;
    } catch {
      video.load();
    }
  };

  const handleBirdClick = (bird) => {
    // const video = videoRefs.current[bird.id];
    // const audio = audioRefs.current[bird.id];
  
    // if (!video || !audio) return;
  
    // // STOP if already playing
    // if (playingIds.has(bird.id)) {
    //   video.pause();
    //   audio.pause();
  
    //   resetVideoToStart(video);
    //   audio.currentTime = 0;
  
    //   handleBirdEnded(bird.id);
  
    //   return;
    // }
  
    // ensureVideoLoaded(bird, video);
  
    // resetVideoToStart(video);
    // audio.currentTime = 0;
  
    // video.muted = true;
  
    // setPlayingIds((prev) => {
    //   if (prev.has(bird.id)) return prev;
  
    //   const next = new Set(prev);
    //   next.add(bird.id);
  
    //   return next;
    // });
  
    // Promise.all([
    //   video.play(),
    //   audio.play(),
    // ]).catch(() => {
    //   handleBirdEnded(bird.id);
    // });

    setShowRestingPopup(true);
  };

  const handleReset = () => {
    Object.values(videoRefs.current).forEach((video) => {
      video.pause();
      resetVideoToStart(video);
    });
    Object.values(audioRefs.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setPlayingIds(new Set());
  };

  return (
    <div className="background">
      <div className="header-row">
        <div className="title-group">
          <h1 className="title-1">SONGBIRDS OF</h1>
          <h1 className="title-2">PENNSYLVANIA</h1>
        </div>
        <img src={headerBird} alt="header bird" className="header-bird" />
      </div>
      <div className="subtitle-row">
        <img src={pinkStar} alt="pink star" className="star" />
        <p className="description">Create your own songbird symphony</p>
        <img src={blueStar} alt="blue star" className="star" />
      </div>

      <div className="playing-row">
        <div className="playing-indicator">
          <IoVolumeMediumOutline className="volume-icon" aria-label="volume icon" />
          <p className="playing-text">
            Playing {playingCount} Bird{playingCount === 1 ? '' : 's'}
          </p>
          {playingCount > 0 && (
            <button type="button" className="reset-button" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="bird-container">
        <div className="bird-grid">
          {BIRDS.map((bird) => (
            <button
              key={bird.id}
              type="button"
              className={`bird-card bird-${bird.id}${playingIds.has(bird.id) ? ' playing' : ''}${readyVideoIds.has(bird.id) ? ' video-ready' : ''}`}
              onClick={() => handleBirdClick(bird)}
              aria-pressed={playingIds.has(bird.id)}
            >
              <div className="bird-media">
                <img src={bird.poster} alt="" className="bird-poster" aria-hidden="true" />
                <video
                  ref={(node) => {
                    if (node) {
                      videoRefs.current[bird.id] = node;
                    } else {
                      delete videoRefs.current[bird.id];
                    }
                  }}
                  className="bird-video"
                  poster={bird.poster}
                  muted
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  controls={false}
                  onLoadedData={() => handleVideoReady(bird.id)}
                  onPlaying={() => handleVideoReady(bird.id)}
                  onEnded={() => {
                    const audio = audioRefs.current[bird.id];
                    if (audio) {
                      audio.pause();
                      audio.currentTime = 0;
                    }
                    handleBirdEnded(bird.id);
                  }}
                  aria-label={`${bird.name} video`}
                />
                <audio
                  ref={(node) => {
                    if (node) {
                      audioRefs.current[bird.id] = node;
                    } else {
                      delete audioRefs.current[bird.id];
                    }
                  }}
                  src={bird.audio}
                  preload="none"
                />
              </div>
              <div className="bird-text">
                <p className="bird-name">{bird.name}</p>
                <p className="bird-description">{bird.description}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="credits-block">
          <p className="video-credits">
            Video Credits: Brett Billings, Ryan Hagetry, Doug Canfield, USFWS/NCTC
          </p>
          <p className="conceived-by">Conceived by Kristen Osborn and built by Leon Cai</p>
        </div>
      </div>
      {showRestingPopup && (
        <div className="popup-overlay" onClick={() => setShowRestingPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <p className="popup-title">The birds are resting</p>
            <p className="popup-text">
              Check back later to play again!
            </p>
            <button
              type="button"
              className="popup-button"
              onClick={() => setShowRestingPopup(false)}
            >
              Okay
            </button>
          </div>
        </div>)}
    </div>
  );
}

export default App;
