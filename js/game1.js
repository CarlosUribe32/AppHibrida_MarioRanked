import kaboom from "./vendor/kaboom.mjs";
window.onload = game1;

function game1(){
    kaboom({
        global: true,
        fullscreen: true,
        scale: 1,
        debug: true,
        background: [137, 226, 234]
    })

    loadRoot('../imgs/');
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

    addLevel([
        "                           ",
        "                           ",
        "                      =    ",
        "         ====         =    ",
        "                      =    ",
        "               =      =    ",
        "===========================",
    ], {
        // define the size of each block
        width: 32,
        height: 32,
        // define what each symbol means, by a function returning a component list (what will be passed to add())
        "=": () => [
            sprite("bloque"),
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

    // add([
    //     sprite("bloque"),
    //     pos(80, 40),
    // ])
    
    // scene("game", ()=>{
    //     layers(['bg ', 'obj', 'ui'], 'obj')

    //     const map = [
    //         '                                      ',
    //         '                                      ',
    //         '                                      ',
    //         '                                      ',
    //         '                                      ',
    //         '         = = =                        ',
    //         '                                      ',
    //         '                                      ',
    //         '                                      ',
    //         '==============================   =====',
    //     ]

    //     const bloqueNivel = {
    //         width:20,
    //         height:20,
    //         '=': [sprite('bloque'), solid()]
    //     }
  
    //     const gameLevel = addLevel(map, bloqueNivel);
    // })      

    // go("game")
}