"use client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({username: null , email: null, _id: null});

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      console.log('Logout successful');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/details');
      console.log('User details:', res.data);
      setUser(res.data.user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Failed to fetch user details. Please try again.');
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <p className="text-white">{user.username ? `Welcome, ${user.username}` : "Loading..."}</p>
      <button 
      className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
      >
        <Link href={`/profile/${user._id}`}>View Profile</Link>
      </button>
      <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={logout}
      >LOGOUT</button>
    </div>
  );
}
