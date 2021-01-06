import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Router from 'next/router'
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { reset } from '../../../../actions/auth';
import Layout from "../../../../components/Layout"


const Reset = () => {

 const router = useRouter();

  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    token: "",
  });

  const { password1, password2, token } = formData;


  useEffect(() => {
     if (router.asPath !== router.route) {
        const token = router.query.token;
       //console.log(router);
       let { name } = jwt.decode(token);

        if (token) {
        setFormData({ ...formData, name, token });
       }
     }
    
  }, [router]);


   const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password1 === password2 && password1 && password2) {
      reset(password1, token).then(data => {
       if (data.error) {
        toast.error(`${data.error}`);
       } else {
        setFormData({ ...formData, password1: "", password2: "" });
        toast.success(data.message);
       }
      })
    } else {
      toast.error(`Password Don't matchesd`);
    }
  };


  return (
   <Layout>
   
   <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Reset Your Password
            </h1>
            <div className="w-full flex-1 mt-8 text-indigo-500">
              <form
                className="mx-auto max-w-xs relative "
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="password"
                  onChange={handleChange("password1")}
                  value={password1}
                />
                <input
                  className="w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Confirm password"
                  onChange={handleChange("password2")}
                  value={password2}
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  
                  <span className="ml-3">Submit</span>
                </button>
              </form>
            </div>
          </div>
    </div>
   
   </Layout>
  )


}

export default Reset;
