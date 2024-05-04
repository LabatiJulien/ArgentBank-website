import React, { useState } from 'react';
import '../../Css/Global.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/reducers'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { FaUserCircle } from 'react-icons/fa'; 

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', formData);
        console.log(response.data);
        console.log(response.data.body.token);
        dispatch(loginSuccess({ token: response.data.body.token }));
        navigate('/profile'); 
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
        <FaUserCircle />
          <h1>Sign In</h1>
          {errors.email && <p className="error-message">{errors.email}</p>}
          {errors.password && <p className="error-message">{errors.password}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignIn;
