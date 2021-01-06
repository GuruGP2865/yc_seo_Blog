import {useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../components/Layout"
import {forgot} from "../../actions/auth"
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {

 const [formData, setFormData] = useState({
    email: "",
    textChange: "Submit",
  });

  const { email, textChange } = formData;

  //Handle change from input
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  //submit data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
     forgot(email).then(data => {
      if (data.error) {
        toast.error(data.error);
      } else {
       toast.success("Please Check your email");
      }
     })
    } else {
      toast.error("Please fill all fields");
    }
  };


  return (
    <Layout>
    
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Forget Password
            </h1>
            <div className="w-full flex-1 mt-8 text-indigo-500">
              <form
                className="mx-auto max-w-xs relative "
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  
                  <span >Submit</span>
                </button>
              </form>
            </div>
          </div>
      
    </div>

    </Layout>
  );

}


export default Forgot;