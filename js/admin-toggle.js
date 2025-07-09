window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
    const adminSection = document.querySelector('.botones-admin');
    if (!adminSection) return;

    if (adminSection.style.display === 'block') {
      adminSection.style.display = 'none';
      alert('Modo administrador desactivado');
    } else {
      const clave = prompt('Introduce la clave de administrador');
      if (clave === 'Iconapop2025$') {  // Cambia aquí tu contraseña real
        adminSection.style.display = 'block';
        alert('Modo administrador activado');
      } else {
        alert('Clave incorrecta');
      }
    }
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const esAdmin = localStorage.getItem("modoAdmin") === "true";

  if (esAdmin) {
    const celdas = document.querySelectorAll(".celda-puntos");

    celdas.forEach(celda => {
      const valor = celda.getAttribute("data-puntos") || "0";
      celda.innerHTML = `<input type="number" class="input-puntos" value="${valor}" />`;
    });
  }
});
