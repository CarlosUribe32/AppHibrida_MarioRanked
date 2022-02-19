window.onload = init;

function init(){
    let path = window.location.pathname;
    let file = path.substring(path.lastIndexOf('/') + 1);

    switch (file) {
        case "index.html":
            index();
            break;
        case "creditos.html":
            creditos();
            break;
        case "personajes.html":
            personajes();
            break;
        case "puntuacion.html":
            puntuacion();
            break;
        case "login.html":
            login();
            break;
        case "niveles.html":
            niveles();
            break;
        // case "nivel1.html":
        //     game1();
        //     break;
        // case "nivel2.html":
        //     nivel2();
        //     break;
        default:
            break;
    }
}