import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const user = auth.currentUser;

  const fetchEmployees = () => {
    fetch('http://localhost:5000/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();

    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE'
      });
      fetchEmployees();
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: text,
      userName: user?.displayName || 'Anonymous',
      createdAt: serverTimestamp()
    });
    setText('');
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/add">Add New Employee</Link>
      <br /><br />
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.designation}</td>
              <td>{emp.salary}</td>
              <td>
                <Link to={`/edit/${emp._id}`}>Edit</Link>
                {' | '}
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {employees.length === 0 && <p>No employees found.</p>}

      <hr />
      <h3>Team Chat</h3>
      <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {messages.map(msg => (
          <p key={msg.id}>
            <strong>{msg.userName}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default EmployeeList;
