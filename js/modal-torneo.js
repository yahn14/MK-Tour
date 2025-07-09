function reiniciarDatosTorneo() {
  // Borra todos los datos relacionados al torneo
  const claves = Object.keys(localStorage);
  claves.forEach((clave) => {
    if (
      clave.startsWith('premiosJugadores') ||
      clave.startsWith('trofeos_') ||
      clave.startsWith('medallas_') ||
      clave.startsWith('acumulados') ||
      clave.startsWith('historialGanadores') ||
      clave.startsWith('campeonActual') ||
      clave.startsWith('recordMaximo') ||
      clave.startsWith('trofeoEnJuego') ||
      clave.startsWith('puntosIngresados') ||
      clave.startsWith('modoAdmin')
    ) {
      localStorage.removeItem(clave);
    }
  });

  alert("✅ Datos del torneo reiniciados completamente.");
  location.reload(); // Recargar para limpiar visualmente la interfaz
}


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
  const campeonActualElem = document.getElementById('campeon-actual');
  const maximoCampeonElem = document.getElementById('maximo-campeon');
  const recordPuntosElem = document.getElementById('record-puntos');
  const selectorGanador = document.getElementById('selectorGanador');
  const selectorPremio = document.getElementById('selectorPremio');

  const nombresJugadores = [
    'Carlos', 'Cris', 'Manuel', 'Hector',
    'Ricardo', 'Pablo', 'Raul', 'Yahir',
  ];

  // -------------- CONSTANTES Y FUNCIONES PARA LAS 3 SECCIONES --------------

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




