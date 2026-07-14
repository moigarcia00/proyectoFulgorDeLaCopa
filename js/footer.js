document.addEventListener("DOMContentLoaded", () => {
  fetch("PROYECTOFULGORDELACOPA/html/footer.html")
    .then((response) => response.text())
    .then((data) => {
      const placeholder = document.getElementById("footer-placeholder");
      placeholder.innerHTML = data;
    })
    .catch((error) =>
      console.error("Error al cargar el pie de página:", error),
    );
});
