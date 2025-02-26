/**
 * Form alanlarını doğrulamak için yardımcı fonksiyonlar
 */

/**
 * Email formatını doğrular
 * @param {string} email - Doğrulanacak email
 * @returns {boolean} - Email formatı geçerli mi
 */
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

/**
 * Şifrenin minimum uzunluğunu kontrol eder
 * @param {string} password - Doğrulanacak şifre
 * @param {number} minLength - Minimum uzunluk (varsayılan: 6)
 * @returns {boolean} - Şifre yeterince uzun mu
 */
export const isPasswordLongEnough = (password, minLength = 6) => {
  return password.length >= minLength;
};

/**
 * Şifrenin büyük ve küçük harf içerip içermediğini kontrol eder
 * @param {string} password - Doğrulanacak şifre
 * @returns {boolean} - Şifre büyük ve küçük harf içeriyor mu
 */
export const hasUpperAndLowerCase = (password) => {
  return /(?=.*[a-z])(?=.*[A-Z])/.test(password);
};

/**
 * İki şifrenin eşleşip eşleşmediğini kontrol eder
 * @param {string} password - Ana şifre
 * @param {string} confirmPassword - Onay şifresi
 * @returns {boolean} - Şifreler eşleşiyor mu
 */
export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Kullanıcı adının minimum uzunluğunu kontrol eder
 * @param {string} username - Doğrulanacak kullanıcı adı
 * @param {number} minLength - Minimum uzunluk (varsayılan: 3)
 * @returns {boolean} - Kullanıcı adı yeterince uzun mu
 */
export const isUsernameLongEnough = (username, minLength = 3) => {
  return username.length >= minLength;
};

/**
 * Bir alanın boş olup olmadığını kontrol eder
 * @param {string} value - Kontrol edilecek değer
 * @returns {boolean} - Alan dolu mu
 */
export const isNotEmpty = (value) => {
  return value.trim() !== "";
};