function capitalizar(nombre) {
  if (!nombre) return "";
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}
 function mostrarSecciones(campeonActual, maxGanador, maxVeces, recordMaximo, jugadorRecord) {
  // Capitalizar todos los nombres para buscar en objetos
  campeonActual = capitalizar(campeonActual);
  maxGanador = capitalizar(maxGanador);
  jugadorRecord = capitalizar(jugadorRecord);

  // Rutas fallback para evitar error en carga de imagen
  const fondoFallback = "url('img/default-fondo.jpg')";
  const avatarFallback = "img/default-avatar.png";

  campeonActualElem.style.backgroundImage = fondos[campeonActual] || fondoFallback;
  campeonActualElem.innerHTML = construirSeccion(
    campeonActual,
    avatares[campeonActual] || avatarFallback,
    "Campeón actual del torneo"
  );

  maximoCampeonElem.style.backgroundImage = fondos[maxGanador] || fondoFallback;
  maximoCampeonElem.innerHTML = construirSeccion(
    maxGanador,
    avatares[maxGanador] || avatarFallback,
    `Máximo campeón: ${maxVeces} trofeos`
  );

  recordPuntosElem.style.backgroundImage = fondos[jugadorRecord] || fondoFallback;
  recordPuntosElem.innerHTML = construirSeccion(
    jugadorRecord,
    avatares[jugadorRecord] || avatarFallback,
    `Récord de puntos: ${recordMaximo} pts`
  );
}


  function cargarYMostrarDatos() {
  let campeonActual = localStorage.getItem('campeonActual');
  const recordMaximo = parseInt(localStorage.getItem('recordMaximo')) || 0;
  let jugadorRecord = localStorage.getItem('jugadorRecordMaximo') || '';

  // Capitalizar para coincidir con claves
  if (campeonActual) {
    campeonActual = campeonActual.charAt(0).toUpperCase() + campeonActual.slice(1).toLowerCase();
  }
  if (jugadorRecord) {
    jugadorRecord = jugadorRecord.charAt(0).toUpperCase() + jugadorRecord.slice(1).toLowerCase();
  }

  const historialGanadores = JSON.parse(localStorage.getItem('historialGanadores')) || {};

  if (!campeonActual && Object.keys(historialGanadores).length === 0 && !jugadorRecord) return;


  let maxGanador = '';
  let maxVeces = 0;
  for (const jugador in historialGanadores) {
    if (historialGanadores[jugador] > maxVeces) {
      maxVeces = historialGanadores[jugador];
      maxGanador = jugador;
    }
  }

  if (maxGanador) {
    maxGanador = maxGanador.charAt(0).toUpperCase() + maxGanador.slice(1).toLowerCase();
  }

  mostrarSecciones(campeonActual, maxGanador, maxVeces, recordMaximo, jugadorRecord);
}


  // Al cargar la página mostrar secciones guardadas
  cargarYMostrarDatos();

  // ------------------------- FUNCIONALIDAD EXISTENTE -------------------------

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

  // Capitalizar ganador antes de guardar
  const ganadorCapitalizado = ganador.charAt(0).toUpperCase() + ganador.slice(1).toLowerCase();

  // Guardar campeón actual en minúsculas para consistencia en localStorage
  localStorage.setItem('campeonActual', ganadorCapitalizado.toLowerCase());

  const recordActual = parseInt(localStorage.getItem('recordMaximo')) || 0;
  let jugadorRecord = localStorage.getItem('jugadorRecordMaximo') || '';

  // Si el nuevo máximo puntos es mayor, actualizar récord y jugador récord
  if (maxPuntos > recordActual) {
    localStorage.setItem('recordMaximo', maxPuntos);
    localStorage.setItem('jugadorRecordMaximo', ganadorCapitalizado.toLowerCase());
    jugadorRecord = ganadorCapitalizado; // Para mostrar
  } else {
    // Si no, capitalizar el jugador record para mostrar
    jugadorRecord = jugadorRecord.charAt(0).toUpperCase() + jugadorRecord.slice(1).toLowerCase();
  }

  // Actualizar historial de ganadores
  let historial = JSON.parse(localStorage.getItem('historialGanadores')) || {};
  const ganadorMinus = ganadorCapitalizado.toLowerCase();
  historial[ganadorMinus] = (historial[ganadorMinus] || 0) + 1;
  localStorage.setItem('historialGanadores', JSON.stringify(historial));

  // Encontrar máximo ganador para mostrar
  let maxGanador = '';
  let maxVeces = 0;
  for (const jugador in historial) {
    if (historial[jugador] > maxVeces) {
      maxVeces = historial[jugador];
      maxGanador = jugador;
    }
  }
  // Capitalizar maxGanador para mostrar
  if (maxGanador) {
    maxGanador = maxGanador.charAt(0).toUpperCase() + maxGanador.slice(1).toLowerCase();
  }

  // Llamar a función para mostrar las secciones, pasando valores capitalizados y puntos máximos actualizados
  mostrarSecciones(ganadorCapitalizado, maxGanador, maxVeces, Math.max(maxPuntos, recordActual), jugadorRecord);




    // MANTENEMOS TU LÓGICA EXISTENTE
    selectorGanador.value = ganador;

    // Enviar premio al ganador
    enviarPremioGanador();

    // Eliminar trofeo en juego al finalizar torneo
    localStorage.removeItem('trofeoEnJuego');

    // Eliminar puntos acumulados
    localStorage.removeItem('acumulados');

    // Limpieza visual del trofeo en juego
    const contenedorContenido = document.getElementById('trofeo-en-juego-contenido');
    contenedorContenido.innerHTML = '';
    tituloTrofeo.textContent = '';
    selectorPremio.innerHTML = '<option value="">Selecciona premio</option>';

    // Desbloquear las imágenes del catálogo
    document.querySelectorAll('#catalogoTrofeos .item').forEach((item) => {
      item.style.pointerEvents = 'auto';
      item.style.opacity = '1';
    });

  
});




  const acumulados = Array(nombresJugadores.length).fill(0);

  const esAdmin = localStorage.getItem("modoAdmin") === "true";

 function llenarTablaConInputs() {
  tbody.innerHTML = '';

  const torneoActivo = localStorage.getItem('trofeoEnJuego');
  // Leer puntos ingresados temporalmente para que no se pierdan al refrescar
  const puntosIngresados = torneoActivo ? JSON.parse(localStorage.getItem('puntosIngresados')) || {} : {};

  const acumuladosGuardados = torneoActivo ? JSON.parse(localStorage.getItem('acumulados')) || {} : {};

  const jugadoresOrdenados = nombresJugadores.map(nombre => ({
    nombre,
    acumulado: acumuladosGuardados[nombre] || 0
  }));


  // Ordenar por acumulado descendente
  jugadoresOrdenados.sort((a, b) => b.acumulado - a.acumulado);

  jugadoresOrdenados.forEach(({nombre, acumulado}, index) => {
    const fila = document.createElement('tr');
    fila.classList.add('fila-animada');
    fila.style.animationDelay = `${index * 0.15}s`;

    const tdPosicion = document.createElement('td');
    tdPosicion.textContent = `${index + 1}°`;
    tdPosicion.classList.add('puesto-general');
    if (index === 0) tdPosicion.classList.add('puesto-1');
    else if (index === 1) tdPosicion.classList.add('puesto-2');
    else if (index === 2) tdPosicion.classList.add('puesto-3');

    const tdNombre = document.createElement('td');
    tdNombre.textContent = nombre;
    tdNombre.classList.add('nombre-jugador');

    const tdPuntosObtenidos = document.createElement('td');
    if (esAdmin) {
      const inputPuntos = document.createElement('input');
      inputPuntos.type = 'number';
      inputPuntos.min = '0';
      inputPuntos.classList.add('input-puntos');
      inputPuntos.value = puntosIngresados[nombre] || '';
      // Actualizar localStorage al cambiar valor
      inputPuntos.addEventListener('input', () => {
        puntosIngresados[nombre] = inputPuntos.value;
        localStorage.setItem('puntosIngresados', JSON.stringify(puntosIngresados));
      });
      tdPuntosObtenidos.appendChild(inputPuntos);
    } else {
      tdPuntosObtenidos.textContent = '-';
    }


    const tdPuntosAcumulados = document.createElement('td');
    tdPuntosAcumulados.textContent = acumulado;
    tdPuntosAcumulados.classList.add('acumulado');

    fila.appendChild(tdPosicion);
    fila.appendChild(tdNombre);
    fila.appendChild(tdPuntosObtenidos);
    fila.appendChild(tdPuntosAcumulados);

    tbody.appendChild(fila);
  });
}



