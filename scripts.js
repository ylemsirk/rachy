const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

const canciones = [ 
    {
        titulo: "Sunny",
        nombre: "Luis Miguel",
        fuente: "sunny.mp3"
    },
    {
        titulo: "Hate You",
        nombre: "Jungkook",
        fuente: "hate.mp3"
    },
    {
        titulo: "Pensar en ti",
        nombre: "Luis Miguel",
        fuente: "pensar.mp3"
    },
    {
        titulo: "Glue song",
        nombre: "Beabadoobee",
        fuente: "glue.mp3"
    },
    {
        titulo: "Take a chance on me",
        nombre: "Abba",
        fuente: "take.mp3"
    },
    {
        titulo: "Soy un perdedor",
        nombre: "Luis Miguel",
        fuente: "perdedor.mp3"
    },
    {
        titulo: "Decalcomania",
        nombre: "Jungkook",
        fuente: "decalco.mp3"
    },
    {
        titulo: "Suave",
        nombre: "Luis Miguel",
        fuente: "suave.mp3"
    },
    {
        titulo: "Love me again",
        nombre: "V",
        fuente: "love.mp3"
    },
    {
        titulo: "Devuélveme el amor",
        nombre: "Luis Miguel",
        fuente: "amor.mp3"
    },
    {
        titulo: "Still with you",
        nombre: "Jungkook",
        fuente: "still.mp3"
    },
    {
        titulo: "La Incondicional",
        nombre: "Luis Miguel",
        fuente: "incondicional.mp3"
    },
    {
        titulo: "Once more to see you",
        nombre: "Mitski",
        fuente: "once.mp3"
    },
    {
        titulo: "Oro de Ley",
        nombre: "Luis Miguel",
        fuente: "oro.mp3"
    },
        {
        titulo: "Sol, arena y mar",
        nombre: "Luis Miguel",
        fuente: "sol.mp3"
    },

]

let indiceCancionActual = 0;

function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener('loadeddata',function(){});
};

cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
    } else {
        pausarCancion();
    }
};

function reproducirCancion(){
    cancion.play();
    iconoControl.classList.add('bi-pause-fill')
    iconoControl.classList.remove('bi-play-fill')
}

function pausarCancion(){
    cancion.pause();
    iconoControl.classList.remove('bi-pause-fill')
    iconoControl.classList.add('bi-play-fill')
}

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

// progreso.addEventListener('change', ()=>{
//     reproducirCancion();
// });

botonAdelante.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

actualizarInfoCancion();

// Hacer la ventana arrastrable
const ventana = document.querySelector('.ventana');
const barraSuperior = document.querySelector('.barra-superior');

let offsetX = 0;
let offsetY = 0;
let isArrastrando = false;

barraSuperior.addEventListener('mousedown', (e) => {
    isArrastrando = true;
    offsetX = e.clientX - ventana.getBoundingClientRect().left;
    offsetY = e.clientY - ventana.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isArrastrando) {
        ventana.style.left = `${e.clientX - offsetX}px`;
        ventana.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isArrastrando = false;
});


document.querySelector('.minimizar').addEventListener('click', () => {
    document.querySelector('.reproductor-musica').style.display = 'none';
});

document.querySelector('.maximizar').addEventListener('click', () => {
    document.querySelector('.reproductor-musica').style.display = 'flex';
});

document.addEventListener('mousemove', (e) => {
    if (isArrastrando) {
        const maxX = window.innerWidth - ventana.offsetWidth;
        const maxY = window.innerHeight - ventana.offsetHeight;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Limita el movimiento para que no se salga de la pantalla
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        ventana.style.left = `${newX}px`;
        ventana.style.top = `${newY}px`;
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("boton-confeti");
  const gifContainer = document.getElementById("gif-confeti");
  const sonido = document.getElementById("sonido-confeti");

  boton.addEventListener("click", () => {
    // Borra contenido anterior por si acaso
    gifContainer.innerHTML = "";

    // Crea el GIF
    const gif = document.createElement("img");
    gif.src = "confeti.gif";
    gif.alt = "Confeti animado";

    // Inserta el GIF y lo muestra
    gifContainer.appendChild(gif);
    gifContainer.style.display = "block";

    // Reproduce el sonido
    sonido.currentTime = 0;
    sonido.play();

    // Oculta el GIF luego de 2.5 segundos
    setTimeout(() => {
      gifContainer.style.display = "none";
      gifContainer.innerHTML = "";
    }, 1500);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ventana = document.querySelector(".ventana2");
  const barra = ventana.querySelector(".barra-superior2");

  let isDragging = false;
  let offsetX, offsetY;

  barra.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = ventana.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    ventana.style.position = "fixed";
    ventana.style.zIndex = 1000; // Asegura que esté al frente
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      ventana.style.left = `${e.clientX - offsetX}px`;
      ventana.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});

 document.querySelector('.minimizar2').addEventListener('click', () => {
    document.querySelector('.ventana2-content').style.display = 'none';
});

document.querySelector('.maximizar2').addEventListener('click', () => {
    document.querySelector('.ventana2-content').style.display = 'block';
});


document.addEventListener('DOMContentLoaded', () => {
  const botonRechazar = document.getElementById('rechazar');
  const knockSound = document.getElementById('knock-sound');
  const popupDemon = document.getElementById('popup-demon');

  const contenedorBotones = document.querySelector('.botones'); // tu contenedor
  const botonesInternos = contenedorBotones.querySelectorAll('button'); // todos los botones internos

  botonRechazar.addEventListener('click', () => {
    // Mostrar popup
    popupDemon.classList.remove('oculto');

    // Desactivar botones internos
    botonesInternos.forEach(btn => btn.disabled = true);

    // Reproducir sonido
    knockSound.currentTime = 0;
    knockSound.play();

    knockSound.onended = () => {
      // Ocultar popup
      popupDemon.classList.add('oculto');

      // Reactivar botones internos
      botonesInternos.forEach(btn => btn.disabled = false);
    };
  });
});


