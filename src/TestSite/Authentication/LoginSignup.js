import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';



function LoginSignup() {
  const [action, setAction] = useState('Login')
  const [person, setPerson] = useState(JSON.parse(localStorage.getItem('Person')))
  const nav = useNavigate()

  useEffect(() => {
    console.log(person)
    localStorage.setItem('Person', JSON.stringify(person))
  }, [person])


  document.title = `Order Up - ${action} Page`

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
      console.log("Form data on submit:", values);
      try {
        const data = new FormData();
        data.append('name', values.name);
        data.append('email', values.email);
        data.append('password', values.password)

        if (action === "SignUp") {
          let emailExists = false;
          person.forEach((pers) => {
            if (pers.email === values.email) {
              emailExists = true;
              toast.error("Email already exists")
            }
          });
          if (!emailExists) {
            let newPerson = {
              name: values.name,
              email: values.email,
              password: values.password
            }
            setPerson([...person, newPerson])
            toast.success("SignUp Successful.")
            formik.resetForm()
          }
        }
        else if (action === "Login") {
          if (person.length > 0) {

            const user = person.find((person) => person.email === values.email && person.password === values.password);

            if (user) {
              formik.resetForm();
              localStorage.setItem('LoggedIn', JSON.stringify(1));
              nav('/home');
              window.location.reload();
              toast.success("Login successful");
            } else {
              toast.error("Invalid Credentials");
              nav('/');
            }
          }
          else {
            toast.error("Invalid credientials. Check your sign up first")
          }
        }
      } catch (error) {
        toast.error("Oops! Try again later!", error);
        formik.resetForm()
      }
    },
  });

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100 bg-img'>
      <div className='bg-form pt-5'>
        <div className="btn-group d-flex w-50 mx-auto" role="group" aria-label="Basic example">
          <button type="button" onClick={() => { setAction('SignUp') }} className="btn btn-purple btn-outline-primary">SignUp</button>
          <button type="button" onClick={() => { setAction('Login') }} className="btn btn-purple btn-outline-primary ms-1">Login</button>
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
              {action !== 'SignUp' && <p className="text-white m-4">Forgot Password? <span style={{ color: 'blue', cursor: 'pointer' }}>Click here!</span></p>}
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
