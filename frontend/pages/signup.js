import { useState, useEffect } from 'react';
import Router from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import Layout from "../components/Layout"
import Link from 'next/link'
import {isAuth, signup } from '../actions/auth'
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

 const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { email, name, password1, password2 } = formData;

  useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

  //Handle change from input
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  //submit data to backend
  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
       const user = { name, email, password: password1};
        signup(user).then(data => {
         if(data.error){
          console.log(data.error);
          toast.error(data.error);
         } else {
          setFormData({
              ...formData,
              name: "",
              email: "",
              password1: "",
              password2: "",
            });
           toast.success(data.message);
         }
        })
      } else {
        toast.error("Password dont match");
      }
    } else {
      toast.error("please fill all fields");
    }
  };

 return (
  <Layout>
  
    <ToastContainer />
  <div className="entire__container__block">
  
      <div className="bg-grey-lighter min-h-screen flex flex-col">
      
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            
               <h1 className="text-2xl xl:text-2xl font-extrabold">
              Sign Up for Your Coimbatore
            </h1>
            <form
              className="w-full flex-1 mt-8 text-blue-500"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto max-w-xs relative ">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange("name")}
                  value={name}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password1")}
                  value={password1}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange("password2")}
                  value={password2}
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Register
                </button>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign with email or social login
                </div>
              </div>

              <div className="flex flex-col items-center">

              <Link href="/signin">
               <a
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  
                 
                >
                  <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500" />
                  <span className="ml-4">Sign In</span>
                </a>
              </Link>
              </div>
            </form>
            </div>
        </div>
    </div>
  </Layout>
 )
}

export default Signup;