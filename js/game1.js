import kaboom from "./vendor/kaboom.mjs";
window.onload = game1;

function game1(){

    //Inicializamos Kaboom
    kaboom({
        global: true,
        fullscreen: true,
        scale: 1,
        debug: true,
        background: [137, 226, 234]
    })

    //Cargamos las imagenes
    loadRoot('../imgs/');
    loadSprite('piso', 'nivel_piso.png');
    loadSprite('bloque', 'nivel_bloque.png');
    loadSprite('bloqueVacio', 'nivel_bloque2.png');
    loadSprite('flor', 'nivel_flor.png');
    loadSprite('goomba', 'nivel_goomba.png');
    loadSprite('goomba2', 'nivel_goomba2.png');
    loadSprite('hongo', 'nivel_hongo.png');
    loadSprite('moneda', 'nivel_moneda.png');
    loadSprite('sorpresa', 'nivel_sorpresa.png');
    loadSprite('tubo', 'nivel_tubo.png');
    loadSprite('tubo2', 'nivel_tubo2.png');
    loadSprite('tubo3', 'nivel_tubo3.png');
    loadSprite('marioGrande', 'personaje_mario2.png');
    loadSprite('luigiGrande', 'personaje_luigi2.png');
    loadSprite('toadGrande', 'personaje_toad2.png');
    loadSprite('mario', 'personaje_mario.png');
    loadSprite('luigi', 'personaje_luigi.png');
    loadSprite('toad', 'personaje_toad.png');

    //Definimos el escenario
    addLevel([
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                          ",
        "                      ",
        "                          ",
        "                         ",
        "=========================== ======",
    ], {
        // Definimos el tamaño de cada bloque
        width: 35,
        height: 35,
        // Relacionamos los simbolos con las imagenes
        "=": () => [
            scale(1.7),
            sprite("piso"),
            area(),
            solid(),
        ],
        // "$": () => [
        //     sprite("coin"),
        //     area(),
        //     pos(0, -9),
        // ],
        // "^": () => [
        //     sprite("spike"),
        //     area(),
        //     "danger",
        // ],
    })
    const jugador = add([
        scale(0.015),
        sprite('mario'),
        area(),
        solid(),
        pos(30, 0),
        body(),
        origin('bot'),
    ])

    onKeyPress("space", () => {
        if (jugador.isGrounded()) {
            jugador.jump()
        }
    })

}