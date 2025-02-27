import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  selectRegisterForm,
  updateRegisterField,
  setRegisterFieldTouched,
  validateRegisterField,
  validateRegisterForm,
  setRegisterFormError,
  setRegisterSubmitting,
} from "../store/slices/formSlice";

const useRegister = () => {
  const dispatch = useDispatch();
  const { values, errors, touched, formError, isSubmitting } =
    useSelector(selectRegisterForm);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Field değiştiğinde validasyon yap
  useEffect(() => {
    Object.keys(touched).forEach((field) => {
      if (touched[field]) {
        dispatch(validateRegisterField(field, values[field], values));
      }
    });
  }, [values, touched, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateRegisterField({ name, value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    dispatch(setRegisterFieldTouched({ name }));
    dispatch(validateRegisterField(name, values[name], values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setRegisterFormError(""));

    // Tüm alanları dokunulmuş olarak işaretle
    ["username", "email", "password", "confirmPassword"].forEach((field) => {
      dispatch(setRegisterFieldTouched({ name: field }));
    });

    // Form validasyonu
    const isValid = dispatch(validateRegisterForm());
    if (!isValid) {
      return;
    }

    dispatch(setRegisterSubmitting(true));

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = values;
      const result = await register(registerData);

      if (!result.success) {
        dispatch(setRegisterFormError(result.error));
      }
    } finally {
      dispatch(setRegisterSubmitting(false));
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

export default useRegister;
