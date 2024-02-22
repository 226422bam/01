import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: '', 
    password: ''
  });

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:8008/auth/login', input);
      
      localStorage.setItem('token', response.data.token);
      
      const userResponse = await axios.get('http://localhost:8008/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      
      setUser(userResponse.data);
    } catch(err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5">
      <div className="text-3xl mb-5">Please Login</div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </label>

        <div className="flex gap-5">
          <button type="submit" className="btn btn-outline btn-info mt-7">Login</button>
        </div>
      </form>
    </div>
  );
}
