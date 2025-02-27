// Eski URL yapısı artık kullanılmayacak, bu yüzden kaldırıyoruz
// const API_URL = "https://trackerappbackend-production.up.railway.app/api";

// Vite projelerinde çevre değişkenlerine erişim için doğru sözdizimi
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://trackerappbackend-production.up.railway.app/api";

// API_URL'i dışa aktarıyoruz
export default API_URL;
