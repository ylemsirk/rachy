const titulo = document.querySelector(".playlist h1");
const nombre = document.querySelector(".playlist p");

const progreso = document.getElementById("progress");
const cancion = document.getElementById("cancion");

const iconcontrol = document.getElementById("iconcontrol");
const start = document.querySelector(".controls button.start");

const back = document.querySelector(".controls button.back");
const next = document.querySelector(".controls button.next");

const songs = [ 
        {
        titulo: "Sunny",
        nombre: "Luis Miguel",
        fuente: "sunny.mp3",
    },
        {
        titulo: "Hate You",
        nombre: "Jungkook",
        fuente: "hate.mp3",
    },
        {
        titulo: "Pensar en ti",
        nombre: "Luis Miguel",
        fuente: "pensar.mp3",
    },
        {
        titulo: "Glue song",
        nombre: "Beabadoobee",
        fuente: "glue.mp3",
    },
        {
        titulo: "Take a chance on me",
        nombre: "Abba",
        fuente: "take.mp3",
    },
        {
        titulo: "Soy un perdedor",
        nombre: "Luis Miguel",
        fuente: "perdedor.mp3",
    },
        {
        titulo: "Decalcomania",
        nombre: "Jungkook",
        fuente: "decalco.mp3",
    },
        {
        titulo: "Suave",
        nombre: "Luis Miguel",
        fuente: "suave.mp3",
    },
    {
        titulo: "Love me again",
        nombre: "V",
        fuente: "love.mp3",
    },
        {
        titulo: "Devuélveme el amor",
        nombre: "Luis Miguel",
        fuente: "amor.mp3",
    },
    {
        titulo: "Still with you",
        nombre: "Jungkook",
        fuente: "still.mp3",
    },
        {
        titulo: "La Incondicional",
        nombre: "Luis Miguel",
        fuente: "incondicional.mp3",
    },
        {
        titulo: "Once more to see you",
        nombre: "Mitski",
        fuente: "once.mp3",
    },
        {
        titulo: "Oro de Ley",
        nombre: "Luis Miguel",
        fuente: "oro.mp3",
    },
        {
        titulo: "Sol, arena y mar",
        nombre: "Luis Miguel",
        fuente: "sol.mp3",
    },

]
