/**
 * 把 public/ 底下的資源路徑轉成部署後正確的網址。
 *
 * vite.config.js 設了 base: './'，所以 BASE_URL 是相對路徑。
 * 直接寫 "/img/x.png" 在 GitHub Pages 的 /專案名/ 底下會指到網域根目錄而 404，
 * 經過這個函式就會變成相對於目前頁面的位置。
 */
export function asset(path) {
  return import.meta.env.BASE_URL + String(path).replace(/^\//, '')
}
