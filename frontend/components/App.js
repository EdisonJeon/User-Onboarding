import React, { useState, useEffect } from "react";
import formSchema from "../validation/formSchema";
import * as yup from "yup";
import axios from "axios";
import UserForm from "./UserForm";

const initialFormValues = {
  username: "",
  favLanguage: "",
  favFood: "",
  agreement: false,
};

const initialFormErrors = {
  username: "",
  favLanguage: "",
  favFood: "",
  agreement: "",
};

/*
  
  @@@@@@ CANNOT PASS PROPS WITHIN A USEEFFECT @@@@@@
  
  */

export default function App() {
  console.log("App component has fired!");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [serverSuccess, setServerSuccess] = useState();
  const [serverFailure, setServerFailure] = useState();
  const [disabled, setDisabled] = useState(false);

  const postNewUser = () => {
    axios
      .post("https://webapis.bloomtechdev.com/registration", formValues)
      .then((res) => {
        setServerSuccess(res.data.message);
        setFormValues(initialFormValues);
        setServerFailure();
      })
      .catch((err) => {
        setServerFailure(err.response.data.message);
        setServerSuccess();
        console.error("request error --> ", err);
      });
  };

  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((isValid) => setDisabled(isValid));
    return () => {
      console.log("simulating unloading effect.");
    };
  }, [formValues]);

  return (
    <div>
      <UserForm
        serverSuccess={serverSuccess}
        serverFailure={serverFailure}
        formErrors={formErrors}
        formValues={formValues}
        inputChange={inputChange}
        postNewUser={postNewUser}
        disabled={disabled}
      />
    </div>
  );
}
