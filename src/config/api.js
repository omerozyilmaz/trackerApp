// Eski URL yapısı artık kullanılmayacak, bu yüzden kaldırıyoruz
// const API_URL = "https://trackerappbackend-production.up.railway.app/api";

// Sadece yeni URL yapısını tutuyoruz
const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://trackerappbackend-production.up.railway.app";

// Debug log
console.log("API URL configured as:", API_URL);

// API_URL'i dışa aktarıyoruz ki diğer dosyalar kullanabilsin
export default API_URL;
