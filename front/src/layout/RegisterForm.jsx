import axios from 'axios';
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const hdlChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      
      // Validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }

      const formData = {
        role: 'USER',
        email: input.email,
        password: input.password,
        confirmPassword: input.confirmPassword,
        address: input.address,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone
      };

      const response = await axios.post('http://localhost:8008/auth/register', formData);
      
      if (response.status === 200) {
        alert('Register Successful');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration Failed');
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5">
      <div className="text-3xl mb-5">Register Form</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        {/* Input fields for registration */}
        {/* First Name */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="firstName"
            value={input.firstName}
            onChange={hdlChange}
          />
        </label>
        {/* Last Name */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="lastName"
            value={input.lastName}
            onChange={hdlChange}
          />
        </label>
        {/* Phone */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="phone"
            value={input.phone}
            onChange={hdlChange}
          />
        </label>
        {/* Address */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="address"
            value={input.address}
            onChange={hdlChange}
          />
        </label>
        {/* Email */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>
        {/* Password */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>
        {/* Confirm Password */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
          />
        </label>
        {/* Submit and Reset Buttons */}
        <div className="flex gap-5">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
          <button type="reset" className="btn btn-outline btn-warning mt-7">Reset</button>
        </div>
      </form>
    </div>
  );
}
