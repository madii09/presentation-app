import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAYtiGLi7DMfx4cLuuSTrQaX9mu7KyEbtE',
  authDomain: 'present-app-29366.firebaseapp.com',
  projectId: 'present-app-29366',
  storageBucket: 'present-app-29366.appspot.com',
  messagingSenderId: '623813972287',
  appId: '1:623813972287:web:c99e287d8a1de04c74838a',
  measurementId: 'G-PY9MVGR398',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
