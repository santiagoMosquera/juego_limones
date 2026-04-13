let canvas=document.getElementById("areajuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ALTURA_LIMON=20;
const ANCHO_LIMON=20;

let personajeX=canvas.width/2;
let personajeY=canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=5;
let puntaje=0;
let vidas=3;
let velocidadcaida=200;
let intervalo;

function iniciar(){
    intervalo = setInterval(bajarLimon, velocidadcaida);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="#8B4513";
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="#ffe600";
    ctx.fillRect(personajeX, personajeY, ANCHO_PERSONAJE, ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
}

function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="#00ff00";
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTURA_LIMON);
}

function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX+ANCHO_LIMON>personajeX &&
       limonX < personajeX+ANCHO_PERSONAJE &&
       limonY+ALTURA_LIMON>personajeY &&
       limonY < personajeY+ALTURA_PERSONAJE) {
       aparecerLimon();
       puntaje=puntaje+1;
       mostrarEnSpan("txtPuntaje", puntaje);
    }

    if(puntaje === 3){
        velocidadcaida = 150;
        clearInterval(intervalo);                          
        intervalo = setInterval(bajarLimon, velocidadcaida); 
    } else if(puntaje === 6){
        velocidadcaida = 100;
        clearInterval(intervalo);                         
        intervalo = setInterval(bajarLimon, velocidadcaida); 
    } else if(puntaje === 10){
        clearInterval(intervalo);
        alert("TIENES LOS LIMONES; AHORA TE FALTA SAL Y TEQUILA");
    }
}

function detectarPiso(){
    if(limonY+ALTURA_LIMON>canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas", vidas);    
    }

    if(vidas === 0){
        clearInterval(intervalo);
        alert("GAME OVER");
    }
}    

function aparecerLimon(){
    limonX=generarAleatorio(0, canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}

function reiniciar(){
    clearInterval(intervalo);
    puntaje = 0;
    vidas = 3;
    velocidadcaida = 200;
    personajeX = canvas.width / 2;
    limonX = canvas.width / 2;
    limonY = 5;
    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);
    iniciar();
}