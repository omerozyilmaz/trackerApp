import { createSlice } from "@reduxjs/toolkit";
import {
  isValidEmail,
  isPasswordLongEnough,
  hasUpperAndLowerCase,
  doPasswordsMatch,
  isUsernameLongEnough,
  isNotEmpty,
} from "../../utils/validationUtils";

const initialState = {
  login: {
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
    touched: {
      email: false,
      password: false,
    },
    formError: "",
    isSubmitting: false,
  },
  register: {
    values: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    touched: {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    },
    formError: "",
    isSubmitting: false,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Login form actions
    updateLoginField: (state, action) => {
      const { name, value } = action.payload;
      state.login.values[name] = value;
    },
    setLoginFieldTouched: (state, action) => {
      const { name } = action.payload;
      state.login.touched[name] = true;
    },
    setLoginFieldError: (state, action) => {
      const { name, error } = action.payload;
      state.login.errors[name] = error;
    },
    setLoginFormError: (state, action) => {
      state.login.formError = action.payload;
    },
    setLoginSubmitting: (state, action) => {
      state.login.isSubmitting = action.payload;
    },
    resetLoginForm: (state) => {
      state.login = initialState.login;
    },

    // Register form actions
    updateRegisterField: (state, action) => {
      const { name, value } = action.payload;
      state.register.values[name] = value;
    },
    setRegisterFieldTouched: (state, action) => {
      const { name } = action.payload;
      state.register.touched[name] = true;
    },
    setRegisterFieldError: (state, action) => {
      const { name, error } = action.payload;
      state.register.errors[name] = error;
    },
    setRegisterFormError: (state, action) => {
      state.register.formError = action.payload;
    },
    setRegisterSubmitting: (state, action) => {
      state.register.isSubmitting = action.payload;
    },
    resetRegisterForm: (state) => {
      state.register = initialState.register;
    },
  },
});

export const {
  updateLoginField,
  setLoginFieldTouched,
  setLoginFieldError,
  setLoginFormError,
  setLoginSubmitting,
  resetLoginForm,
  updateRegisterField,
  setRegisterFieldTouched,
  setRegisterFieldError,
  setRegisterFormError,
  setRegisterSubmitting,
  resetRegisterForm,
} = formSlice.actions;

// Selectors
export const selectLoginForm = (state) => state.form.login;
export const selectRegisterForm = (state) => state.form.register;

// Thunks
export const validateLoginField = (name, value) => (dispatch) => {
  let error = "";

  switch (name) {
    case "email":
      if (!isNotEmpty(value)) {
        error = "Email is required";
      } else if (!isValidEmail(value)) {
        error = "Email is invalid";
      }
      break;
    case "password":
      if (!isNotEmpty(value)) {
        error = "Password is required";
      } else if (!isPasswordLongEnough(value)) {
        error = "Password must be at least 6 characters";
      }
      break;
    default:
      break;
  }

  dispatch(setLoginFieldError({ name, error }));
  return !error;
};

export const validateRegisterField =
  (name, value, formValues) => (dispatch) => {
    let error = "";

    switch (name) {
      case "username":
        if (!isNotEmpty(value)) {
          error = "Username is required";
        } else if (!isUsernameLongEnough(value)) {
          error = "Username must be at least 3 characters";
        }
        break;
      case "email":
        if (!isNotEmpty(value)) {
          error = "Email is required";
        } else if (!isValidEmail(value)) {
          error = "Email is invalid";
        }
        break;
      case "password":
        if (!isNotEmpty(value)) {
          error = "Password is required";
        } else if (!isPasswordLongEnough(value)) {
          error = "Password must be at least 6 characters";
        } else if (!hasUpperAndLowerCase(value)) {
          error = "Password must contain both uppercase and lowercase letters";
        }
        break;
      case "confirmPassword":
        if (!isNotEmpty(value)) {
          error = "Please confirm your password";
        } else if (!doPasswordsMatch(formValues.password, value)) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    dispatch(setRegisterFieldError({ name, error }));
    return !error;
  };

export const validateLoginForm = () => (dispatch, getState) => {
  const { values } = getState().form.login;
  const emailValid = dispatch(validateLoginField("email", values.email));
  const passwordValid = dispatch(
    validateLoginField("password", values.password)
  );

  return emailValid && passwordValid;
};

export const validateRegisterForm = () => (dispatch, getState) => {
  const state = getState();
  const { values } = state.form.register;

  const usernameValid = dispatch(
    validateRegisterField("username", values.username, values)
  );
  const emailValid = dispatch(
    validateRegisterField("email", values.email, values)
  );
  const passwordValid = dispatch(
    validateRegisterField("password", values.password, values)
  );
  const confirmPasswordValid = dispatch(
    validateRegisterField("confirmPassword", values.confirmPassword, values)
  );

  return usernameValid && emailValid && passwordValid && confirmPasswordValid;
};

export default formSlice.reducer;