llenarTablaConInputs();
actualizarTablaOrdenada();




  function actualizarTablaOrdenada() {
    const jugadoresConDatos = [];
    const filas = tbody.querySelectorAll('tr');
    filas.forEach((fila) => {
      const nombre = fila.querySelector('.nombre-jugador').textContent;
      const acumulado = parseInt(fila.querySelector('.acumulado').textContent) || 0;
      jugadoresConDatos.push({ fila, nombre, acumulado });
    });

    jugadoresConDatos.sort((a, b) => b.acumulado - a.acumulado);
    tbody.innerHTML = '';

    jugadoresConDatos.forEach((jugador, index) => {
      const tdPos = jugador.fila.querySelector('td');
      tdPos.textContent = `${index + 1}°`;
      tdPos.classList.remove('puesto-1', 'puesto-2', 'puesto-3');
      if (index === 0) tdPos.classList.add('puesto-1');
      else if (index === 1) tdPos.classList.add('puesto-2');
      else if (index === 2) tdPos.classList.add('puesto-3');

      jugador.fila.querySelector('.nombre-jugador').textContent = jugador.nombre;
      jugador.fila.querySelector('.acumulado').textContent = jugador.acumulado;

      tbody.appendChild(jugador.fila);
    });
  }

  btnGuardar?.addEventListener('click', () => {
    const filas = tbody.querySelectorAll('tr');
    filas.forEach((fila) => {
      const input = fila.querySelector('input.input-puntos');
      const puntosObtenidos = parseInt(input.value) || 0;
      const acumuladoElem = fila.querySelector('.acumulado');
      const acumuladoActual = parseInt(acumuladoElem.textContent) || 0;
      const nuevoAcumulado = acumuladoActual + puntosObtenidos;
      acumuladoElem.textContent = nuevoAcumulado;
      input.value = '';
    });
    actualizarTablaOrdenada();

  const acumuladosParaGuardar = {};
  tbody.querySelectorAll('tr').forEach((fila) => {
    const nombre = fila.querySelector('.nombre-jugador').textContent;
    const acumulado = parseInt(fila.querySelector('.acumulado').textContent) || 0;
    acumuladosParaGuardar[nombre] = acumulado;
  });
  localStorage.setItem('acumulados', JSON.stringify(acumuladosParaGuardar));


  });

  btnBorrarPuntos.addEventListener('click', () => {
    const filas = tbody.querySelectorAll('tr');
    filas.forEach((fila) => {
      fila.querySelector('.acumulado').textContent = '0';
      fila.querySelector('input.input-puntos').value = '';
    });
    for (let i = 0; i < acumulados.length; i++) acumulados[i] = 0;
    llenarTablaConInputs();
  });

  llenarTablaConInputs();

  btnAbrir.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  const btnCerrarCrear = document.getElementById('cerrarModalCrear');
  btnCerrarCrear.addEventListener('click', () => {
    modal.style.display = 'none';
    catalogoTrofeos.classList.add('hidden');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      catalogoTrofeos.classList.add('hidden');
    }
  });

  btnVerTrofeos.addEventListener('click', () => {
    catalogoTrofeos.classList.remove('hidden');
  });

  // Ya no hay btnVerMedallas ni catalogoMedallas ni eventos para eso

  function seleccionarImagen(selector, tipo) {
    const items = document.querySelectorAll(selector);
    items.forEach((item) => {
      const img = item.querySelector('img');
      item.addEventListener('click', () => {
        const src = img.getAttribute('src');
        const nombre = img.getAttribute('alt') || 'Torneo';


       // Confirmación
       if (!confirm(`¿Estás seguro de competir por este trofeo: ${nombre}?`)) return;

      // Guardar en localStorage el trofeo en juego
      localStorage.setItem('trofeoEnJuego', src);

        const contenedorContenido = document.getElementById('trofeo-en-juego-contenido');
        contenedorContenido.innerHTML = `
          <img src="${src}" alt="${nombre}" class="img-trofeo-en-juego" />
          <p class="nombre-trofeo">${nombre}</p>
        `;
        tituloTrofeo.textContent = tipo === 'trofeo' ? 'Trofeo en Juego' : 'Medalla en Juego';
        selectorPremio.innerHTML = `<option value="${src}" selected>${nombre}</option>`;


        // Ocultar modal
        modal.style.display = 'none';
        catalogoTrofeos.classList.add('hidden');

         
         // ❌ Bloquear los otros trofeos
      document.querySelectorAll(`${selector}`).forEach((otroItem) => {
        if (otroItem !== item) {
          otroItem.style.pointerEvents = 'none';
          otroItem.style.opacity = '0.4';
        }
      });
       

        llenarTablaConInputs();
      });
    });

// Al cargar, verificar si ya hay un trofeo en juego
  const trofeoGuardado = localStorage.getItem('trofeoEnJuego');
if (trofeoGuardado) {
  // 👉 Mostrar el trofeo en la sección "Trofeo en juego"
  const nombre = trofeoGuardado.split('/').pop().replace('.png', '');
  const contenedorContenido = document.getElementById('trofeo-en-juego-contenido');
  contenedorContenido.innerHTML = `
    <img src="${trofeoGuardado}" class="img-trofeo-en-juego" />
    <p class="nombre-trofeo">${nombre}</p>
  `;
  tituloTrofeo.textContent = 'Trofeo en Juego';
  selectorPremio.innerHTML = `<option value="${trofeoGuardado}" selected>${nombre}</option>`;

  // 👉 Bloquear visualmente los otros trofeos del catálogo
  document.querySelectorAll(selector).forEach((item) => {
    const img = item.querySelector('img');
    if (img.getAttribute('src') !== trofeoGuardado) {
      item.style.pointerEvents = 'none';
      item.style.opacity = '0.4';
    }
  });
}


}

  seleccionarImagen('#catalogoTrofeos .item', 'trofeo');
});



