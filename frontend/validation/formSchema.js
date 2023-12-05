import { ErrorMessage } from "formik";
import * as yup from "yup";

// SCHEMA VALIDATION EQUALS TO ELEMENTS 'VALUE'

const errMessages = {
  usernameRequired: "username is required",
  usernameMin: "username must be at least 3 characters",
  usernameMax: "username cannot exceed 20 characters",

  favLanguageRequired: "favLanguage is required",
  favLanguageOptions: "favLanguage must be either javascript or rust",

  favFoodRequired: "favFood is required",
  favFoodOptions: "favFood must be either broccoli, spaghetti or pizza",

  agreementRequired: "agreement is required",
  agreementOptions: "agreement must be accepted",
};

const formSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(errMessages["usernameRequired"])
    .min(3, errMessages["usernameMin"])
    .max(20, errMessages["usernameMax"]),
  favLanguage: yup
    .string()
    .trim()
    .required(errMessages.favLanguageRequired)
    .oneOf(["javascript", "rust"], errMessages["favLanguageOptions"]),
  favFood: yup
    .string()
    .required(errMessages.favFoodRequired)
    .trim()
    .oneOf(["pizza", "spaghetti", "broccoli"], errMessages["favFoodOptions"]),
  agreement: yup
    .boolean()
    .required(errMessages["agreementRequired"])
    .oneOf([true], errMessages.agreementOptions),
});

export default formSchema;
