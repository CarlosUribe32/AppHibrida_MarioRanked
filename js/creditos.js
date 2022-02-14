let creditos_boton;
function creditos(){
    creditos_boton = document.getElementById("creditos_boton");
    creditos_boton.addEventListener("click",creditos_aInicio);
}

function creditos_aInicio(){
    location.href="index.html";
}