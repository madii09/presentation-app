import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from './server/firebase';
import Canvas from './Canvas';

function PresentationList({ nickname }) {
  const [presentations, setPresentations] = useState([]);
  const [selectedPresentation, setSelectedPresentation] = useState(null);

  useEffect(() => {
    const presentationsCollection = collection(db, 'presentations');
    const unsubscribe = onSnapshot(presentationsCollection, (snapshot) => {
      const presentationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPresentations(presentationsData);
    });

    return () => unsubscribe();
  }, []);

  const createPresentation = async () => {
    const newPresentation = {
      slides: [],
      users: [{ nickname, role: 'creator' }],
    };

    try {
      const docRef = await addDoc(
        collection(db, 'presentations'),
        newPresentation
      );
      setSelectedPresentation(docRef.id);
      console.log('New presentation created with ID:', docRef.id);
    } catch (error) {
      console.error('Error creating presentation:', error);
    }
  };

  const updateSlides = async (presentationId, newSlides) => {
    try {
      const presentationDoc = doc(db, 'presentations', presentationId);
      await updateDoc(presentationDoc, { slides: newSlides });
      console.log('Slides updated successfully');
    } catch (error) {
      console.error('Error updating slides:', error);
    }
  };

  return selectedPresentation ? (
    <div>
      <div>
        <h2>Selected Presentation: {selectedPresentation}</h2>
        <button
          style={{
            backgroundColor: '#3f51b5',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            margin: '50px 0px',
          }}
          onClick={() =>
            updateSlides(selectedPresentation, [
              ...presentations.find((p) => p.id === selectedPresentation)
                .slides,
              { elements: [] },
            ])
          }
        >
          Add New Slide
        </button>
      </div>

      <Canvas />
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <h1>Presentations</h1>
        <ul>
          {presentations.map((presentation) => (
            <li
              key={presentation.id}
              onClick={() => setSelectedPresentation(presentation.id)}
            >
              {presentation.id}
            </li>
          ))}
        </ul>
        <button
          style={{
            backgroundColor: '#3f51b5',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
          onClick={createPresentation}
        >
          Create New Presentation
        </button>
      </div>
    </div>
  );
}

export default PresentationList;
