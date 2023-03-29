import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../State';
import { useState } from 'react';

const registerSchema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
})
const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
})

const initialValuesRegister = {
  name: '',
  email: '',
  password: '',
}
const initialValuesLogin = {
  email: '',
  password: '',
}

export default function Form({ pageType }) {
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const routeButton = (path, text) => {
    const routeToPath = () => { navigate(path); };

    return <button className="underline text-green-800 mt-3" type="button" onClick={routeToPath}>{text}</button>
  };

  const register = async (values, onSubmitProps) => {

    const savedUserResponse = await fetch(
      'http://localhost:3001/auth/register',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    await savedUserResponse.json().then((res) => {
      if (res.error) { setError(res.error); }
      else {
        onSubmitProps.resetForm();
        setError('');
        dispatch(
          setLogin({
            user: res.user,
            token: res.token,
          })
        )
        navigate('/home');
      }
    });
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedInResponse.status === 200) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      onSubmitProps.resetForm();
      setError('');
      navigate("/home");
    }
    else {
      setError(loggedIn.msg);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form className="m-4 bg-chess-green border border-black rounded-lg p-5" onSubmit={handleSubmit}>
          {isRegister &&
            <div className="flex h-14 justify-between">
              <label className="font-bold mr-5" htmlFor="name">Name: </label>
              <div>
                <input className="w-full py-1 px-2 rounded-lg" value={values.name} name="name" placeholder="Your Name" onBlur={handleBlur} onChange={handleChange} />
                <div className="text-xs text-red-700">{touched.name && errors.name}</div>
              </div>
            </div>
          }

          <div className="flex h-14 justify-between">
            <label className="font-bold mr-5" htmlFor="email">Email: </label>
            <div>
              <input className="w-full py-1 px-2 rounded-lg" value={values.email} type="email" name="email" placeholder="Your Email" onBlur={handleBlur} onChange={handleChange} />
              <div className="text-xs text-red-700">{touched.email && errors.email}</div>
            </div>
          </div>

          <div className="flex h-14 justify-between">
            <label className="font-bold mr-5" htmlFor="password">Password: </label>
            <div>
              <input className="w-full py-1 px-2 rounded-lg" value={values.password} type="password" name="password" onBlur={handleBlur} onChange={handleChange} />
              <div className="text-xs text-red-700">{touched.password && errors.password}</div>
            </div>
          </div>

          <div className="w-full text-center">
            <button className="font-bold text-white shadow px-3 py-2 rounded-lg bg-slate-700" type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </div>

          <p className='text-center text-red-600 text-md mt-3'>{error}</p>
          {isLogin ? <div>Don't have an account? {routeButton('/register', 'Sign Up!')}</div> : <div>Already have an account? {routeButton('/', 'Login')}</div>}
        </form>
      )}

    </Formik>
  )
}
