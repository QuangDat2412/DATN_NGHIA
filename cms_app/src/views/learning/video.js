/* eslint-disable react/prop-types */
// import ReactHlsPlayer from 'react-hls-player';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

import { DOMAIN } from '../../constants/api';
import React from 'react';
const VideoPlayer = ({ lesson, endVideo }) => {
    let url = lesson.url ? DOMAIN + lesson.url : '';
    return  <Player  onEnded={endVideo} id={lesson?.name} width="100%" height="100%" controls >
    <source src={url} />
  </Player>;
};
export default React.memo(VideoPlayer);
