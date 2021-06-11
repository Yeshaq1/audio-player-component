import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const MusicPlayer = (props) => {
  const songs = ['hey', 'summer', 'ukulele', 'welcome'];

  // song index state
  let songIndex = useRef(0);
  const [songz, updateSongz] = useState({
    title: songs[songIndex.current],
    img: process.env.PUBLIC_URL + `images/${songs[songIndex.current]}.jpg`,
  });

  let { title, img } = songz;

  //audio useRef setup
  const audioinit =
    process.env.PUBLIC_URL + `music/${songs[songIndex.current]}.mp3`;
  let audio = useRef(new Audio(audioinit));

  // play/on/off set up
  const [playState, updatePlayState] = useState(false);

  let progressPercent = useRef(0);

  function pausePlay() {
    if (playState) {
      updatePlayState(false);
      audio.current.pause();
    } else {
      updatePlayState(true);
      audio.current.play();
      console.log(progressPercent);
    }
  }

  function nextSong() {
    loadSong(songs[songIndex.current]);
    updateSongz({
      title: songs[songIndex.current],
      img: process.env.PUBLIC_URL + `images/${songs[songIndex.current]}.jpg`,
    });
    if (playState) {
      audio.current.play();
    }
  }
  //function loadSong
  function loadSong(selectedSong) {
    // title = selectedSong;
    audio.current.src = process.env.PUBLIC_URL + `music/${selectedSong}.mp3`;
    // img = process.env.PUBLIC_URL + `images/${selectedSong}.jpg`;
  }

  audio.current.addEventListener('timeupdate', updateProgress);

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const percentage = (currentTime / duration) * 100;
    progressPercent.current = percentage;
  }

  const [fakePrecent, setFakePercent] = useState(0); // default value can be anything you want

  useEffect(() => {
    setTimeout(() => setFakePercent(progressPercent.current), 1000);
  });

  return (
    <div className='music-player'>
      <div className={playState ? 'music-container play' : 'music-container'}>
        <div className='music-info'>
          <h4 id='title'>{title}</h4>
          <div className='progress-container'>
            <div style={{ width: fakePrecent }} className='progress'></div>
          </div>
        </div>
        {/* <audio src={audioSrc} id='audio'></audio> */}
        <div className='img-container'>
          <img src={img} alt='music-cover' id='cover' />
        </div>
        <div className='navigation'>
          <button
            onClick={(e) => {
              if (songIndex.current === 0) {
                songIndex.current = songs.length - 1;
              } else {
                songIndex.current--;
              }
              nextSong();
            }}
            id='prev'
            className='action-btn'
          >
            <i className='fas fa-backward'></i>
          </button>
          <button
            onClick={(e) => {
              pausePlay();
            }}
            id='play'
            className='action-btn action-btn-big'
          >
            <i className={playState ? 'fas fa-pause' : 'fas fa-play'}></i>
          </button>
          <button
            onClick={(e) => {
              if (songIndex.current >= songs.length - 1) {
                songIndex.current = 0;
              } else {
                songIndex.current++;
              }
              nextSong();
            }}
            id='next'
            className='action-btn'
          >
            <i className='fas fa-forward'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

MusicPlayer.propTypes = {};

export default MusicPlayer;
