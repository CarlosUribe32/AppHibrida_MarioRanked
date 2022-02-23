let logVolver;
let logListo;
let logTxt;
function login(){

    logVolver = document.getElementById("log-btnvolver");

    logVolver.addEventListener("click", logNavegacion);

    logListo = document.getElementById("log-btnlisto");
    
    logListo.addEventListener("click",logLista);



    
}

function logNavegacion(){

    location.href="index.html";

}

function logLista (){
    logTxt = document.getElementById("log-txtnombre").value;
    console.log(logTxt);

   if(logTxt=="")
        alert("Porfavor ingrese el nombre, gracias.");

    else {

        console.log(window.localStorage.getItem(logTxt));
        if(window.localStorage.getItem(logTxt)!=null)
        {
            let opcion = confirm("El nombre ya existe, ¿Deseas cambiarlo?");
            if(opcion == true)
            {
                window.localStorage.removeItem(logTxt);
                window.localStorage.setItem(logTxt,0);
                if(window.localStorage.getItem("elJugador")!=null){
                    window.localStorage.removeItem("elJugador");
                    window.localStorage.setItem("elJugador",logTxt);
                }
                else
                    window.localStorage.setItem("elJugador",logTxt);
                location.href = "personajes.html";
            }
            

        }
        else
        {
            window.localStorage.setItem(logTxt,0);
            if(window.localStorage.getItem("elJugador")!=null){
                window.localStorage.removeItem("elJugador");
                window.localStorage.setItem("elJugador",logTxt);
            }
            else
                window.localStorage.setItem("elJugador",logTxt);
            location.href = "personajes.html";

        }

    }

}