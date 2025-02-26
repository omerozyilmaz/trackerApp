import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  selectLoginForm,
  updateLoginField,
  setLoginFieldTouched,
  validateLoginField,
  validateLoginForm,
  setLoginFormError,
  setLoginSubmitting,
} from "../store/slices/formSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { values, errors, touched, formError, isSubmitting } =
    useSelector(selectLoginForm);
  const { login } = useAuth();
  const { isDarkMode } = useTheme();

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
      const result = await login({
        email: values.email,
        password: values.password,
      });

      if (!result.success) {
        dispatch(setLoginFormError(result.error));
      }
    } finally {
      dispatch(setLoginSubmitting(false));
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
          Log In
        </h2>

        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-400"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div
          className={`mt-6 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 hover:text-purple-500 font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
