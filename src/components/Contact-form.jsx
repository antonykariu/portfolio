import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useClippy } from "@react95/clippy";
import { AnimateOnChange } from "react-animation";
import appendSpreadsheet from "../data";

import "./contact.scss";

const ContactForm = () => {
  const { clippy } = useClippy();

  const [sent, setSent] = useState(false);

  const myForm = () => {
    return (
      <>
        <p>
          Get in touch{" "}
          <span role="img" aria-label="Hello">
            👋
          </span>
        </p>
        <Formik
          initialValues={{
            username: "",
            email: "",
            company: "",
            message: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required *";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await clippy.play("SendMail");

            const time = Date.now();
            const newRow = {
              Timestamp: time,
              Description: values.message,
              Name: values.username,
              Email: values.email,
              Company: values.company,
            };
            appendSpreadsheet(newRow);
            setTimeout(() => {
              setSent(true);
            }, 6000);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="contact-form" id="contact">
              <div>
                <label htmlFor="username">Name</label>
                <Field type="text" name="username" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                />
              </div>
              <div className="error">
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="company">Company</label>
                <Field type="text" name="company" />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <Field type="text" name="message" as="textarea" />
              </div>
              <div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  };

  const recorded = () => {
    return (
      <div className="sent">
        <h2>Response has been saved!</h2>
        <span role="img" aria-label="check">
          {" "}
          ✔
        </span>
        {clippy.play("Congratulate")}
      </div>
    );
  };

  return (
    <AnimateOnChange
      animationIn="bounceIn"
      animationOut="bounceOut"
      durationOut={1000}
    >
      <div className="contact">{sent ? recorded() : myForm()}</div>
    </AnimateOnChange>
  );
};

export default ContactForm;
