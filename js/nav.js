document.addEventListener("DOMContentLoaded", () => {
  fetch("PROYECTOFULGORDELACOPA/html/nav.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("worldNavbar").innerHTML = data;
    })
    .catch((error) => console.error("Error al cargar el menú:", error));
});
