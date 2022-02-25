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
    for(let i = 0; i<5; i++){
        pntfilas.innerHTML += '<tr><td>1.</td> <td>'+localStorage.key(i)+'</td> <td>5000</td></tr>';
    }
}
function pnt_condicionParaOrdenar(personaA, personaB) {
    return personaB.puntos - personaA.puntos;
  }