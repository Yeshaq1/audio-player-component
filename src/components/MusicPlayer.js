import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const MusicPlayer = (props) => {
  const songs = ['hey', 'summer', 'ukulele'];

  // song index state
  let songIndex = 0;

  const [songz, updateSongz] = useState({
    title: songs[songIndex],
    img: process.env.PUBLIC_URL + `images/${songs[songIndex]}.jpg`,
  });

  let { title, img } = songz;

  //audio useRef setup
  const audioinit = process.env.PUBLIC_URL + `music/${songs[songIndex]}.mp3`;
  let audio = useRef(new Audio(audioinit));

  // play/on/off set up
  const [playState, updatePlayState] = useState(false);

  function pausePlay() {
    if (playState) {
      updatePlayState(false);
      audio.current.pause();
      console.log(audio.current.src);
    } else {
      updatePlayState(true);
      audio.current.play();
      console.log(audio.current.src);
    }
  }
  //function loadSong
  function loadSong(selectedSong) {
    // title = selectedSong;
    audio.current.src = process.env.PUBLIC_URL + `music/${selectedSong}.mp3`;
    // img = process.env.PUBLIC_URL + `images/${selectedSong}.jpg`;
  }

  return (
    <div className='music-player'>
      <div className={playState ? 'music-container play' : 'music-container'}>
        <div className='music-info'>
          <h4 id='title'>{title}</h4>
          <div className='progress-container'>
            <div className='progress'></div>
          </div>
        </div>
        {/* <audio src={audioSrc} id='audio'></audio> */}
        <div className='img-container'>
          <img src={img} alt='music-cover' id='cover' />
        </div>
        <div className='navigation'>
          <button id='prev' className='action-btn'>
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
              songIndex++;

              if (songIndex > songs.length - 1) {
                songIndex = 0;
              }
              loadSong(songs[songIndex]);
              updateSongz({
                title: songs[songIndex],
                img: process.env.PUBLIC_URL + `images/${songs[songIndex]}.jpg`,
              });
              console.log(img);
              console.log(title);
              audio.current.play();
              console.log(songIndex);
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
