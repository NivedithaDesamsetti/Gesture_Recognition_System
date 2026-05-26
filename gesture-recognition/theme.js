// theme.js
function applyTheme() {
    const darkMode = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark", darkMode);
    const toggle = document.getElementById("themeToggle");
    if (toggle) toggle.checked = darkMode;
  }
  
  window.onload = applyTheme;
  
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("change", (e) => {
        const enabled = e.target.checked;
        document.body.classList.toggle("dark", enabled);
        localStorage.setItem("darkMode", enabled);
      });
    }
  });
  