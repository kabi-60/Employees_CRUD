import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: text,
      userName: user.displayName || 'Anonymous',
      createdAt: serverTimestamp()
    });
    setText('');
  };

  return (
    <div>
      <h2>Real-Time Chat</h2>
      <button onClick={() => navigate('/')}>Back to Employees</button>
      <br /><br />
      <div style={{ border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll' }}>
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

export default Chat;
