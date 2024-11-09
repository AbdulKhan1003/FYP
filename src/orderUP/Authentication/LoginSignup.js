import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MenuContext } from '../AllRestaurants/RestaurantsContext';



function LoginSignup() {
  const [action, setAction] = useState('Login')
  const [loading, setLoading] = useState(null);
  const {user} = useContext(MenuContext)
  const nav = useNavigate()

  document.title = `Order Up - ${action} Page`


useEffect(()=>{
  console.log(`user aya, `,user)
  if (Object.keys(user).length > 0) {
    localStorage.setItem("LoggedIn", 1); 
    window.location.reload()
    }
},[user])
  
  const validationSchema = Yup.object().shape({
    name: action === 'SignUp' ? Yup.string().required('Name is required') : Yup.string(),
    email: Yup.string()
      .email('Invalid email format')
      .matches(/^[\w.%+-]+@[\w.-]+\.[com]{3}$/, 'Email must include .com')
      .required("Email shouldn't be empty"),
    password: Yup.string()
      .required('Password is required')
      .min(8, "Password should be greater than 7 numbers")
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      formik.resetForm()
      if (action === "SignUp") {
        try {
          setLoading(true);
          // API call to sign up
          const { data } = await axios.post("http://192.168.1.10:8080/api/auth/register", {
            name: values.name,
            email: values.email,
            password: values.password,
            profilePicture: "66d1b047b588f463a39a8938",
          });
            Swal.fire({
              title: "Success",
              text: data.message,
              icon: "success"
            });
            setAction("Login")
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.response.data.message || "An unexpected error occurred",
            icon:'warning'
          });
          console.log(error);
        } finally {
          setLoading(false);
        }
      }        
        else if (action === "Login") {
          try {
            setLoading(true);
            if (!values.email || !values.password) {
              alert("Please enter email and password");
            }
            //API call to SIGN IN
            const { data } = await axios.post("http://192.168.1.10:8080/api/auth/login", {
              email: values.email,
              password: values.password,
            });
              Swal.fire({
                title: "Success",
                text: data.message,
                icon: "success"
              });
            console.log("SIGN IN LOG Data => ", data);
            localStorage.setItem("User",JSON.stringify(data.user))
            setLoading(false);
      
            nav("/home")
          } catch (error) {
            Swal.fire({
              title: "Error",
              text: error.response.data.message || "An unexpected error occurred",
              icon:"warning"
            });
          } finally {
            setLoading(false);
          }
        }
    },
  });

  const actionSignUp = () =>{
    setAction('SignUp')
    formik.resetForm()
  }
  const actionLogin = () =>{
    setAction('Login')
    formik.resetForm()
  }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100 bg-img'>
      <div className='bg-form pt-5'>
        <div className="btn-group d-flex w-50 mx-auto" role="group" aria-label="Basic example">
          <button type="button" onClick={actionSignUp} className="btn btn-purple btn-outline-primary">SignUp</button>
          <button type="button" onClick={actionLogin} className="btn btn-purple btn-outline-primary ms-1">Login</button>
        </div>
        <h2 className='text-center text-white mt-5'>{action} <span>Page</span></h2>
        <div className="under mx-auto p-0 mb-5"></div>
        <Form onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}>
          {action === 'SignUp' &&
            <div className='Person personDiv m-4 '>
              <img src='person.png' alt="" />
              <Input
                type="text"
                name="name"
                className='w-100'
                value={formik.values.name}
                placeholder='Enter your name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.name && !!formik.errors.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <FormFeedback className='feedback-form' >{formik.errors.name}</FormFeedback>
              ) : null}
            </div>}
          <div className='Email emailDiv m-4'>
            <img src='email.png' alt="" />
            <Input
              type="email"
              name="email"
              value={formik.values.email}
              placeholder='Enter your email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.email && !!formik.errors.email}
            >
            </Input>
            {formik.touched.email && formik.errors.email ? (
              <FormFeedback className='feedback-form'  >{formik.errors.email}</FormFeedback>
            ) : null}
          </div>
          <div className='Password passDiv m-4'>
            <img src='pass.png' alt="" />
            <Input
              type="password"
              name="password"
              className='w-100'
              value={formik.values.password}
              placeholder='Enter your password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.password && !!formik.errors.password}
            >
            </Input>
            {formik.touched.password && formik.errors.password ? (
              <FormFeedback className='feedback-form'  >{formik.errors.password}</FormFeedback>
            ) : null}
          </div>
          <div className='d-flex justify-content-center flex-wrap mb-5'>
            <Button type='submit' className={`btn btn-purple btn-outline-success me-3 ms-3`}>{action === "Login" ? 'Login' : 'SignUp'}</Button>
          </div>
        </Form>
        <Toaster />

      </div>
    </div>
  )
}

export default LoginSignup
