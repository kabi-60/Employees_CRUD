import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    salary: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      alert('Employee added!');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
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
        <button type="submit">Add Employee</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEmployee;
