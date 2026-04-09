import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      console.log(err);
      alert('Login failed!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <p>Please login to access Employee Management</p>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
