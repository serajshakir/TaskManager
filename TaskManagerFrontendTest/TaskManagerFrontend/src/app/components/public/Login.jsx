// src/app/components/public/Login.jsx

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../../configurations/useAuth';
import { createAxios } from '../../configurations/createAxios';

function Login({ onLoginSuccess }) {
  const { logedIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },

    validationSchema: yup.object({
      userName: yup.string().required('User Name is required'),
      password: yup.string().required('Password is required'),
    }),

    onSubmit: (values) => {
      createAxios()
        .post('/ApplicationUser/Authenticate', values)
        .then((res) => {
          if (res.data?.result?.isSuccess) {
            logedIn({
              isLogin: true,
              token: res.data.token,
              userName: res.data.userName,
            });

            if (onLoginSuccess) onLoginSuccess();
          }
        });
    },
  });

  return (
    <div className="w-full max-w-md rounded-3xl bg-[#071129] px-10 py-12 shadow-2xl">
      <div className="mb-10">
        <h2 className="text-center text-xl mb-3 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6 flex flex-col items-center space-y-8 w-full">
        <div>
          <label htmlFor="userName" className="mb-1 block text-m text-left font-semibold text-gray-200">
            User Name
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="   Enter your username"
            onChange={formik.handleChange}
            value={formik.values.userName}
            className={`w-80 rounded-xl mb-2 border-0 bg-white/5 px-4 py-4 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm ${
              formik.errors.userName ? 'ring-red-500' : ''
            }`}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-m text-left font-semibold text-gray-200">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="   Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={`w-80 rounded-xl mb-3 border-0 bg-white/5 px-4 py-4 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm ${
              formik.errors.password ? 'ring-red-500' : ''
            }`}
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-80 rounded-xl cursor-pointer bg-indigo-500 py-4 text-m font-bold text-white transition-all hover:bg-indigo-400 active:scale-[0.98]"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;