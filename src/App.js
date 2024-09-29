import React, { useState } from 'react';
import PresentationList from './PresentationList';
// import Presentation from './Presentation';

function App() {
  const [nickname, setNickname] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = () => {
    if (nickname.trim()) setIsJoined(true);
  };

  return (
    <div className='App'>
      {!isJoined ? (
        <div>
          <h1>Enter your nickname</h1>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            style={{
              backgroundColor: '#3f51b5',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
              border: 'none',
            }}
            onClick={handleJoin}
          >
            Join
          </button>
        </div>
      ) : (
        <PresentationList nickname={nickname} />
      )}
    </div>
  );
}

export default App;
