"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const [isVerified, setIsVerified] = React.useState(false);
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  async function handleVerifyEmail(){
    try {
      await axios.post('api/users/verifyemail', {token});
      setIsVerified(true);
    } catch (error) {
      console.error('Error verifying email:', error);
      setError('Failed to verify email. Please try again.');
      setIsVerified(false);
    }
  }

  function handleClick(){
    setProcessing(true);
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || "");
    setInterval(() => {
      setProcessing(false);
    },2000);
  }

  useEffect(()=> {
    if(token.length > 0){
      handleVerifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-3xl font-bold mb-4">Verify Email Page</h1>
      <form className='flex flex-col space-y-4 border-2 border-white rounded shadow-md'>
        <button
          type="button"
          onClick={handleClick}
          className="bg-blue-500 hover:bg-green-600 text-white p-2 rounded-md"
        >
          Verify Email
        </button>
      </form>
      {processing && (
        <div className="mt-4 text-2xl font-bold text-blue-300">
          Processing...
        </div>
      )}
      {!processing && !isVerified && !error && (
        <div className="mt-4 text-2xl font-bold text-yellow-500">
          Click the button to verify your email.
        </div>
      )}
      {isVerified && (
        <div className="mt-4 text-2xl font-bold text-green-500">
          Email verified successfully! <Link href="/profile" className="text-blue-300">Go to Profile</Link>
        </div>
      )}
      {error && (
        <div className="mt-4 text-2xl font-bold text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}