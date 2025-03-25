import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import {
  selectLoginForm,
  updateLoginField,
  setLoginFieldTouched,
  validateLoginField,
  validateLoginForm,
  setLoginFormError,
  setLoginSubmitting,
} from "../store/slices/formSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const { values, errors, touched, formError, isSubmitting } =
    useSelector(selectLoginForm);
  const { login } = useAuth();

  // Field değiştiğinde validasyon yap
  useEffect(() => {
    Object.keys(touched).forEach((field) => {
      if (touched[field]) {
        dispatch(validateLoginField(field, values[field]));
      }
    });
  }, [values, touched, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginField({ name, value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    dispatch(setLoginFieldTouched({ name }));
    dispatch(validateLoginField(name, values[name]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoginFormError(""));

    // Tüm alanları dokunulmuş olarak işaretle
    ["email", "password"].forEach((field) => {
      dispatch(setLoginFieldTouched({ name: field }));
    });

    // Form validasyonu
    const isValid = dispatch(validateLoginForm());
    if (!isValid) {
      return;
    }

    dispatch(setLoginSubmitting(true));

    try {
      console.log("Login credentials:", values); // Debug için
      const result = await login({
        email: values.email,
        password: values.password,
      });

      if (!result.success) {
        dispatch(setLoginFormError(result.error));
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setLoginFormError("An unexpected error occurred"));
    } finally {
      dispatch(setLoginSubmitting(false));
    }
  };

  return {
    values,
    errors,
    touched,
    formError,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useLogin;
