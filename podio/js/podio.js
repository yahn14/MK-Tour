function borrarDatosDePrueba() {
  const jugadores = ['carlos', 'cris', 'manuel', 'héctor', 'ricardo', 'pablo', 'raul', 'yahir'];
  jugadores.forEach(j => {
    localStorage.removeItem(`trofeos_${j}`);
    localStorage.removeItem(`medallas_${j}`);
  });
  localStorage.removeItem('premiosJugadores');
  console.log('Datos de prueba borrados.');
}





// Modal perfiles (sin cambios)
const modalPerfiles = document.getElementById('modalPerfiles');
const btnCerrarPerfiles = document.getElementById('cerrarModalPerfiles');
const btnAbrirPerfiles = document.getElementById('menuPerfiles');

btnAbrirPerfiles.addEventListener('click', e => {
  e.preventDefault();
  modalPerfiles.style.display = 'flex';
});

btnCerrarPerfiles.addEventListener('click', () => {
  modalPerfiles.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modalPerfiles) {
    modalPerfiles.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const jugadores = [
    "Yahir", "Carlos", "Cris", "Hector", "Manuel", "Ricardo", "Pablo", "Raul"
  ];

  const premiosJugadores = JSON.parse(localStorage.getItem('premiosJugadores')) || {};

  // Construir ranking incluyendo especiales
  const ranking = jugadores.map(nombre => {
    const key = nombre.toLowerCase();
    const datos = premiosJugadores[key] || { trofeos: 0, medallas: 0, especiales: 0, ultimaImagen: null };
    return {
      nombre,
      trofeos: datos.trofeos || 0,
      medallas: datos.medallas || 0,
      especiales: datos.especiales || 0,
      total: (datos.trofeos || 0) + (datos.medallas || 0) + (datos.especiales || 0),
      ultimaImagen: datos.ultimaImagen || null
    };
  });

  // Ordenar: primero trofeos, luego especiales, luego medallas
  ranking.sort((a, b) => {
    if (b.trofeos !== a.trofeos) return b.trofeos - a.trofeos;
    if (b.especiales !== a.especiales) return b.especiales - a.especiales;
    return b.medallas - a.medallas;
  });

  const podio = document.querySelector('.podio');
  if (!podio) return;

  const puestosTop3 = podio.querySelectorAll('.puesto');
  for (let i = 0; i < puestosTop3.length; i++) {
    const puestoElem = puestosTop3[i];
    const jugador = ranking[i];
    if (!jugador) continue;

    puestoElem.dataset.jugador = jugador.nombre;

    const divPosicion = puestoElem.querySelector('.posicion');
    if (divPosicion) divPosicion.textContent = (i + 1).toString();

    const avataresPorJugador = {
      "Yahir": "../img/yoshi.png",
      "Carlos": "../img/flor-.png",
      "Cris": "../img/toad.png",
      "Hector": "../img/bowser-.png",
      "Manuel": "../img/mario.png",
      "Ricardo": "../img/avatar-ricardo.png",
      "Pablo": "../img/dk-.png",
      "Raul": "../img/mi-.png"
    };

    const imgAvatar = puestoElem.querySelector('img.avatar');
    if (imgAvatar) {
      imgAvatar.src = avataresPorJugador[jugador.nombre] || imgAvatar.src;
      imgAvatar.alt = jugador.nombre;
    }

    const divNombre = puestoElem.querySelector('.nombre');
    if (divNombre) divNombre.textContent = jugador.nombre;

    // Actualizar contadores
    const trofeosSpan = puestoElem.querySelector('.contador-trofeos .valor');
    if (trofeosSpan) trofeosSpan.textContent = jugador.trofeos;

    const medallasSpan = puestoElem.querySelector('.contador-medallas .valor');
    if (medallasSpan) medallasSpan.textContent = jugador.medallas;

    const especialesSpan = puestoElem.querySelector('.contador-especiales .valor');
    if (especialesSpan) especialesSpan.textContent = jugador.especiales;
  }

  // Tabla posiciones 4 a 8
  const tablaCuerpo = document.querySelector('table tbody');
  if (!tablaCuerpo) return;

  const rankingRestante = ranking.slice(3);

  const filas = tablaCuerpo.querySelectorAll('tr');
  filas.forEach((fila, idx) => {
    const jugador = rankingRestante[idx];
    if (!jugador) return;

    fila.dataset.jugador = jugador.nombre;

    const celdaPos = fila.querySelector('td.posicion');
    if (celdaPos) celdaPos.textContent = (idx + 4).toString();

    const celdaAvatar = fila.querySelector('td.avatar-cell');
    if (celdaAvatar) {
      const avataresPorJugador = {
        "Yahir": "../img/yoshi.png",
        "Carlos": "../img/flor-.png",
        "Cris": "../img/toad.png",
        "Hector": "../img/bowser-.png",
        "Manuel": "../img/mario.png",
        "Ricardo": "../img/avatar-ricardo.png",
        "Pablo": "../img/dk-.png",
        "Raul": "../img/mi-.png"
      };
      celdaAvatar.innerHTML = `<img src="${avataresPorJugador[jugador.nombre] || ''}" alt="${jugador.nombre}" /> ${jugador.nombre}`;
    }

    const celdaTrofeos = fila.querySelector('td.trofeos');
    if (celdaTrofeos) celdaTrofeos.textContent = jugador.trofeos;

    const celdaMedallas = fila.querySelector('td.medallas');
    if (celdaMedallas) celdaMedallas.textContent = jugador.medallas;

    const celdaEspeciales = fila.querySelector('td.especiales');
    if (celdaEspeciales) celdaEspeciales.textContent = jugador.especiales;
  });
});




//animacion imagenes//

document.addEventListener("DOMContentLoaded", () => {
  const imagenAnimada = document.getElementById("imagenAnimada");

  if (imagenAnimada) {
    const imagenes = [
      "../img/toad-.png",          // Imagen válida para iniciar
      "../img/dkp.png",
      "../img/baby-peach.png",
      "../img/luigi.png",
      "../img/rey-boo.png",
      "../img/warrio.png",
      "../img/baby-mario.png",
      "../img/waluigi.png",
      "../img/flor-.png",
      "../img/baby-bowser.png",
      "../img/peach-.png",
      "../img/baby-princesa.png",
      "../img/mario2.png",
      "../img/mi-.png",
    ];

    let indice = 0;

    setInterval(() => {
      indice = (indice + 1) % imagenes.length;
      imagenAnimada.style.opacity = 0;
      setTimeout(() => {
        imagenAnimada.src = imagenes[indice];
        imagenAnimada.style.opacity = 1;
      }, 300);
    }, 5000);
  }
});


