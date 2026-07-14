document.addEventListener("DOMContentLoaded", () => {
  fetch("/proyectoFulgorDeLaCopa/html/footer.html")
    .then((response) => response.text())
    .then((data) => {
      const placeholder = document.getElementById("footer-placeholder");
      if (placeholder) {
        placeholder.innerHTML = data;

        document.body.style.display = "grid";
        document.body.style.gridTemplateRows = "auto 1fr auto";
        document.body.style.minHeight = "100vh";
        document.body.style.margin = "0";

        const main = document.querySelector("main");
        if (main) {
          main.style.height = "auto";
        }
      }
    })
    .catch((error) =>
      console.error("Error al cargar el pie de página:", error),
    );
});
