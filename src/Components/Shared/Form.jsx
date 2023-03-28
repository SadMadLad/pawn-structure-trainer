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

    return <button type="button" onClick={routeToPath}>{text}</button>
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
      navigate("/home");
      onSubmitProps.resetForm();
    }
    else {
      setError(loggedInResponse.error);
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
        <form className="bg-orange-500" onSubmit={handleSubmit}>
          {isRegister &&
            <div>
              <label htmlFor="name">Name</label>
              <input value={values.name} name="name" placeholder="Your Name" onBlur={handleBlur} onChange={handleChange} />
              <div>{touched.name && errors.name}</div>
            </div>
          }

          <div>
            <label htmlFor="email">Email</label>
            <input value={values.email} type="email" name="email" placeholder="Your Email" onBlur={handleBlur} onChange={handleChange} />
            <div>{touched.email && errors.email}</div>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input value={values.password} type="password" name="password" onBlur={handleBlur} onChange={handleChange} />
            <div>{touched.password && errors.password}</div>
          </div>

          <button type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>

          <p>{error}</p>
          {isLogin ? <div>Don't have an account? {routeButton('/register', 'Sign Up!')}</div> : <div>Already have an account? {routeButton('/', 'Login')}</div>}
        </form>
      )}

    </Formik>
  )
}
