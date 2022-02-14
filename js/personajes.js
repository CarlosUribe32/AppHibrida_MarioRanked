let personajeSeleccionado;
let personajes_boton_mario;
let personajes_boton_luigi;
let personajes_boton_toad;

function personajes(){
    personajes_boton_mario = document.getElementById("mario");
    personajes_boton_mario.addEventListener("click",personajes_seleccion);

    personajes_boton_luigi = document.getElementById("luigi");
    personajes_boton_luigi.addEventListener("click",personajes_seleccion);

    personajes_boton_toad = document.getElementById("toad");
    personajes_boton_toad.addEventListener("click",personajes_seleccion);

    if(localStorage.getItem('personajeSeleccionado')!==null)
        localStorage.removeItem('personajeSeleccionado');
    console.log(localStorage.getItem('personajeSeleccionado'));

}

function personajes_seleccion(event){
    personajeSeleccionado = event.target.id;
    localStorage.setItem('personajeSeleccionado', personajeSeleccionado);
    console.log(localStorage.getItem('personajeSeleccionado'));
    location.href = "niveles.html"
}