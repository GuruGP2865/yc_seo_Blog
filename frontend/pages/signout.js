import {useEffect} from 'react'
import Layout from "../components/Layout"
import {isAuth, signout } from '../actions/auth'
import Router from 'next/router';
import Sidebar from '../components/Sidebar';

const Signout = ({ history }) => {
  const handleSignout = () => {
    signout(() => {
      Router.push(`/`);
    });
  };

  useEffect(() => {
        isAuth() ? null : Router.push(`/`);
    }, []);

  return (
    <Layout>
     
       <div className="entire__container__block">

       <Sidebar page="" />
      <div className="post__container">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <h1 className="mt-8 text-2xl xl:text-2xl font-extrabold">
              Do you want to sign out?
            </h1>
          <button onClick={handleSignout} type="button" class="mt-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Signout Now
          </button>
        </div>
    
       </div>
        
      
      </div>
         

  
      
    </Layout>
  );
};

export default Signout;
