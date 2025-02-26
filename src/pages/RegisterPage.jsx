import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  selectRegisterForm,
  updateRegisterField,
  setRegisterFieldTouched,
  validateRegisterField,
  validateRegisterForm,
  setRegisterFormError,
  setRegisterSubmitting,
} from "../store/slices/formSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { values, errors, touched, formError, isSubmitting } =
    useSelector(selectRegisterForm);
  const { register } = useAuth();
  const { isDarkMode } = useTheme();

  // Field değiştiğinde validasyon yap
  useEffect(() => {
    Object.keys(touched).forEach((field) => {
      if (touched[field]) {
        dispatch(
          validateRegisterField(field, values[field], { register: { values } })
        );
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
    dispatch(
      validateRegisterField(name, values[name], { register: { values } })
    );
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

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode ? "bg-gray-900" : "bg-[#f9f5ff]"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Create Account
        </h2>

        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.username && touched.username
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="johndoe"
            />
            {errors.username && touched.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.password && touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-400"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <div
          className={`mt-6 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:text-purple-500 font-medium"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
