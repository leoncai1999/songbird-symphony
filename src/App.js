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

const BIRDS = [
  {
    id: 'indigo-bunting',
    video: indigoBuntingVideo,
    name: 'Indigo Bunting',
    description: 'Sweet Chirping',
  },
  {
    id: 'common-yellowthroat',
    video: commonYellowthroatVideo,
    name: 'Common Yellowthroat',
    description: 'witchety-witchety-witchety',
  },
  {
    id: 'northern-mockingbird',
    video: northernMockingbirdVideo,
    name: 'Northern Mockingbird',
    description: 'Song Composer',
  },
  {
    id: 'red-winged-blackbird',
    video: redWingedBlackbirdVideo,
    name: 'Red Winged Blackbird',
    description: 'cokn-la-ree!',
  },
  {
    id: 'song-sparrow',
    video: songSparrowVideo,
    name: 'Song Sparrow',
    description: 'Loud Clanking Song',
  },
  {
    id: 'northern-cardinal',
    video: northernCardinalVideo,
    name: 'Northern Cardinal',
    description: 'Loud Metallic Clip',
  },
];

function App() {
  const videoRefs = useRef({});
  const [playingIds, setPlayingIds] = useState(() => new Set());

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
    setPlayingIds((prev) => {
      if (!prev.has(birdId)) return prev;
      const next = new Set(prev);
      next.delete(birdId);
      return next;
    });
  };

  const handleBirdClick = (bird) => {
    const video = videoRefs.current[bird.id];
    if (!video) return;

    if (playingIds.has(bird.id)) {
      video.pause();
      video.currentTime = 0;
      handleBirdEnded(bird.id);
      return;
    }

    video.currentTime = 0;

    setPlayingIds((prev) => {
      if (prev.has(bird.id)) return prev;
      const next = new Set(prev);
      next.add(bird.id);
      return next;
    });

    video.play().catch(() => {
      handleBirdEnded(bird.id);
    });
  };

  const handleReset = () => {
    Object.values(videoRefs.current).forEach((video) => {
      video.pause();
      video.currentTime = 0;
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
        {BIRDS.map((bird) => (
          <button
            key={bird.id}
            type="button"
            className={`bird-card bird-${bird.id}${playingIds.has(bird.id) ? ' playing' : ''}`}
            onClick={() => handleBirdClick(bird)}
            aria-pressed={playingIds.has(bird.id)}
          >
            <video
              ref={(node) => {
                if (node) {
                  videoRefs.current[bird.id] = node;
                } else {
                  delete videoRefs.current[bird.id];
                }
              }}
              src={bird.video}
              className="bird-video"
              playsInline
              preload="metadata"
              onEnded={() => handleBirdEnded(bird.id)}
              aria-label={`${bird.name} video`}
            />
            <div className="bird-text">
              <p className="bird-name">{bird.name}</p>
              <p className="bird-description">{bird.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
