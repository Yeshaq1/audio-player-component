import React from 'react';
import PropTypes from 'prop-types';
import ukulele from './images/ukulele';

const MusicPlayer = (props) => {
  return (
    <div>
      <h1>Music Player</h1>
      <div className='music-container'>
        <div className='music-info'>
          <h4 id='title'>Ukulele</h4>
          <div className='progress container'>
            <div className='progress'></div>
          </div>
        </div>
        <audio src='./music/ukulele.mp3' id='audio'></audio>
        <div className='img-container'>
          <img src={ukulele} alt='music-cover' id='cover' />
        </div>
      </div>
    </div>
  );
};

MusicPlayer.propTypes = {};

export default MusicPlayer;
