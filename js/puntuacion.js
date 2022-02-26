let botonInicio;
let pntfilas;
function puntuacion(){
   botonInicio = document.getElementById("pnt-btn"); 
   botonInicio.addEventListener("click",pnt_inicio);

    pntfilas = document.getElementById("pnt-tabla");
    pnt_filasGenaradas();
}

function pnt_inicio(){
    location.href="index.html";
}

function pnt_filasGenaradas(){
    let pnt_jugadores=[];
    let pnt_long;
    console.log(localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i)!=='elJugador' && localStorage.key(i)!=='personajeSeleccionado'&& localStorage.key(i)!=='length'){
            let pnt_jugador = {nombre: localStorage.key(i),
                 puntos: localStorage.getItem(localStorage.key(i))};
            pnt_jugadores.push(pnt_jugador);
        }
    }
    pnt_jugadores.sort(pnt_condicionParaOrdenar);

    if(pnt_jugadores.length<5){
        pnt_long = pnt_jugadores.length;
    }
    else{
        pnt_long = 5;
    }
    console
    for(let i = 0; i<pnt_long; i++){
        pntfilas.innerHTML += '<tr><td>'+(i+1)+'</td> <td>'+pnt_jugadores[i].nombre+'</td> <td>'+pnt_jugadores[i].puntos+'</td></tr>';
    }
}
function pnt_condicionParaOrdenar(personaA, personaB) {
    return personaB.puntos - personaA.puntos;
  }