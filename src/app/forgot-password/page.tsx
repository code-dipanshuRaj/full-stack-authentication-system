"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <form className='flex flex-col space-y-4 bg-gray-700 p-6 rounded shadow-md'>
        <div>
          <label className="text-white mr-2" htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-600 focus:outline-1 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              await axios.post('api/users/forgot-password', { email });
              alert('Password reset link sent to your email.');
              router.push('/set-password');
            } catch (error) {
              console.error(error);
              alert('Failed to send reset link. Please try again.');
            }
          }}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
} 
