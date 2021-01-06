import Layout from "../components/Layout"
import { ToastContainer, toast } from "react-toastify";
import { useState } from 'react';
import Link from 'next/link'
import Router from 'next/router'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {isAuth, login, authenticate, sendFacebookToken, sendGoogleToken } from '../actions/auth'
import 'react-toastify/dist/ReactToastify.css';
import { FACEBOOK_LOGIN_CLIENT, GOOGLE_LOGIN_CLIENT} from '../config'

const Signin = () => {

const [formData, setFormData] = useState({
    email: "",
    password1: "",
  });

  const { email, password1 } = formData;

  //Handle change from input
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };




  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "Admin"
        ? Router.push(`/admin`)
        : Router.push(`/`);
    });
  };

  const responseFacebook = (response) => {
    sendFacebookToken(response.userID, response.accessToken).then(data => {
     if (data.error) {
      toast.error(data.error);
     } else {
      informParent(data);
     }
    });
  };

  //Get response from google
  const responseGoogle = (response) => {
    sendGoogleToken(response.tokenId).then(data => {
     if (data.error) {
      toast.error(data.error);
     } else {
      informParent(data);
     }
    });
  }

const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password1) {
      login(email, password1).then(data => {
       if (data.error) {
        toast.error(data.response.data.errors);
       } else {
        console.log(data);
        authenticate(data, () => {
            setFormData({
              ...formData,
              email: "",
              password1: "",
            });
          });
          isAuth() && isAuth().role === "Admin"
            ? Router.push(`/admin`)
            : Router.push(`/`);
          toast.success(`Hey ${data.user.name}, Welcome back`);
       }
      });
    } else {
      toast.error("please fill all fields");
    }
  };




 return (
  <Layout>

  <div className="entire__container__block">
       <ToastContainer />
  <div className="entire__container__block">
  
      <div className="bg-grey-lighter min-h-screen flex flex-col">
      
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            
               <h1 className="text-2xl xl:text-2xl font-extrabold">
              Sign In for Your Coimbatore
            </h1>
            <form
              className="w-full flex-1 mt-8 text-indigo-500"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto max-w-xs relative ">
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
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-600 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Login
                </button>
                <Link
                  href="/users/forgotpassword"
                  className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2"
                >
                  Forget password?
                </Link>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Sign Up
                </div>
              </div>

              <div className="flex flex-col items-center">
                <GoogleLogin
                  clientId={`${GOOGLE_LOGIN_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    >
                      Sign In with Google
                    </button>
                  )}
                />

                <FacebookLogin
                  appId={`${FACEBOOK_LOGIN_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      className="mt-3 w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    >
                      Sign In with Facebook
                    </button>
                  )}
                />

                <Link href="/register">
                  <a
                  className="mt-3 w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  
                  target="_self"
                >
                  <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500" />
                  <span className="ml-4">Sign Up</span>
                </a>
                </Link>
                
              </div>
            </form>
            </div>
        </div>
      
    </div>

      
    </div>


    
    
  </Layout>
 )
}

export default Signin;