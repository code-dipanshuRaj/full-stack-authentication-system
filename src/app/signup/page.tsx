"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() { 
  const router = useRouter();
  const [user,setUser] = React.useState({username:"", email:"", password:""});

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-3xl font-bold mb-4">Signup Page</h1>
      <form className='flex flex-col space-y-4 bg-gray-700 p-6 rounded shadow-md'>
        <div>
          <label className="text-white mr-2" htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="p-2 rounded bg-gray-600 focus:outline-1 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-white mr-10" htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="p-2 rounded bg-gray-600 focus:outline-1 focus:ring-2 focus:ring-blue-500"
            required
            />
        </div>
        <div>
          <label className="text-white mr-2" htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="p-2 rounded bg-gray-600 focus:outline-1 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              const response = await axios.post('/api/users/signup', user);
              console.log(response.data);
              router.push('/profile');
            } catch (error) {
              console.error(error);
            }
          }}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Signup
        </button>
        <span className="text-white text-center">Already have an account? <a href="/login" className="text-blue-500">Login</a></span>
      </form>
    </div>
  );
}