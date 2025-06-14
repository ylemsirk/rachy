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

document.addEventListener("DOMContentLoaded", () => {
  const ventana = document.querySelector(".ventana-mensaje");
  const barra = ventana.querySelector(".barra-mensaje");

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

 document.querySelector('.btn-minimizar').addEventListener('click', () => {
    document.querySelector('.contenido-mensaje').style.display = 'none';
});

document.querySelector('.btn-maximizar').addEventListener('click', () => {
    document.querySelector('.contenido-mensaje').style.display = 'flex';
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

document.addEventListener('DOMContentLoaded', () => {
  const botonAceptar = document.getElementById('aceptar');
  const yaySound = document.getElementById('yay-sound');
  const first4 = document.getElementById('first-photo4');

  const contenedorBotones = document.querySelector('.botones');
  const botonesInternos = contenedorBotones.querySelectorAll('button');

  // Manejar el click
  botonAceptar.addEventListener('click', () => {
    // Mostrar popup
    first4.classList.remove('oculto2');

    // Desactivar botones internos
    botonesInternos.forEach(btn => btn.disabled = true);

    // Reproducir sonido
    yaySound.currentTime = 0;
    yaySound.play();
  });

  // Manejar el fin del sonido (solo una vez, desde el inicio)
  yaySound.addEventListener('ended', () => {
    // Ocultar popup
    first4.classList.add('oculto2');

    // Reactivar botones internos
    botonesInternos.forEach(btn => btn.disabled = false);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const fondotop = document.querySelector('.top #fondotop');
  const fondoall = document.body;
  

  // Configuración de fondos y colores para cada contenido
  const backgrounds = {
    1: {
      image: 'fondomoving3.png',
      fondotopColor: 'rgb(0, 137, 168)',
      bodyColor: 'rgb(0, 168, 240)'
    },
    2: {
      image: 'stars.gif',
      fondotopColor: 'black',
      bodyColor: 'rgb(20, 20, 20)'
    },
    3: {
      image: 'stars.gif.',
      fondotopColor: 'black',
      bodyColor: 'rgb(20, 20, 20)'
    },
    4: {
      image: 'fondomoving2.jpeg',
      fondotopColor: 'rgb(255, 120, 180)', // rosado
      bodyColor: 'rgb(255, 190, 190)'
    },
    5: {
      image: 'forhis.png',
      fondotopColor: 'orange',
      bodyColor: 'orange'
    },
    6: {
      image: 'forhis.png',
      fondotopColor: 'orange',
      bodyColor: 'orange'
    },
    7: {
      image: 'forhis.png',
      fondotopColor: 'orange',
      bodyColor: 'orange'
    },
    8: {
      image: 'forhis.png',
      fondotopColor: 'orange',
      bodyColor: 'orange'
    },
    9: {
      image: 'forhis.png',
      fondotopColor: 'orange',
      bodyColor: 'orange'
    },
    10: {
      image: 'fondomoving.png',
      fondotopColor: 'purple',
      bodyColor: 'purple'
    }
  };

  // Agrupaciones para evitar cambios de fondo entre ciertos botones
  const grupoBats = [2, 3];
  const grupoOrange = [5, 6, 7, 8, 9];

  // Oculta todos los contenidos excepto el seleccionado
  function mostrarContenido(num) {
    for (let i = 1; i <= 10; i++) {
      const cont = document.querySelector(`.contenido${i}`);
      if (cont) {
        if (i === num) {
          cont.classList.remove('ocultar');
        } else {
          cont.classList.add('ocultar');
        }
      }
    }
  }

  // Guarda el último grupo de fondo aplicado
  let ultimoGrupo = null;

  // Maneja el cambio de fondo y color según las reglas
  function cambiarFondo(num) {
    // Detectar grupo actual
    let grupoActual = null;
    if (grupoBats.includes(num)) grupoActual = 'bats';
    if (grupoOrange.includes(num)) grupoActual = 'orange';

    // Si es grupo bats y el anterior también, no cambiar fondo
    if (grupoActual === 'bats' && ultimoGrupo === 'bats') return;
    // Si es grupo orange y el anterior también, no cambiar fondo
    if (grupoActual === 'orange' && ultimoGrupo === 'orange') return;

    // Cambiar fondo y colores
    const bg = backgrounds[num];
    if (bg) {
      fondotop.style.backgroundImage = `url("${bg.image}")`;
      fondotop.style.backgroundColor = bg.fondotopColor;
      fondoall.style.backgroundColor = bg.bodyColor;
    }

    // Actualiza el grupo actual
    ultimoGrupo = grupoActual;
    // Si no es grupo especial, resetea
    if (!grupoActual) ultimoGrupo = null;
  }

  // Asigna eventos a todos los botones
  for (let i = 1; i <= 10; i++) {
    const btn = document.querySelector(`.botongrid${i}`);
    const cont = document.querySelector(`.contenido${i}`);
    if (btn && cont) {
      btn.addEventListener('click', () => {
        // Solo cambiar si el contenido está oculto
        if (cont.classList.contains('ocultar')) {
          mostrarContenido(i);
          cambiarFondo(i);
        }
      });
    }
  }
});


document.addEventListener("DOMContentLoaded", () => {
    // Configuración de sets
    const sets = [
        {
            root: document.querySelector('.ventana-y-botones-set1'),
            images: Array.from(document.querySelectorAll('#roblox1 img')),
            video: null,
            textImgs: Array.from(document.querySelectorAll('.img-texto-set1 img')),
            textos: Array.from(document.querySelectorAll('.img-texto-set1 p')),
            kuromis: Array.from(document.querySelectorAll('.img-kuromi-set1 img')),
            btnPrev: document.getElementById('botonset1'),
            btnNext: document.getElementById('botonset2')
        },
        {
            root: document.querySelector('.ventana-y-botones-set2'),
            images: Array.from(document.querySelectorAll('#roblox2 img')),
            video: null,
            textImgs: Array.from(document.querySelectorAll('.img-texto-set2 img')),
            textos: Array.from(document.querySelectorAll('.img-texto-set2 p')),
            kuromis: Array.from(document.querySelectorAll('.img-kuromi-set2 img')),
            btnPrev: document.getElementById('botonset21'),
            btnNext: document.getElementById('botonset22')
        },
        {
            root: document.querySelector('.ventana-y-botones-set3'),
            images: Array.from(document.querySelectorAll('#roblox3 img')),
            video: null,
            textImgs: Array.from(document.querySelectorAll('.img-texto-set3 img')),
            textos: Array.from(document.querySelectorAll('.img-texto-set3 p')),
            kuromis: Array.from(document.querySelectorAll('.img-kuromi-set3 img')),
            btnPrev: document.getElementById('botonset31'),
            btnNext: document.getElementById('botonset32')
        },
        {
            root: document.querySelector('.ventana-y-botones-set4'),
            images: Array.from(document.querySelectorAll('#roblox4 img')),
            video: document.querySelector('#roblox4 video'),
            textImgs: Array.from(document.querySelectorAll('.img-texto-set4 img')),
            textos: Array.from(document.querySelectorAll('.img-texto-set4 p')),
            kuromis: Array.from(document.querySelectorAll('.img-kuromi-set4 img')),
            btnPrev: document.getElementById('botonset41'),
            btnNext: document.getElementById('botonset42')
        }
    ];

    let currentSet = 0;
    let indices = [0, 0, 0, 0]; // índice de imagen actual para cada set

    // Mostrar el set activo y ocultar los demás con transición
    function mostrarSet(idx) {
        sets.forEach((set, i) => {
            set.root.classList.remove('activo', 'oculto');
            if (i === idx) {
                set.root.style.display = 'block';
                set.root.classList.add('activo');
            } else {
                set.root.classList.add('oculto');
                setTimeout(() => set.root.style.display = 'none', 600);
            }
        });
        mostrarImagen(idx, indices[idx]);
    }

    // Mostrar imagen, texto, kuromi y globo de texto del set y slide actual
    function mostrarImagen(setIdx, imgIdx) {
        const set = sets[setIdx];
        // Imágenes principales
        set.images.forEach((img, i) => img.classList.toggle('activa', i === imgIdx));
        // Video (solo set 4)
        if (set.video) set.video.classList.toggle('activa', imgIdx === set.images.length);
        // Globos de texto
        set.textImgs.forEach((img, i) => img.classList.toggle('activa', i === imgIdx));
        // Textos
        set.textos.forEach((p, i) => p.classList.toggle('activa', i === imgIdx));
        // Kuromis
        set.kuromis.forEach((k, i) => k.classList.toggle('activa', i === imgIdx));
        // Efecto máquina de escribir solo al texto activo
        set.textos.forEach((p, i) => {
            if (i === imgIdx) {
                if (!p.dataset.fulltext) p.dataset.fulltext = p.textContent;
                typeWriter(p, p.dataset.fulltext);
            }
        });
    }

    // Efecto máquina de escribir
    function typeWriter(element, text, speed = 25) {
        element.textContent = "";
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    // Botones internos de cada set (carrusel)
    sets.forEach((set, setIdx) => {
        const total = set.images.length + (set.video ? 1 : 0);
        set.btnNext && set.btnNext.addEventListener('click', () => {
            indices[setIdx] = (indices[setIdx] + 1) % total;
            mostrarImagen(setIdx, indices[setIdx]);
        });
        set.btnPrev && set.btnPrev.addEventListener('click', () => {
            indices[setIdx] = (indices[setIdx] - 1 + total) % total;
            mostrarImagen(setIdx, indices[setIdx]);
        });
    });

    // Botones laterales para cambiar de set
    document.querySelector('.boton-lateral-izq').addEventListener('click', () => {
        sets[currentSet].root.classList.remove('activo');
        currentSet = (currentSet - 1 + sets.length) % sets.length;
        mostrarSet(currentSet);
    });
    document.querySelector('.boton-lateral-der').addEventListener('click', () => {
        sets[currentSet].root.classList.remove('activo');
        currentSet = (currentSet + 1) % sets.length;
        mostrarSet(currentSet);
    });

    // Inicializar
    mostrarSet(currentSet);
});