// 🌟 MODAL DE PERFILES REINSTALADO
const modalPerfiles = document.getElementById('modalPerfiles');
const btnPerfiles = document.querySelector('a[href="perfil.html"]');
const cerrarModalPerfiles = document.getElementById('cerrarModalPerfiles');

btnPerfiles.addEventListener('click', (e) => {
  e.preventDefault();
  modalPerfiles.style.display = 'flex';
});

cerrarModalPerfiles.addEventListener('click', () => {
  modalPerfiles.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modalPerfiles) {
    modalPerfiles.style.display = 'none';
  }
});

document.querySelectorAll('#modalPerfiles .item img').forEach((img) => {
  img.addEventListener('click', () => {
    const destino = img.dataset.perfil;
    window.location.href = destino;
  });
});

function enviarPremioGanador() {
  const jugador = document.getElementById('selectorGanador').value.toLowerCase();
  const premioRelativo = document.getElementById('selectorPremio').value;

  if (!jugador || !premioRelativo) {
    alert('Selecciona jugador y premio');
    return;
  }

  // Listas de imágenes trofeos y medallas
  const trofeosImgs = [
    'img/trofeos/copa-azul.png',
    'img/trofeos/copa-caparazon.png',
    'img/trofeos/copa-m.png',
    'img/trofeos/copa-race.png'
  ];

  const medallasImgs = [
    'img/relampago/champiñon.png',
    'img/relampago/estrella.png',
    'img/relampago/flor.png',
    'img/relampago/hoja.png',
    'img/relampago/corona.png',
    'img/relampago/champiñon-especial.png'
  ];

  // Función para obtener una medalla aleatoria según probabilidad
  function medallaAleatoria() {
  const prob = Math.random();
  if (prob < 0.05) return medallasImgs[5];       // champiñon-especial (5%)
  else if (prob < 0.15) return medallasImgs[4];  // corona (10%)
  else if (prob < 0.40) return medallasImgs[3];  // hoja (25%) ← aumentada
  else if (prob < 0.60) return medallasImgs[2];  // flor (20%)
  else if (prob < 0.75) return medallasImgs[1];  // estrella (15%) ← reducida
  else return medallasImgs[0];                   // champiñon (25%)
}


  // Leer datos actuales o crear nuevos
  let premiosJugadores = JSON.parse(localStorage.getItem('premiosJugadores')) || {};

  // Inicializar arrays detallados de premios para el ganador
  let trofeosJugador = JSON.parse(localStorage.getItem(`trofeos_${jugador}`)) || [];
  let medallasJugador = JSON.parse(localStorage.getItem(`medallas_${jugador}`)) || [];

  // Ajustar ruta si es necesario
  const rutaPremio = premioRelativo.startsWith('img/') ? premioRelativo : premioRelativo.replace('../../', '');

  if (!premiosJugadores[jugador]) {
    premiosJugadores[jugador] = { trofeos: 0, medallas: 0, ultimaImagen: '' };
  }

  // Asignar trofeo o medalla al ganador
  if (trofeosImgs.includes(rutaPremio)) {
    premiosJugadores[jugador].trofeos++;
    trofeosJugador.push(rutaPremio);
    localStorage.setItem(`trofeos_${jugador}`, JSON.stringify(trofeosJugador));
  } else if (medallasImgs.includes(rutaPremio)) {
    premiosJugadores[jugador].medallas++;
    medallasJugador.push(rutaPremio);
    localStorage.setItem(`medallas_${jugador}`, JSON.stringify(medallasJugador));
  }

  premiosJugadores[jugador].ultimaImagen = rutaPremio;

  // Obtener segundo y tercer lugar de la tabla (asegurarse que existan)
  const filas = document.querySelectorAll('#tabla-puntos tr');
  const segundo = filas[1]?.querySelector('.nombre-jugador')?.textContent.toLowerCase();
  const tercero = filas[2]?.querySelector('.nombre-jugador')?.textContent.toLowerCase();

  // Función para asignar medalla aleatoria a jugador
  function asignarMedalla(jugadorMedalla) {
  if (!jugadorMedalla) return;

  if (!premiosJugadores[jugadorMedalla]) {
    premiosJugadores[jugadorMedalla] = { trofeos: 0, medallas: 0, especiales: 0, ultimaImagen: '' };
  }

  const medalla = medallaAleatoria();

  premiosJugadores[jugadorMedalla].medallas++;

  // Actualizar array medallas detalladas
  let medallasJugador = JSON.parse(localStorage.getItem(`medallas_${jugadorMedalla}`)) || [];
  medallasJugador.push(medalla);
  localStorage.setItem(`medallas_${jugadorMedalla}`, JSON.stringify(medallasJugador));

  // 👉 Contar como especial si corresponde
  if (medalla === 'img/relampago/champiñon-especial.png') {
    premiosJugadores[jugadorMedalla].especiales = (premiosJugadores[jugadorMedalla].especiales || 0) + 1;
  }

  premiosJugadores[jugadorMedalla].ultimaImagen = medalla;
}
  asignarMedalla(segundo);
  asignarMedalla(tercero);

  // Guardar todo en localStorage
  localStorage.setItem('premiosJugadores', JSON.stringify(premiosJugadores));

  alert(`🎉 Premio enviado a ${jugador.toUpperCase()} y medallas asignadas a 2° y 3° lugar.`);
}


