import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './App.css'; 

const firebaseConfig = {
  apiKey: "AIzaSyALuS5LpK3vUzLQS0h5-ZjcGeUT-r89IhM",
  authDomain: "projetogustavosoares.firebaseapp.com",
  projectId: "projetogustavosoares",
  storageBucket: "projetogustavosoares.appspot.com",
  messagingSenderId: "155674459207",
  appId: "1:155674459207:web:3732f4646728a765568562",
  measurementId: "G-FDZNFY786K"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  return (
    <div className="background-container">
      <div className="login-container">
        <h1>Firebase Com Google Gustavo Soares</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGoogleLogin}>Google Login</button>
        {error && <p>{error}</p>}
        {user && (
          <div>
            <p>Nome: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>ID do Usuário: {user.uid}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


