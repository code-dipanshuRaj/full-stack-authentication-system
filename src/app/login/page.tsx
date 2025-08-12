// "use client";
// import React from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import axios from 'axios';

// export default function LoginPage() { 
//   const router = useRouter();
//   const [user,setUser] = React.useState({email:"", password:""});
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
//       <h1 className="text-3xl font-bold mb-4">Login Page</h1>
//       <form className='flex flex-col space-y-4 bg-gray-700 p-6 rounded shadow-md'>
//         <div>
//           <label className="text-white mr-10" htmlFor="email">Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             className="p-2 rounded bg-gray-600 focus:outline-1 focus:ring-2 focus:ring-blue-500"
//             required
//             />
//         </div>
//         <div>
//           <label className="text-white mr-2" htmlFor="password">Password</label>
//           <input
//             type="password"
//             placeholder="Password"
//             value={user.password}
//             onChange={(e) => setUser({ ...user, password: e.target.value })}
//             className="p-2 rounded bg-gray-600 focus:outline-1 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="button"
//           onClick={async () => {
//             try {
//               const response = await axios.post('/api/users/login', user);
//               console.log(response.data);
//               router.push('/profile');
//             } catch (error) {
//               console.error(error);
//             }
//           }}
//           className="bg-blue-500 text-white p-2 rounded"
//         >Login</button>
//         <div className="flex flex-col space-y-2 mt-4">  
//           <Link
//             href="/signup"
//             className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded shadow hover:scale-105 transition-transform duration-200"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm6 8a2 2 0 002-2v-5a2 2 0 00-2-2h-1.5M6 19a2 2 0 01-2-2v-5a2 2 0 012-2H7.5" />
//             </svg>
//             Don't have an account? <span className="underline ml-1">Signup</span>
//           </Link>
//           <Link
//             href="/forgot-password"
//             className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded shadow hover:scale-105 transition-transform duration-200"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6v2m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             Forgot Password? <span className="underline ml-1">Reset</span>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function LoginPage() { 
  const router = useRouter();
  const [user, setUser] = React.useState({ email: "", password: "" });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-90 rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
        {/* Logo or Avatar */}
        <div className="mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm6 8a2 2 0 002-2v-5a2 2 0 00-2-2h-1.5M6 19a2 2 0 01-2-2v-5a2 2 0 012-2H7.5" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-gray-300 mb-6 text-center">Login to your account to continue</p>
        <form className="w-full flex flex-col space-y-5">
          <div>
            <label className="text-gray-200 font-semibold mb-1 block" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="text-gray-200 font-semibold mb-1 block" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              required
            />
          </div>
          <div className='text-white text-right'><Link href="/forgot-password">forgot password?</Link></div>
          <button
            type="button"
            onClick={async () => {
              try {
                const response = await axios.post('/api/users/login', user);
                console.log(response.data);
                router.push('/profile');
              } catch (error) {
                console.error(error);
              }
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition-transform duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col space-y-2 mt-6 w-full">
          <Link
            href="/signup"
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow hover:scale-105 transition-transform duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm6 8a2 2 0 002-2v-5a2 2 0 00-2-2h-1.5M6 19a2 2 0 01-2-2v-5a2 2 0 012-2H7.5" />
            </svg>
            <span className="font-semibold">Don't have an account?</span>
            <span className="underline ml-1 text-black">Signup</span>
          </Link>
          <Link
            href="/forgot-password"
            className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow hover:scale-105 transition-transform duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6v2m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Forgot Password?</span>
            <span className="underline ml-1 text-black">Reset</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
