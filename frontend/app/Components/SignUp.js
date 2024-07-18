'use client';

import { useState } from "react";
import isValidEmail from "./Function/function";
import InputWrapper from "./InputWrapper";
import { kotta, junge, raleway } from "./Fonts";
import {Button} from "./MT";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp({changePage}) {

  const [password, setPassword] = useState('');
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const isCapital = (password) => {
    const capitalRegex = /[A-Z]/;
    return capitalRegex.test(password);
  }

  const isValidLength = (password) => {
    return password.length >= 8;
  }

  const isNumber = (password) => {
    const numberRegex = /[0-9]/;
    return numberRegex.test(password);
  }

  const passwordInvalid = () => {toast.error('Invalid Password', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
    });}

  const emailInvalid = () => {toast.error('Invalid Email', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
    });}

  const needToFill = () => {toast.error('Please fill all fields', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
    });}

  const signUpSuccess = () => {toast.success('Sign Up Successful', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
    });}

  const goSignIn = () => {toast.info('You can now sign in', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
    });}

  const register = async () => {
    if (email === '' || password === '' || name === '') {
      needToFill();
      return;
    }
    if (!isCapital(password) || !isNumber(password) || !isValidLength(password)) {
      passwordInvalid();
      return;
    }

    if (!isValidEmail(email)) {
      emailInvalid();
      return;
    }


    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const data = await response.json();
      console.log('Registration successful', data);
      signUpSuccess();
      
      setTimeout(() => {
        goSignIn();
        changePage();
        setEmail('');
        setPassword('');
        setFullName('');
        
      }, 1000);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }
  

  return (
    <section>
      <h1 className={`text-4xl text-[#059212] font-extrabold text-center pb-10 ${raleway.className}`}>Sign Up</h1>
        <form className="grid grid-cols-1 gap-4 relative" onSubmit={(e) => {
          e.preventDefault();
          register();
        }}>
          <InputWrapper
            outlineColor="green-200"
            iconSrc="/icon/farmer.svg"
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setFullName(e.target.value)}
          />
          <InputWrapper
            outlineColor="green-200"
            iconSrc="/icon/mail.svg"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          {email !== '' &&
          <div className={`absolute translate-y-[110px] w-full rounded-md transition ease-in duration-300 ${isValidEmail(email) ? "opacity-0" : "opacity-100"} bg-[rgba(242,117,83,0.49)]`}>
            <h1 className="text-center text-white font-bold p-1">Enter valid email address</h1>
          </div>
        }
          <InputWrapper
            outlineColor="green-200"
            iconSrc="/icon/padlock.svg"
            placeholder="Password"
            type="password"
            value={password}  
            onChange={(e) => setPassword(e.target.value)}
            />

          {password !== '' &&           
          <section className={`outline ${isCapital(password) && isNumber(password) && isValidLength(password) ? 'outline-green-400' : 'outline-red-400'} p-2 rounded-lg bg-white`}>
            <ul>
              <li className={`text-[#059212] ${raleway.className} ${isCapital(password) ? 'text-[#059212]' : 'text-red-500'}`}>At least one capital letter</li>
              <li className={`text-[#059212] ${raleway.className} ${isValidLength(password) ? 'text-[#059212]' : 'text-red-500'}`}>At least 8 characters</li>
              <li className={`text-[#059212] ${raleway.className} ${isNumber(password) ? 'text-[#059212]' : 'text-red-500'}`}>At least one number</li>
            </ul>
          </section>}
          
          <Button type="submit" variant="gradient" color="deep-orange" className="mt-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">Sign Up</Button>

          <div>
            <p className={`text-center mt-5 ${kotta.className}`}>Have an account? <a onClick={changePage} className="text-[#059212] underline cursor-pointer duration-300 transition ease-in-out hover:text-[#5ff16e]">Sign In</a></p>
          </div>
        </form>
    </section>
  );
}
