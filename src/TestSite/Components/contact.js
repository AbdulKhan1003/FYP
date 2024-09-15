import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import Title from '../ReUsables/Title'
import { Label, Button, Form, Input, FormFeedback } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

document.title="ORDER UP - Contact"


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
  .email('Invalid email format')
    .matches(/^[\w.%+-]+@[\w.-]+\.[com]{3}$/, 'Email must include a .com domain')
    .required('Email is required'),
  feedback: Yup.string()
    .required('Feedback is required')
});

function Contact() {
  const [imagePreview, setImagePreview] = useState(null);
  
  useEffect(()=>{
  document.title="ORDER UP - Contact"
  })

  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      feedback: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form val", values)
      const data = new FormData();
      data.append('name', values.name);
      data.append('email', values.email);
      data.append('feedback', values.feedback);
      if (values.image != null) {
        data.append('image', values.image);
      }

      data.append("access_key", "5f7651c2-7a4a-4676-b9dc-df9460a25ad5");

      const json = JSON.stringify(Object.fromEntries(data));

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());
      console.log(res)

      if (res.success) {
        toast.success("Feedback submitted successfully!");
        setImagePreview(null)
        formik.resetForm()
      } else {
        toast.error("Failed to submit feedback.");
      }
    }
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="contact-bg container-lg w-50 pt-4">
      <Title heading='Contact Us'></Title>
      <div className="page-content container-lg mt-5">
        <Form className="" onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}>
          <div className="mb-3">
            <Label className="form-label m-0">Name</Label>
            <Input
              name="name"
              className="form-control"
              placeholder="Enter name"
              type="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name || ""}
              invalid={
                formik.touched.name && formik.errors.name ? true : false
              }
            />
            {formik.touched.name && formik.errors.name ? (
              <FormFeedback type="invalid">{formik.errors.name}</FormFeedback>
            ) : null}
          </div>
          <div className="mb-4">
            <Label className="form-label m-0">Email</Label>
            <Input
              name="email"
              className="form-control"
              placeholder="Enter your email"
              type="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email || ""}
              invalid={
                formik.touched.email && formik.errors.email ? true : false
              }
            />
            {formik.touched.email && formik.errors.email ? (
              <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
            ) : null}
          </div>
          <div className="form-group mb-4">
            <Label className="form-label m-0">Choose an Image to upload (Optional)</Label>
            <Input
              type="file"
              className="form-control-file"
              name="image"
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              invalid={
                formik.touched.image && formik.errors.image ? true : false
              }
            />
            {formik.touched.image && formik.errors.image ? (
              <FormFeedback type="invalid">{formik.errors.image}</FormFeedback>
            ) : null}
          </div>

          {imagePreview && (
            <div>
              <h5>Image Preview:</h5>
              <img src={imagePreview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
            </div>
          )}

          <div className="mb-4">
            <Label className="m-0" htmlFor="status">Feedback</Label>
            <Input
              type="textarea"
              name="feedback"
              value={formik.values.feedback}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.feedback && !!formik.errors.feedback}
              rows={4}
            >

            </Input>
            {formik.touched.feedback && formik.errors.feedback ? (
              <FormFeedback>{formik.errors.feedback}</FormFeedback>
            ) : null}
          </div>
          <div className="d-flex">
            <Button className="mb-2" type="submit" color="primary" outline>Submit</Button>
          </div>
        </Form>
        <Toaster />
      </div>
    </div>
  );
};
export default Contact;
