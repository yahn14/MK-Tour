
// Función para borrar datos del jugador desde consola
function borrarDatosJugador(nombreJugador) {
  const premios = JSON.parse(localStorage.getItem('premiosJugadores')) || {};
  if (premios[nombreJugador]) {
    delete premios[nombreJugador];
    localStorage.setItem('premiosJugadores', JSON.stringify(premios));
  }
  localStorage.removeItem(`trofeos_${nombreJugador}`);
  localStorage.removeItem(`medallas_${nombreJugador}`);
  console.log(`Datos de ${nombreJugador} borrados.`);
}

document.addEventListener('DOMContentLoaded', () => {
  // ... TODO tu código existente aquí ...
});





// JS para el perfil de Carlos

// Función para cargar los premios desde localStorage y mostrarlos en pantalla
function cargarPremiosPerfil(nombreJugador) {
  const nombreClave = nombreJugador.toLowerCase();

  const premios = JSON.parse(localStorage.getItem('premiosJugadores')) || {};
  const trofeos = JSON.parse(localStorage.getItem(`trofeos_${nombreClave}`)) || [];
  const medallas = JSON.parse(localStorage.getItem(`medallas_${nombreClave}`)) || [];

  // Mostrar totales
  document.getElementById('totalTrofeos').textContent = premios[nombreClave]?.trofeos || 0;
  document.getElementById('totalMedallas').textContent = premios[nombreClave]?.medallas || 0;
  document.getElementById('recordMaximo').textContent = sessionStorage.getItem('recordMaximo') || 0;

  // Mostrar trofeos ganados con contador
  const conteoTrofeos = {};
  trofeos.forEach((ruta) => {
    conteoTrofeos[ruta] = (conteoTrofeos[ruta] || 0) + 1;
  });

  for (const ruta in conteoTrofeos) {
    const cantidad = conteoTrofeos[ruta];
    let contenedor = null;

    if (ruta.includes('copa-azul')) contenedor = document.getElementById('contenedorTrofeoEstrella');
    else if (ruta.includes('copa-caparazon')) contenedor = document.getElementById('contenedorTrofeoCaparazon');
    else if (ruta.includes('copa-m')) contenedor = document.getElementById('contenedorTrofeoMK');
    else if (ruta.includes('copa-race')) contenedor = document.getElementById('contenedorTrofeoRace');

    if (contenedor) {
      contenedor.innerHTML = `
        <div class="img-con-contador">
          <img src="../../${ruta}" alt="Trofeo" />
          ${cantidad > 1 ? `<span class="contador">x${cantidad}</span>` : ''}
        </div>`;
    }
  }

  // Mostrar medallas ganadas con contador
  const conteoMedallas = {};
  medallas.forEach((ruta) => {
    conteoMedallas[ruta] = (conteoMedallas[ruta] || 0) + 1;
  });

  for (const ruta in conteoMedallas) {
    const cantidad = conteoMedallas[ruta];
    let contenedor = null;

    if (ruta.includes('champiñon-especial')) contenedor = document.getElementById('contenedorMedallaChampiñonEspecial');
    else if (ruta.includes('corona')) contenedor = document.getElementById('contenedorMedallaCorona');
    else if (ruta.includes('hoja')) contenedor = document.getElementById('contenedorMedallaHoja');
    else if (ruta.includes('flor')) contenedor = document.getElementById('contenedorMedallaFlor');
    else if (ruta.includes('estrella')) contenedor = document.getElementById('contenedorMedallaEstrella');
    else if (ruta.includes('champiñon')) contenedor = document.getElementById('contenedorMedallaChampiñon');

    if (contenedor) {
      contenedor.innerHTML = `
        <div class="img-con-contador">
          <img src="../../${ruta}" alt="Medalla" />
          ${cantidad > 1 ? `<span class="contador contador-medalla">x${cantidad}</span>` : ''}
        </div>`;
    }
  }
}

// MODAL PERFILES
const modalPerfiles = document.getElementById('modalPerfiles');
const btnPerfiles = document.querySelector('a[href="perfil.html"]');
const cerrarModalPerfiles = document.getElementById('cerrarModalPerfiles');

btnPerfiles?.addEventListener('click', (e) => {
  e.preventDefault();
  modalPerfiles.style.display = 'flex';
});

cerrarModalPerfiles?.addEventListener('click', () => {
  modalPerfiles.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modalPerfiles) {
    modalPerfiles.style.display = 'none';
  }
});

document.querySelectorAll('#modalPerfiles .item img').forEach((img) => {
  img.addEventListener('click', () => {
    const destino = img.closest('a')?.getAttribute('href');
    if (destino) window.location.href = destino;
  });
});

// MODAL CREAR TORNEO
const modalTorneo = document.getElementById('modalCrearTorneo');
const btnAbrirTorneo = document.getElementById('btnCrearTorneo');
const btnCerrarTorneo = document.getElementById('cerrarModalCrear');
const catalogoTrofeos = document.getElementById('catalogoTrofeos');
const catalogoMedallas = document.getElementById('catalogoMedallas');
const btnVerTrofeos = document.getElementById('btnVerTrofeos');
const btnVerMedallas = document.getElementById('btnVerMedallas');

btnAbrirTorneo?.addEventListener('click', () => {
  modalTorneo.style.display = 'flex';
});

btnCerrarTorneo?.addEventListener('click', () => {
  modalTorneo.style.display = 'none';
  catalogoTrofeos.classList.add('hidden');
  catalogoMedallas.classList.add('hidden');
});

btnVerTrofeos?.addEventListener('click', () => {
  catalogoTrofeos.classList.remove('hidden');
  catalogoMedallas.classList.add('hidden');
});

btnVerMedallas?.addEventListener('click', () => {
  catalogoMedallas.classList.remove('hidden');
  catalogoTrofeos.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === modalTorneo) {
    modalTorneo.style.display = 'none';
    catalogoTrofeos.classList.add('hidden');
    catalogoMedallas.classList.add('hidden');
  }
});

// Ejecutar al cargar la página
cargarPremiosPerfil('yahir');