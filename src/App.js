import { useEffect, useRef, useState } from 'react';
import './App.css';
import headerBird from './assets/header-bird.png';
import blueStar from './assets/blue-star.png';
import pinkStar from './assets/pink-star.png';
import volumeIcon from './assets/volume-icon.png';
import robinBird from './assets/robin-bird.jpg';
import cardinalBird from './assets/cardinal-bird.jpg';
import redWingedBlackbirdBird from './assets/red-winged-blackbird-bird.jpg';
import songSparrowBird from './assets/song-sparrow-bird.jpg';
import mourningDoveBird from './assets/mourning-dove-bird.jpg';
import chickadeeBird from './assets/chickadee-bird.jpg';
import robinSound from './assets/robin-sound.mp3';
import cardinalSound from './assets/cardinal-sound.mp3';
import redWingedBlackbirdSound from './assets/red-winged-blackbird-sound.mp3';
import songSparrowSound from './assets/song-sparrow-sound.mp3'
import mourningDoveSound from './assets/mourning-dove-sound.mp3';
import chickadeeSound from './assets/chickadee-sound.mp3';

const BIRDS = [
  {
    id: 'robin',
    image: robinBird,
    sound: robinSound,
    name: 'Robin',
    description: 'Soft Chirping',
  },
  {
    id: 'cardinal',
    image: cardinalBird,
    sound: cardinalSound,
    name: 'Cardinal',
    description: 'Clear Whistling',
  },
  {
    id: 'red-winged-blackbird',
    image: redWingedBlackbirdBird,
    sound: redWingedBlackbirdSound,
    name: 'Red Winged Blackbird',
    description: 'Musical Conk-La-Ree',
  },
  {
    id: 'song-sparrow',
    image: songSparrowBird,
    sound: songSparrowSound,
    name: 'Song Sparrow',
    description: 'Melodic Trill',
  },
  {
    id: 'mourning-dove',
    image: mourningDoveBird,
    sound: mourningDoveSound,
    name: 'Mourning Dove',
    description: 'Soft Cooing',
  },
  {
    id: 'chickadee',
    image: chickadeeBird,
    sound: chickadeeSound,
    name: 'Chickadee',
    description: 'Chick-a-dee-dee-dee',
  },
];

function App() {
  const audioRefs = useRef({});
  const [playingIds, setPlayingIds] = useState(() => new Set());

  const playingCount = playingIds.size;

  useEffect(() => {
    const refs = audioRefs.current;
    return () => {
      Object.values(refs).forEach((audio) => {
        audio.pause();
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
    if (!bird.sound) return;

    let audio = audioRefs.current[bird.id];
    if (!audio) {
      audio = new Audio(bird.sound);
      audio.loop = false;
      audio.addEventListener('ended', () => handleBirdEnded(bird.id));
      audioRefs.current[bird.id] = audio;
    }

    if (playingIds.has(bird.id)) {
      audio.pause();
      audio.currentTime = 0;
      handleBirdEnded(bird.id);
      return;
    }

    audio.currentTime = 0;

    const startPlaying = () => {
      setPlayingIds((prev) => {
        if (prev.has(bird.id)) return prev;
        const next = new Set(prev);
        next.add(bird.id);
        return next;
      });
    };

    audio.play().then(startPlaying).catch(() => {
      handleBirdEnded(bird.id);
    });
  };

  const handleReset = () => {
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
          <img src={volumeIcon} alt="volume icon" className="volume-icon" />
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
            className={`bird-card${playingIds.has(bird.id) ? ' playing' : ''}`}
            onClick={() => handleBirdClick(bird)}
            aria-pressed={playingIds.has(bird.id)}
          >
            <img src={bird.image} alt={bird.name} className="bird-image" />
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