const selectorGanador = document.getElementById('selectorGanador');
const selectorPremio = document.getElementById('selectorPremio');






// Migrar datos antiguos si existen
function migrarPremiosAntiguos() {
  const nombresJugadores = ['carlos', 'cris', 'manuel', 'hector', 'ricardo', 'pablo', 'raul', 'yahir'];
  let datosNuevos = JSON.parse(localStorage.getItem('premiosJugadores')) || {};

  nombresJugadores.forEach((nombre) => {
    const claveAntigua = 'premioPara_' + nombre;
    const premioAntiguo = localStorage.getItem(claveAntigua);

    if (premioAntiguo) {
      if (!datosNuevos[nombre]) {
        datosNuevos[nombre] = { trofeos: 0, medallas: 0, ultimaImagen: '' };
      }

      // Suponemos que el premio antiguo es una imagen de trofeo o medalla
      if (premioAntiguo.includes('trofeos')) {
        datosNuevos[nombre].trofeos++;
        let trofeosJugador = JSON.parse(localStorage.getItem(`trofeos_${nombre}`)) || [];
        trofeosJugador.push(premioAntiguo);
        localStorage.setItem(`trofeos_${nombre}`, JSON.stringify(trofeosJugador));
      } else if (premioAntiguo.includes('relampago')) {
        datosNuevos[nombre].medallas++;
        let medallasJugador = JSON.parse(localStorage.getItem(`medallas_${nombre}`)) || [];
        medallasJugador.push(premioAntiguo);
        localStorage.setItem(`medallas_${nombre}`, JSON.stringify(medallasJugador));
      }
      datosNuevos[nombre].ultimaImagen = premioAntiguo;

      // Limpiar la clave antigua
      localStorage.removeItem(claveAntigua);
    }
  });

  localStorage.setItem('premiosJugadores', JSON.stringify(datosNuevos));
}

