import React, { useState, useRef, useEffect } from 'react';

//this is a music player component..

const MusicPlayer = (props) => {
  // songs array
  // This can be changed depending on the song titles saved
  const songs = ['hey', 'summer', 'ukulele', 'welcome'];

  // song index state
  let songIndex = useRef(0);


  // song state
  const [song, updatesong] = useState({
    title: songs[songIndex.current],
    img: process.env.PUBLIC_URL + `images/${songs[songIndex.current]}.jpg`,
  });

  let { title, img } = song;

  //audio useRef setup
  const audioInit =
    process.env.PUBLIC_URL + `music/${songs[songIndex.current]}.mp3`;
  let audio = useRef(new Audio(audioInit));

  // Track if Song is playing or off.
  const [playState, updatePlayState] = useState(false);

  let progressPercentRef = useRef(0);

  //function loadSong
  function loadSong(selectedSong) {
    audio.current.src = process.env.PUBLIC_URL + `music/${selectedSong}.mp3`;
  }

  function pausePlay() {
    if (playState) {
      updatePlayState(false);
      audio.current.pause();
    } else {
      updatePlayState(true);
      audio.current.play();
      console.log(progressPercentRef);
    }
  }

  function nextSong() {
    loadSong(songs[songIndex.current]);
    updatesong({
      title: songs[songIndex.current],
      img: process.env.PUBLIC_URL + `images/${songs[songIndex.current]}.jpg`,
    });
    if (playState) {
      audio.current.play();
    }
  }

  // event listenter to track the timeupdate
  audio.current.addEventListener('timeupdate', updateProgress);

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const percentage = (currentTime / duration) * 100;
    if (percentage) {
      progressPercentRef.current = percentage;
    }
  }

  // state to update the song progress %
  const [progressPercent, setprogressPercent] = useState(0);

  // hook to fire off and re-renter the progress componenet every 1 second.
  // using SetProgressPercent directly renders many times and leads to errors.
  // This was introduced as a fix. Might not be the most optimal fix, however
  // it is stable fix and the componenet functions as desired.

  useEffect(() => {
    setTimeout(() => setprogressPercent(progressPercentRef.current), 500);
  });

  const ref = useRef(null);

  function setProgress(e) {
    const width = ref.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audio.current.duration;

    audio.current.currentTime = (clickX / width) * duration;
  }

  return (
    <div className='music-player'>
      <div className={playState ? 'music-container play' : 'music-container'}>
        <div className='music-info'>
          <h4 id='title'>{title}</h4>
          <div
            ref={ref}
            onClick={(e) => setProgress(e)}
            className='progress-container'
          >
            <div
              style={{ width: progressPercent + '%' }}
              className='progress'
            ></div>
          </div>
        </div>

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

export default MusicPlayer;
