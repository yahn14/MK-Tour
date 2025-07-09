document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalCrearTorneo');
  const btnAbrir = document.getElementById('btnCrearTorneo');
  const btnVerTrofeos = document.getElementById('btnVerTrofeos');
  const catalogoTrofeos = document.getElementById('catalogoTrofeos');
  const imagenTrofeo = document.getElementById('img-trofeo-seleccionado');
  const tituloTrofeo = document.querySelector('.trofeo-actual h2');
  const tbody = document.getElementById('tabla-puntos');
  const btnGuardar = document.getElementById('btnGuardarAcumulado');
  const btnBorrarPuntos = document.getElementById('btnBorrarPuntos');
  const btnObtenerGanador = document.getElementById('btnObtenerGanador');
  const campeonActual = document.getElementById('campeon-actual');
  const maximoCampeon = document.getElementById('maximo-campeon');
  const recordPuntos = document.getElementById('record-puntos');
  const selectorGanador = document.getElementById('selectorGanador');
  const selectorPremio = document.getElementById('selectorPremio');

  const nombresJugadores = [
    'Carlos', 'Cris', 'Manuel', 'Hector',
    'Ricardo', 'Pablo', 'Raul', 'Yahir',
  ];

  btnObtenerGanador.addEventListener('click', () => {
    const filas = tbody.querySelectorAll('tr');
    let ganador = null;
    let maxPuntos = -1;

    filas.forEach((fila) => {
      const nombre = fila.querySelector('.nombre-jugador').textContent;
      const puntos = parseInt(fila.querySelector('input.input-puntos').value) || 0;

      if (puntos > maxPuntos) {
        maxPuntos = puntos;
        ganador = nombre;
      }
    });

    if (!ganador) {
      alert('No hay puntos ingresados.');
      return;
    }

    localStorage.setItem('campeonActual', ganador);
    localStorage.setItem('recordMaximo', maxPuntos);

    let historial = JSON.parse(localStorage.getItem('historialGanadores')) || {};
    historial[ganador] = (historial[ganador] || 0) + 1;
    localStorage.setItem('historialGanadores', JSON.stringify(historial));

    actualizarSeccionesCampeones();

    document.getElementById('selectorGanador').value = ganador;
    enviarPremioGanador();
    localStorage.removeItem('trofeoEnJuego');
    localStorage.removeItem('acumulados');

    const contenedorContenido = document.getElementById('trofeo-en-juego-contenido');
    contenedorContenido.innerHTML = '';
    tituloTrofeo.textContent = '';
    selectorPremio.innerHTML = '<option value="">Selecciona premio</option>';

    document.querySelectorAll('#catalogoTrofeos .item').forEach((item) => {
      item.style.pointerEvents = 'auto';
      item.style.opacity = '1';
    });
  });

  function actualizarSeccionesCampeones() {
    const ganador = localStorage.getItem('campeonActual');
    const maxPuntos = localStorage.getItem('recordMaximo');
    const historial = JSON.parse(localStorage.getItem('historialGanadores')) || {};

    if (!ganador || !maxPuntos || Object.keys(historial).length === 0) return;

    let maxGanador = '';
    let maxVeces = 0;
    for (let jugador in historial) {
      if (historial[jugador] > maxVeces) {
        maxVeces = historial[jugador];
        maxGanador = jugador;
      }
    }

    const avatares = {
      Carlos: "img/flor-.png",
      Cris: "img/toad.png",
      Hector: "img/bowser-.png",
      Manuel: "img/mario.png",
      Ricardo: "img/avatar-ricardo.png",
      Pablo: "img/dk-.png",
      Raul: "img/mi-.png",
      Yahir: "img/yoshi.png"
    };

    const fondos = {
      Carlos: "url('img/fondo-pirana.jpg')",
      Cris: "url('img/fondo-toad2.png')",
      Hector: "url('img/fondo-bowser.jpg')",
      Manuel: "url('img/fondo-manuel.png')",
      Ricardo: "url('img/fondo-ricardo.jpg')",
      Pablo: "url('img/fondo-dk.jpg')",
      Raul: "url('img/fondo-mii.webp')",
      Yahir: "url('img/fondo-yoshi2.jpg')"
    };

    function construirSeccion(jugador, avatarSrc, mensaje) {
      let emoji = '';
      if (mensaje.includes('Campeón actual')) emoji = '🏆';
      else if (mensaje.includes('Máximo campeón')) emoji = '👑';
      else if (mensaje.includes('Récord')) emoji = '🎯';

      const clasesBorde = {
        Carlos: 'borde-carlos',
        Cris: 'borde-cris',
        Hector: 'borde-hector',
        Manuel: 'borde-manuel',
        Ricardo: 'borde-ricardo',
        Pablo: 'borde-pablo',
        Raul: 'borde-raul',
        Yahir: 'borde-yahir'
      };

      const clase = clasesBorde[jugador] || '';

      return `
        <div class="avatar-box">
          <div class="avatar-frame">
            <img src="${avatarSrc}" alt="${jugador}" class="${clase}" />
          </div>
          <div class="info-box">
            <h3 class="jugador-nombre">${emoji} ${jugador}</h3>
            <p class="jugador-mensaje">${mensaje}</p>
          </div>
        </div>
      `;
    }

    campeonActual.style.backgroundImage = fondos[ganador];
    campeonActual.innerHTML = construirSeccion(ganador, avatares[ganador], "Campeón actual del torneo");
    maximoCampeon.style.backgroundImage = fondos[maxGanador];
    maximoCampeon.innerHTML = construirSeccion(maxGanador, avatares[maxGanador], `Máximo campeón: ${maxVeces} trofeos`);
    recordPuntos.style.backgroundImage = fondos[ganador];
    recordPuntos.innerHTML = construirSeccion(ganador, avatares[ganador], `Récord de puntos: ${maxPuntos} pts`);
  }

  actualizarSeccionesCampeones(); // se ejecuta al cargar la página
});