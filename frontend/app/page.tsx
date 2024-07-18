"use client";

import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function Home() {

  const [loginPage, setLoginPage] = useState(true);

  const changePage = () => {
    setLoginPage(!loginPage);
  
    try {
      if (loginPage) {
        document.getElementById('login').classList.add('slide-out');
        document.getElementById('login').classList.remove('slide-in');
        document.getElementById('signup').style.display = 'hidden';
        document.getElementById('signup').classList.add('slide-in');
        document.getElementById('signup').style.display = 'block';
        document.getElementById('signup').classList.remove('slide-out');
      } else {
        document.getElementById('signup').classList.add('slide-out');
        document.getElementById('signup').classList.remove('slide-in');
        document.getElementById('login').style.display = 'block';
        document.getElementById('login').style.display = 'hidden';
        document.getElementById('login').classList.add('slide-in');
        document.getElementById('login').classList.remove('slide-out');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#E7D37F] relative">
      <ToastContainer />
      <section id='login' className='p-10 bg-[#ECFFE6] rounded-sm outline-[#399918] outline outline-offset-2'>
        <img src="GD/harvest.png" alt="Authentication" className='h-auto w-40 translate-x-[250px] hidden md:block -translate-y-[80px] absolute z-1' />
        <Login changePage={changePage} />
      </section>
      <section id='signup' className='hidden translate-x-full p-10 bg-[#ECFFE6] rounded-sm outline-[#399918] outline outline-offset-2'>
        <img src="GD/sack.svg" alt="Authentication" className='h-auto w-40 translate-x-[250px] hidden md:block -translate-y-[80px] absolute z-1' />
        <SignUp changePage={changePage} />
      </section>
    </main>
  );
}
