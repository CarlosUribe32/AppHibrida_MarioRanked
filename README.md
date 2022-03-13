# AppHibrida_MarioRanked
Este proyecto es una aplicativo híbrido hecho en HTML, CSS y JS aplicando conceptos de optimimización y minificación de
hojas de estilo y scripts. El objetivo de Mario Ranked es brindar una forma de entretenimiento a las personas que esten
interesadas en usar este aplicativo
Para ejecutar el proyecto no es necesaria ninguna configuración a realizar. Solamente asegurar que el aplicativo se este ejecutando como servicio para así asegurar el correcto funcionamiento de los niveles.
La libreria en la que se basa para la construcción de los niveles se llama kaboom.js

# Estructura
## index.html
Contiene la primera visualización del aplicativo en donde se dan las opciones para ir al login, la puntuación y los créditos
## login.html
Contiene el registro del aplicativo en donde los usuarios se logean para así jugar y obtener los puntos bajo el nombre de usuario
## personajes.html
Aca se selecciona el personaje con el que se va a jugar el nivel. Puede ser Mario, Luigi o Toad
## niveles.html
Aca se selecciona uno de los tres niveles con los que se quiere jugar
## nivel1.html nivel2.html nivel3.html
Son las vistas básicas que soportan los scripts en los que se arma el juego. Estos scripts usan una libreria llamada kaboom.js que construye el juego y le da vida
## puntuacion.html
Aca se puntea en un top 5 los mejores puntajes que los usuarios han tenido en el juego
## creditos.html
Vista en la que se visualiza la información del equipo de programadadores que diseño el proyecto

# Información importante
kaboom usa ciertas funciones predeterminadas para funcionar, por lo que los scripts game1.js, game2.js y game3.js no se encuentran dentro del script minificado; por lo tanto las vistas nivel1.html, nivel2.html y nivel3.html no usan el archivo minificado main.min.js

El aplicativo funcional en produccion se encuentra en la carpeta dist (bundle final).

Se le cambio el nombre al aplicativo funcional a: "Niko Ranked" por temas de copyright

# Integrantes del equipo
- Juan Nicolas Ruiz Muñoz
- Jean Pierre Agudelo Taborda
- Carlos Andres Uribe Cortes = Candre