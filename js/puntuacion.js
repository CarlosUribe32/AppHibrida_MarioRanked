let botonInicio;
let pntfilas;
function puntuacion(){
   botonInicio = document.getElementById("pnt-btn"); 
   botonInicio.addEventListener("click",pnt_inicio);

    pntfilas = document.getElementById("pnt-filas");
    pnt_filasGenaradas();
}

function pnt_inicio(){
    location.href="index.html";
}

function pnt_filasGenaradas(){
    console.log(localStorage);
    for(let i = 0; i<localStorage.length; i++){
        pntfilas.innerHTML += '<tr><td>1.</td> <td>Juan pierre uribe</td> <td>5000</td></tr>';
    }
}