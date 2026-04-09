import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import Login from './pages/Login';
import Chat from './pages/Chat';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <h1>Employee Management</h1>
        {user && (
          <div>
            <span>Welcome, {user.displayName} </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        <hr />
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <EmployeeList /> : <Navigate to="/login" />} />
          <Route path="/add" element={user ? <AddEmployee /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={user ? <EditEmployee /> : <Navigate to="/login" />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
