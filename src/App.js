import './App.css';
import headerBird from './assets/header-bird.png';
import orangeStar from './assets/orange-star.png';
import blueStar from './assets/blue-star.png';
import pinkStar from './assets/pink-star.png';
import volumeIcon from './assets/volume-icon.png';
import robinBird from './assets/robin-bird.jpg';
import cardinalBird from './assets/cardinal-bird.jpg';
import redWingedBlackbirdBird from './assets/red-winged-blackbird-bird.jpg';
import songSparrowBird from './assets/song-sparrow-bird.jpg';
import mourningDoveBird from './assets/mourning-dove-bird.jpg';
import chickadeeBird from './assets/chickadee-bird.jpg';

function App() {
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
        <img src={orangeStar} alt="orange star" className="star" />
        <p className="description">Create your own songbird symphony</p>
        <img src={blueStar} alt="blue star" className="star" />
      </div>

      <div className="playing-row">
        <img src={pinkStar} alt="pink star" className="star" />
        <div className="playing-indicator">
          <img src={volumeIcon} alt="volume icon" className="volume-icon" />
          <p className="playing-text">Playing 3 Birds</p>
          <button className="reset-button">Reset</button>
        </div>
        <div className="star-spacer" aria-hidden="true" />
      </div>

      <div className="bird-container">
        <div className="bird-card">
          <img src={robinBird} alt="robin bird" className="bird-image" />
          <div className="bird-text">
            <p className="bird-name">Robin</p>
            <p className="bird-description">Soft Chirping</p>
          </div>
        </div>
        <div className="bird-card">
          <img src={cardinalBird} alt="cardinal bird" className="bird-image" />
          <div className="bird-text">
            <p className="bird-name">Cardinal</p>
            <p className="bird-description">Clear Whistling</p>
          </div>
        </div>
        <div className="bird-card">
          <img src={redWingedBlackbirdBird} alt="red winged blackbird bird" className="bird-image" />
          <div className="bird-text">
            <p className="bird-name">Red Winged Blackbird</p>
            <p className="bird-description">Musical Conk-La-Ree</p>
          </div>
        </div>
        <div className="bird-card">
          <img src={songSparrowBird} alt="song sparrow bird" className="bird-image" />
          <div className="bird-text">
            <p className="bird-name">Song Sparrow</p>
            <p className="bird-description">Melodic Trill</p>
          </div>
        </div>
        <div className="bird-card">
          <img src={mourningDoveBird} alt="mourning dove bird" className="bird-image" />
          <div className="bird-text">
            <p className="bird-name">Mourning Dove</p>
            <p className="bird-description">Soft Cooing</p>
          </div>
        </div>
        <div className="bird-card">
          <img src={chickadeeBird} alt="chickadee bird" className="bird-image" />
          <div className="bird-text">
            <p className="bird-name">Chickadee</p>
            <p className="bird-description">Chick-a-dee-dee-dee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
