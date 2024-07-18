"use client";
import InputWrapper from "./InputWrapper";
import { kotta, junge, raleway } from "./Fonts";
import {Button} from "./MT";
import { useState } from "react";
import { redirect } from "next/navigation";
import isValidEmail from "./Function/function";
import { ToastContainer, toast, Flip } from 'react-toastify';

export default function Login({changePage}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const failedLogin = () => {toast.error('Login failed', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
    });}

  const successLogin = () => {toast.success('Login successful', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
    });}

  async function login(){
    try{
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });

      if(!response.ok){
        failedLogin();
        throw new Error('Login failed');
      }

      successLogin();
      const data = await response.json();
      console.log('Login successful', data);
      
      setTimeout(() => {
        window.location.href = '/Home';
      }, 1000);

    } 
    catch (error) {
      console.error('Login failed', error);

    }
  }

  return (
    <section>
      <h1 className={`text-4xl text-[#059212] font-extrabold text-center pb-10 ${raleway.className}`}>Login</h1>
        <form className="grid grid-cols-1 gap-4" onSubmit={(e)=>{
          e.preventDefault();
          login();
        }}>
          {email !== '' &&
            <div className={`absolute translate-y-[40px] w-[290px] rounded-md transition ease-in duration-300 ${isValidEmail(email) ? "opacity-0" : "opacity-100"} bg-[rgba(242,117,83,0.49)]`}>
              <h1 className="text-center text-white font-bold p-1">Enter valid email address</h1>
            </div>
          }
          <InputWrapper
            outlineColor="green-300"
            iconSrc="/icon/mail.svg"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            />
          <InputWrapper
            outlineColor="green-200"
            iconSrc="/icon/padlock.svg"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
          <Button type="submit" variant="gradient"  color="deep-orange" className="mt-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">Sign In</Button>

          <div>
            <p className={`text-center mt-5 ${kotta.className}`}>Don't have an account? <a onClick={changePage} className="text-[#059212] cursor-pointer underline duration-300 transition ease-in-out hover:text-[#5ff16e]">Register</a></p>
          </div>
        </form>
    </section>
  );
}
