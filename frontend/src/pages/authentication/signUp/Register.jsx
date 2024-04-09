import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthContext';

const Register = () => {
    const {registerUser} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Add more password pattern validation if needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
  
      console.log('Form submitted:', formData);
      registerUser(e);
    } else {
      console.log('Form has errors. Please fix them.');
    }
  };

  return (
<form onSubmit={handleSubmit}>

  <div className=" flex flex-col items-center justify-center text-white  px-6 py-0 mx-auto mb-20 lg:py-0">

    <div className="w-full mb-20 rounded-lg shadow border mt-0 sm:max-w-md xl:p-0 bg-black border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                  Create and account
              </h1>
                    <div>
                      <input value={formData.username} onChange={handleChange} type="username" name="username" id="username" className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="username....." required/>
                      {errors.username && <p>{errors.username}</p>}
                    </div>
                  <div>
                 
                      <input type="email" name="email" value={formData.email} onChange={handleChange}  id="email" className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required/>
                      {errors.email && <p>{errors.email}</p>}
                  </div>
                  <div>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} id="password" placeholder="password" className="border   sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" required/>
                      {errors.password && <p>{errors.password}</p>}
                  </div>

                  <div>
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} id="confirm-password" placeholder="confirmPassword" className="  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" required/>
                      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                  </div>

                  <button type="submit" className="w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  
                  
                  <p className="text-sm font-light text-gray-500 ">
                      Already have an account? <a href="/auth/login" className="font-medium  hover:underline text-primary-500">Login here</a>
                  </p>
           
          </div>
      </div>
  </div>
      

      

    

    </form>
  );
};

export default Register;