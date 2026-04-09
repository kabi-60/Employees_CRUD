import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    salary: ''
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/employees/${id}`)
      .then(res => res.json())
      .then(data => setForm(data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      alert('Employee updated!');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label>Email: </label>
          <input name="email" value={form.email} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label>Phone: </label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label>Designation: </label>
          <input name="designation" value={form.designation} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label>Salary: </label>
          <input name="salary" type="number" value={form.salary} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit">Update Employee</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditEmployee;
