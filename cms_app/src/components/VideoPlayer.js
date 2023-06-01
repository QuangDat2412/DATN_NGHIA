import React from 'react';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
const App = ({url}) => {
    return (
      <div>
        <h1>Video Player</h1>
        <Player>
          <source src={url} />
        </Player>
      </div>
    );
  };
  export default App;