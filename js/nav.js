document.addEventListener("DOMContentLoaded", () => {
  fetch("../html/nav.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("worldNavbar").innerHTML = data;

      const path = window.location.pathname;
      const navLinks = document.querySelectorAll(".navItem");

      navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");

        if (path.includes(linkHref.replace("../", ""))) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    })
    .catch((error) => console.error("Error al cargar el menú:", error));
});
