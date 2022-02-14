let personajeSeleccionado;

function personajes(){
    if(localStorage.getItem('personajeSeleccionado')!==null)
        localStorage.removeItem('personajeSeleccionado');
    console.log(localStorage.getItem('personajeSeleccionado'));

}

function personajes_seleccion(elPersonaje){
    personajeSeleccionado = elPersonaje;
    localStorage.setItem('personajeSeleccionado', personajeSeleccionado);
    location.href = "niveles.html"
}