import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const response = await fetch('http://localhost:5000/api/suppliers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (response.status === 400) {
        alert("User not found")
        return;
      }
      else if (response.status === 401) {
        alert("Incorrect password");
        return;
      }

      if (response.status === 200) {
        // כאן אני רוצה לבדוק האם הוא בעל מכולת או ספק ולפי זה להחליט לאן להפנות אותו
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);

        // ניווט לפי תפקיד
        if (data.role === 'owner') {
          navigate('/groceryOwner');
        } else if (data.role === 'supplier') {
          navigate('/supplier');
        }
      }
    }
    catch (error) {
      console.error('Error:', error);
      alert('Login failed, please try again later.');
      return;
    }
    console.log({ email, password });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 13px 4px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            // placeholder="הכנס אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            // placeholder="הכנס סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">login</button>
      </form>

      <div className="mt-3 text-center">
        <span>new to our system? </span>
        <button
          type="button"
          className="btn btn-link"
          style={{ color: 'black' }}
          onClick={() => navigate('/register')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
