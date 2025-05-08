import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import Title from '../ReUsables/Title'
import { Label, Button, Form, Input, FormFeedback } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

document.title = "ORDER UP - Contact"


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

  useEffect(() => {
    document.title = "ORDER UP - Contact"
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
    <>
      <div className="contact-page">
        <img loading='lazy' className="contact-Img" src="contact-us2.jpg" alt="Contact Us" />
        <div className="container mt-5">
          <p>
            Welcome to <strong>Order Up</strong>, we’re always eager to hear from you. Whether you want to
            share feedback, ask questions, or simply say hello, we’re here and ready to listen. At <strong>Order Up</strong>,
            your thoughts and suggestions help us grow, improve, and deliver a better experience.
            Click for <a href="#contactForm" data-bs-toggle="offcanvas" data-bs-target="#contactForm"> Contact Form</a>
          </p>
          <p><b>You can contact us for any of the following:</b></p>
          <ul>
            <li className="mb-3"><b>Website Feedback:</b> If you have any thoughts, opinions, or comments about our website, its design, or functionality, we would love to hear them. Your feedback helps us create a better user experience.</li>
            <li className="mb-3"><b>Content Queries:</b> Have a question or concern about our content? Whether you’re looking for clarification or need more details on a particular topic, feel free to ask. We’re here to provide the information you need.</li>
            <li className="mb-3"><b>Corrections or Updates:</b> If you come across any information in our posts that seems incorrect, outdated, or missing, let us know. We strive to provide accurate, up-to-date content, and your insights help us ensure we’re delivering the best.</li>
            <li className="mb-3"><b>Design Suggestions:</b> Do you have ideas on how we can improve our website’s appearance or usability? Whether it's changing the theme, colors, or layout, we’d appreciate your thoughts.</li>
            <li className="mb-3"><b>Improvement Suggestions:</b> We’re always looking for ways to improve <strong>Order Up</strong>. If you have any suggestions to enhance our site, whether in terms of content, tools, or features, don’t hesitate to share.</li>
            <li className="mb-3"><b>Technical Issues:</b> If you encounter any errors, bugs, or issues while using our site, please report them to us. We aim to provide a seamless experience, and your reports help us address problems quickly.</li>
          </ul>
          <p className="mb-5 ">We welcome all your comments, suggestions, and concerns, as they help us make <strong>Order Up</strong> a better platform for everyone.</p>
        </div>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="contactForm" aria-labelledby="contactFormLabel">
          <div className="offcanvas-header text-center">
            <h3 className="text-center w-100  mt-3" id="contactFormLabel"> Contact Us</h3>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <Form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <Label className="form-label m-0">Name</Label>
                <Input
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  invalid={formik.touched.name && formik.errors.name ? true : false}
                />
                {formik.touched.name && formik.errors.name && <FormFeedback>{formik.errors.name}</FormFeedback>}
              </div>
              <div className="mb-3">
                <Label className="form-label m-0">Email</Label>
                <Input
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  invalid={formik.touched.email && formik.errors.email ? true : false}
                />
                {formik.touched.email && formik.errors.email && <FormFeedback>{formik.errors.email}</FormFeedback>}
              </div>
              <div className="mb-3">
                <Label className="form-label m-0">Upload Image (Optional)</Label>
                <Input type="file" className="form-control" name="image" onChange={handleImageChange} />
                {imagePreview && (
                  <div className="mt-2">
                    <h5>Image Preview:</h5>
                    <img loading='lazy' src={imagePreview} alt="Preview" style={{ width: '100px', height: 'auto' }} />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <Label className="form-label m-0">Feedback</Label>
                <Input
                  type="textarea"
                  name="feedback"
                  className="form-control"
                  rows={4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.feedback}
                  invalid={formik.touched.feedback && formik.errors.feedback ? true : false}
                />
                {formik.touched.feedback && formik.errors.feedback && <FormFeedback>{formik.errors.feedback}</FormFeedback>}
              </div>
              <Button className="btn btn-success w-100 mt-3" type="submit">Submit</Button>
            </Form>
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
