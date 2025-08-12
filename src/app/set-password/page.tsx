"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SetPasswordPage() {
  const router = useRouter();
  const [success, setSuccess] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  async function handleSetPassword() {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post('/api/users/set-password', { password, token });
      setMessage(res.data.message || "Password set successfully.");
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (error) {
      console.error('Error setting password:', error);
      setMessage("Failed to set password. Please try again.");
      setSuccess(false);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  },[]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
    <h1 className="text-3xl font-bold mb-4">Set Password</h1>
      <form className='flex flex-col space-y-4 bg-gray-700 p-6 rounded shadow-md'>
        <div>
          <label className="text-white mr-2" htmlFor="password">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-600 focus:outline-1 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-white mr-2" htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 rounded bg-gray-600 focus:outline-1 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleSetPassword}
          className="bg-blue-500 text-white p-2 rounded"
        >
        Set Password
        </button>
        {message && <div className={ success ? "text-green-500 mt-2 text-lg" : "text-red-500 mt-2"}>{message}</div>}
      </form>
    </div>
  );
}