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

// Referencias
const ventana2 = document.querySelector('.ventana2');
const barra2 = ventana2.querySelector('.barra-superior2');
const minimizarBtn = ventana2.querySelector('.minimizar');
const maximizarBtn = ventana2.querySelector('.maximizar2');

let isDragging = false;
let offsetX, offsetY;
let maximizada = false;
let posicionAnterior = { top: 0, left: 0, width: '', height: '' };

// 🔄 Minimizar
minimizarBtn.addEventListener('click', () => {
  const contenido = ventana2.querySelector('.contenido-ventana2') || ventana2.querySelector(':scope > :not(.barra-superior2)');
  if (contenido) {
    contenido.style.display = contenido.style.display === 'none' ? 'block' : 'none';
  }
});

// ⛶ Maximizar
maximizarBtn.addEventListener('click', () => {
  if (!maximizada) {
    // Guardar posición y tamaño
    posicionAnterior.top = ventana2.offsetTop;
    posicionAnterior.left = ventana2.offsetLeft;
    posicionAnterior.width = ventana2.style.width;
    posicionAnterior.height = ventana2.style.height;

    // Maximizar
    ventana2.style.top = '0';
    ventana2.style.left = '0';
    ventana2.style.width = '100vw';
    ventana2.style.height = '100vh';
    ventana2.style.zIndex = 999;
  } else {
    // Restaurar
    ventana2.style.top = posicionAnterior.top + 'px';
    ventana2.style.left = posicionAnterior.left + 'px';
    ventana2.style.width = posicionAnterior.width;
    ventana2.style.height = posicionAnterior.height;
  }
  maximizada = !maximizada;
});

// 🖱️ Arrastrar
barra2.addEventListener('mousedown', (e) => {
  if (maximizada) return; // No permitir mover si está maximizada
  isDragging = true;
  offsetX = e.clientX - ventana2.offsetLeft;
  offsetY = e.clientY - ventana2.offsetTop;
  ventana2.style.zIndex = 999; // Traer al frente
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  ventana2.style.left = (e.clientX - offsetX) + 'px';
  ventana2.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
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

