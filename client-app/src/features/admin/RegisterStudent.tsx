import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Divider, Header, Message, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/MyTextInput";
import { useStore } from "../../app/stores/store";
import { history } from "../..";
import NavBar from "../../app/layout/NavBar";

export default observer(function RegisterStudent() {
  const {userStore: { register }} = useStore();

  const selectedAccount = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    passwordHash: '',
    role: 'student',
    error: null,
  };
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("A valid email is required"),
    username: Yup.string().required("Username is required"),
    passwordHash: Yup.string().required("Password is required"),
  });

  return (
    <>
     
      <Header as="h1" content="Register new student" />
      <Divider />
      <Segment><NavBar></NavBar></Segment>
      <Formik
        initialValues={selectedAccount}
        onSubmit={(values, { setErrors }) =>
          register(values).catch((error) => setErrors({ error }))
        }
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
          <Form
            className="ui form error"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <ErrorMessage
              name="error"
              render={() => <Message negative content={errors.error} />}
            />
            <Header sub content="Register Student" />
            <MyTextInput name="firstname" placeholder="First name" />
            <MyTextInput name="lastname" placeholder="Last name" />
            <MyTextInput name="username" placeholder="Username" />
            <Divider />
            <MyTextInput name="email" type="email" placeholder="Email" />
            <MyTextInput
              name="passwordHash"
              type="password"
              placeholder="Password"
            />
            <Divider />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              positive
              type="submit"
              content="Submit"
            />
            <Button
              basic
              color="red"
              content="Cancel"
              onClick={() => history.push("/admin/choose-account")}
            />
          </Form>
        )}
      </Formik>
    </>
  );
});
