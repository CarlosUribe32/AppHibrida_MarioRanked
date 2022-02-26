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
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i)!=='elJugador' && localStorage.key(i)!=='personajeSeleccionado'&& localStorage.key(i)!=='length'){
            let pnt_jugador = {nombre: localStorage.key(i),
                 puntos: localStorage.getItem(localStorage.key(i))};
            pnt_jugadores.push(pnt_jugador);
        }
    }
    pnt_jugadores.sort(pnt_condicionParaOrdenar);
    console.log(pnt_jugadores);
    for(let i = 0; i<5; i++){
        pntfilas.innerHTML += '<tr><td>'+(i+1)+'</td> <td>'+pnt_jugadores[i].nombre+'</td> <td>'+pnt_jugadores[i].puntos+'</td></tr>';
    }
}
function pnt_condicionParaOrdenar(personaA, personaB) {
    return personaB.puntos - personaA.puntos;
  }