migrarPremiosAntiguos();



document.addEventListener('DOMContentLoaded', () => {
  const btnAbrirReglas = document.getElementById('menuReglas');
  const modalReglas = document.getElementById('modalReglas');
  const btnCerrarReglas = document.getElementById('cerrarModalReglas');

  btnAbrirReglas.addEventListener('click', (e) => {
    e.preventDefault();  // Para que no salte al inicio por el href="#"
    modalReglas.style.display = 'flex'; // O block, según tu CSS
  });

  btnCerrarReglas.addEventListener('click', () => {
    modalReglas.style.display = 'none';
  });

  // Opcional: cerrar modal si se clickea fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === modalReglas) {
      modalReglas.style.display = 'none';
    }
  });
});


//animacion imagenes//

document.addEventListener("DOMContentLoaded", () => {
  const imagenAnimada = document.getElementById("imagenAnimada");

  if (imagenAnimada) {
    const imagenes = [
      "img/toad-.png",          // Imagen válida para iniciar
      "img/dkp.png",
      "img/baby-peach.png",
      "img/luigi.png",
      "img/rey-boo.png",
      "img/warrio.png",
      "img/baby-mario.png",
      "img/waluigi.png",
      "img/flor-.png",
      "img/baby-bowser.png",
      "img/peach-.png",
      "img/baby-princesa.png",
      "img/mario2.png",
      "img/mi-.png",
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

