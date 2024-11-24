import React, { useContext, useEffect } from 'react'
import BreadCrumbs from '../ReUsables/BreadCrumbs'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Label, Form, Input, FormFeedback } from "reactstrap";
import Swal from 'sweetalert2';

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, setPage, setCartItems, setOrder, user, setUser } = useContext(MenuContext)
  useEffect(() => {
    document.title = "ORDER UP - Checkout"
    setPage("Checkout")
  }, [])


  const sum = items => { return items.reduce((prevVal, currVal) => prevVal + currVal, 0) }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    number: Yup.string()
      .matches(/^\d{11,}$/, "Phone number must be at least 11 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email('Invalid email format')
      .matches(/^[\w.%+-]+@[\w.-]+\.[com]{3}$/, 'Email must include a .com domain')
      .required('Email is required'),
    address: Yup.string()
      .min(8, "Address must be at least 8 characters")
      .required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: user.email,
      number: "",
      address: ""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form val", values)
      const data = new FormData();
      data.append('name', values.name);
      data.append('email', user.email);
      data.append('number', values.number);
      data.append('address', values.address);
      data.append('Order', cartItems.map(item => item.name).join('\n'));
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
      if (res.success) {
        // Swal.fire({
        //   title: "Success",
        //   text: "Order Placed",
        //   icon: "success"
        // });
        console.log("Submitted")
        const timestamp = Date.now();
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        setOrder(true)
        const order = {
          items: cartItems.map(item => item.name).join('\n'),
          date: formattedDate,
          total: sum(cartItems.map((item) => item.price))
        };
        setUser(prevUser => ({
          ...prevUser,
          orderHistory: [...(prevUser.orderHistory || []),
          order
        ]
        }));
        navigate("/orderComplete")
        setCartItems([])
      }
    }
  });

  return (
    <div>
      <BreadCrumbs />
      {cartItems.length > 0 && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="row container-fluid">
            <div className="col-1"></div>
            <div className="col-6 order-lg-1 column-2 order-biliing">
              <hr className='m-0 p-0' />
              <h4 className='mt-5'>Billing Details</h4>
              <div className="mb-3">
                <Label className="m-0" htmlFor="name">
                  <b>
                    Name <span className="text-danger">*</span>
                  </b>
                </Label>
                <Input
                  name="name"
                  className="form-control w-75"
                  placeholder="Enter name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name || ""}
                  invalid={formik.touched.name && formik.errors.name ? true : false}
                />
                {formik.touched.name && formik.errors.name ? (
                  <FormFeedback type="invalid">{formik.errors.name}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="m-0" htmlFor="number">
                  <b>
                    Phone number <span className="text-danger">*</span>
                  </b>
                </Label>
                <Input
                  name="number"
                  className="form-control w-75"
                  placeholder="0306-12345678"
                  type="tel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.number || ""}
                  invalid={formik.touched.number && formik.errors.number ? true : false}
                />
                {formik.touched.number && formik.errors.number ? (
                  <FormFeedback type="invalid">{formik.errors.number}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-4">
                <Label className="m-0" htmlFor="email">
                  <b>
                    Email <span className="text-danger">*</span>
                  </b>
                </Label>
                <Input
                  name="email"
                  className="form-control w-75"
                  placeholder="Enter your email"
                  type="email"
                  disabled
                  value={user.email}
                  invalid={formik.touched.email && formik.errors.email ? true : false}
                />
                {formik.touched.email && formik.errors.email ? (
                  <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-4">
                <Label className="m-0" htmlFor="address">
                  <b>
                    Address <span className="text-danger">*</span>
                  </b>
                </Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.address && !!formik.errors.address}
                  rows={4}
                />
                {formik.touched.address && formik.errors.address ? (
                  <FormFeedback>{formik.errors.address}</FormFeedback>
                ) : null}
              </div>
            </div>
            <div className="col-4 border border-warning column-1 order-lg-2 mx-3 mb-3 order-details">
              <div className="d-flex container mt-3 flex-column">
                <h4>Your Order</h4>
                <div className="d-flex flex-row container p-0 mt-2">
                  <span className="me-auto">
                    <b>Product</b>
                  </span>
                  <span className="ms-auto">
                    <b>Subtotal</b>
                  </span>
                </div>
                <hr className="m-0 p-0 " />
              </div>
              {cartItems.map((item, idx) => (
                <div className="d-flex flex-row container" key={idx}>
                  <span className="text-secondary me-auto mb-2">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="ms-auto">
                    <b>Rs. {item.price}</b>
                  </span>
                </div>
              ))}
              <hr className="m-0 p-0 " />
              <div className="d-flex container my-2">
                <span className="me-auto">
                  <b>Subtotal</b>
                </span>
                <span className="ms-auto">
                  <b>Rs. {sum(cartItems.map((item) => item.price))}</b>
                </span>
              </div>
              <hr className="m-0 p-0 " />
              <div className="d-flex container my-2 text-secondary">
                <span className="me-auto">
                  <b>Delivery Fee</b>
                </span>
                <span className="ms-auto">
                  <span className="me-3">Flat Rate:</span> Rs. 50
                </span>
              </div>
              <hr className="m-0 p-0 " />
              <div className="d-flex container my-2">
                <span className="me-auto">
                  <b>Total</b>
                </span>
                <span className="ms-auto">
                  Rs. {sum(cartItems.map((item) => item.price)) + 50}
                </span>
              </div>
              <hr className="m-0 p-0 " />
              <div className="container my-2">
                <span>
                  <b>Payment Method</b>
                </span>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Cash on Delivery (COD)
                  </label>
                </div>
              </div>
              <hr className="m-0 p-0 " />
              <div className="d-flex">
                <button type="submit" className="btn btn-success my-3 w-100">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
      {cartItems.length === 0 && (
        <>
          <div className="emptyCart">
            <center>
              <img src="empty-cart.jpg" alt="Empty cart" />
            </center>
          </div>
          <h2 className="text-center mt-5">
            No Items in cart. <Link to="/menu">Click to add!</Link>
          </h2>
        </>
      )}
    </div>

  )
}

export default Checkout
