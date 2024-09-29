import React, { useEffect, useState } from 'react';
import { db } from './server/firebase';
import Canvas from './Canvas';

function Presentation({ presentationId, nickname }) {
  const [presentation, setPresentation] = useState(null);
  const [role, setRole] = useState('viewer');

  useEffect(() => {
    const unsubscribe = db
      .collection('presentations')
      .doc(presentationId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setPresentation(doc.data());
          const user = doc.data().users.find((u) => u.nickname === nickname);
          if (user) setRole(user.role);
        }
      });

    return () => unsubscribe();
  }, [presentationId, nickname]);

  const addSlide = () => {
    if (role === 'creator') {
      const newSlide = { elements: [] };
      db.collection('presentations')
        .doc(presentationId)
        .update({
          slides: [...presentation.slides, newSlide],
        });
    }
  };

  const handleRoleChange = (userNickname, newRole) => {
    if (role === 'creator') {
      const updatedUsers = presentation.users.map((u) =>
        u.nickname === userNickname ? { ...u, role: newRole } : u
      );
      db.collection('presentations')
        .doc(presentationId)
        .update({ users: updatedUsers });
    }
  };

  return (
    <div>
      <h2>Presentation: {presentationId}</h2>
      <div>
        <button onClick={addSlide}>Add Slide</button>
      </div>
      <div className='users-panel'>
        <h3>Connected Users</h3>
        {presentation?.users.map((user) => (
          <div key={user.nickname}>
            {user.nickname} - {user.role}
            {role === 'creator' && (
              <button
                onClick={() =>
                  handleRoleChange(
                    user.nickname,
                    user.role === 'editor' ? 'viewer' : 'editor'
                  )
                }
              >
                Toggle Role
              </button>
            )}
          </div>
        ))}
      </div>
      <div className='slides-panel'>
        {presentation?.slides.map((slide, index) => (
          <Canvas
            key={index}
            slide={slide}
            slideIndex={index}
            presentationId={presentationId}
            role={role}
          />
        ))}
      </div>
    </div>
  );
}

export default Presentation;
