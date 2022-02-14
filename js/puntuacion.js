let botonInicio;
function puntuacion(){
   botonInicio = document.getElementById("pnt-btn"); 
   botonInicio.addEventListener("click",pnt_inicio);
}

function pnt_inicio(){
    location.href="index.html";
}