import kaboom from "./vendor/kaboom.mjs";
let monedas = 0;
window.onload = game2;

function game2(){

    const canvas = document.getElementById('nivel_app');

    let pPequeño = localStorage.getItem('personajeSeleccionado');
    let pGrande;
    let escala;
    let escalaGrande
    let estaSaltando;
    const caidaMuerte = 700;
    let tiempoSinMorir;
    let puedoMorir = true;

    if(pPequeño==='mario'){
        pGrande = 'marioGrande';
        escala = 0.012;
        escalaGrande = 0.07;
    }
    else if(pPequeño==='luigi')
    {
        pGrande = 'luigiGrande';
        escala = 0.03;
        escalaGrande = 0.13;
    }
    else if(pPequeño==='toad')
    {
        pGrande = 'toadGrande';
        escala = 0.079;
        escalaGrande = 0.25;
    }
        


    //Inicializamos Kaboom
    kaboom({
        global: true,
        fullscreen: true,
        scale: 1,
        debug: true,
        background: [50, 125, 139], 
        canvas
    })

     //Cargamos las imagenes
     loadRoot('../');
     loadSprite('piso', './imgs/nivel_piso.png');
     loadSprite('bloque', './imgs/nivel_bloque.png');
     loadSprite('bloqueVacio', './imgs/nivel_bloque2.png');
     loadSprite('flor', './imgs/nivel_flor.png');
     loadSprite('goomba', './imgs/nivel_goomba.png');
     loadSprite('goomba2', './imgs/nivel_goomba2.png');
     loadSprite('hongo', './imgs/nivel_hongo.png');
     loadSprite('moneda', './imgs/nivel_moneda.png');
     loadSprite('sorpresa', './imgs/nivel_sorpresa.png');
     loadSprite('tubo', './imgs/nivel_tubo.png');
     loadSprite('tubo1', './imgs/nivel_tubo1.png');
     loadSprite('tubo2', './imgs/nivel_tubo2.png');
     loadSprite('tubo3', './imgs/nivel_tubo3.png');
     loadSprite('marioGrande', './imgs/personaje_mario2.png');
     loadSprite('luigiGrande', './imgs/personaje_luigi2.png');
     loadSprite('toadGrande', './imgs/personaje_toad2.png');
     loadSprite('mario', './imgs/personaje_mario.png');
     loadSprite('meta', './imgs/nivel_meta.png');
     loadSprite('luigi', './imgs/personaje_luigi.png');
     loadSprite('toad', './imgs/personaje_toad.png');

     loadSprite('arriba', './imgs/nivel_arriba.png');
     loadSprite('abajo', './imgs/nivel_abajo.png');
     loadSprite('izquierda', './imgs/nivel_izquierda.png');
     loadSprite('derecha', './imgs/nivel_derecha.png');
     loadSprite('blAzul', './imgs/nivel-bloqueAzul.png');
     loadSprite('estrellita', './imgs/creditos_estrella.png');

     //Cargamos el sonido
     loadSound("nivel1", "./sounds/nivel1.mp3");
     loadSound("nivelPerdido", "./sounds/nivelPerdido.mp3");
     loadSound("nivelGanado", "./sounds/nivelGanado.mp3");
     loadSound("salto", "./sounds/salto.mp3");
     loadSound("goomba", "./sounds/goomba.mp3");
     loadSound("coin", "./sounds/moneda.mp3");
     loadSound("hongoS", "./sounds/hongo.mp3");


    scene("juego", ()=>{
        //Iniciamos Sonido
        const musicLevel = play("nivel1", {
            loop: true,
            volume: 0.5,
        })


        const touchEndActions = [];
        canvas.addEventListener('touchend', (e)=>{
            [...e.changedTouches].forEach((t)=>{
                touchEndActions.forEach((action)=>{
                    action(t.identifier, vec2(t.clientX, t.clientY).scale(1/200));
                })
            })
        });

        function onTouchEnd(action){
            touchEndActions.push(action)
            return()=>{
                const idx = touchEndActions.findIndex(a => a === action)
                if(idx>=0){
                    touchEndActions.splice(idx, 1)
                }
            }
        }

        //Definimos el escenario
        addLevel([
            "                                                                                                         e      ",
            "                                                                                                              ",
            "                                                                e                 e                          ",
            "                                                                                                            ",
            "                                                                                                            ",
            "       # # #            00                                                                                   ",
            "                                                                                                              !",
            "                                                                                                       xx ",
            "                                             %%                                %$$$%                 -+xx     ", 
            "                           %$%*%                             x                                     xx()xx",
            "      %%%%%                            ###                  xx                                   -+xx()xx",
            "                                                           xxx                                 xx()xx()xx ",
            "                                                          xxxx                               -+xx()xx()xx",
            "                               ^      %%%%%%             xxxxx      -+        ========      x()xx()xx()xx  ",
            "              ^   ^   ^  -+-+-+-+-+                ^    xxxxxx      ()                     xx()xx()xx()xx    ",
            "=========================()()()()()            =================    =======              =================    ===",
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
            "!": () => [
                scale(0.137),
                sprite("meta"),
                area(),
                solid(),
                "ganaste",
            ],
            "$": () => [
                scale(1.7),
                sprite("sorpresa"),
                area(),
                solid(),
                "moneda-sorpresa",
            ],
            "#": () => [
                scale(1.7),
                sprite("sorpresa"),
                area(),
                solid(),
                opacity(0),
                "moneda-sorpresa-invisible",
            ],
            "%": () => [
                scale(1.7),
                sprite("bloque"),
                area(),
                solid(),
                'bloquesito',
            ],
            "*": () => [
                scale(1.7),
                sprite("sorpresa"),
                area(),
                solid(),
                'hongo-sorpresa',
            ],
            "^": () => [
                scale(1.7),
                sprite("goomba"),
                area(),
                solid(),
                body(),
                "peligroso",
            ],
            "(": () => [
                scale(0.9),
                sprite("tubo2"),
                area(),
                solid(),
            ],
            ")": () => [
                scale(0.9),
                sprite("tubo3"),
                area(),
                solid(),
            ],
            "-": () => [
                scale(0.9),
                sprite("tubo1"),
                area(),
                solid(),
            ],
            "+": () => [
                scale(0.9),
                sprite("tubo"),
                area(),
                solid(),
            ],
            "x": () => [
                scale(0.9),
                sprite("blAzul"),
                area(),
                solid(),
            ],
            "e": () =>[
                scale(0.1),
                sprite("estrellita"),
                area(),
                solid(),
                'estrellita',
            ]
        })

        //Jugador
        let jugador;
        creacionJugador("pequeño", [30, 0]);

        function creacionJugador(tamaño, posJug){
            if(tamaño==='pequeño')
                jugador = add([
                    scale(escala),
                    sprite(pPequeño),
                    area(),
                    solid(),
                    pos(posJug),
                    body(),
                    grande(),
                    origin('bot'),
                    'taChikito',
                ])
            else if (tamaño==="grande")
                jugador = add([
                    scale(escalaGrande),
                    sprite(pGrande),
                    area(),
                    solid(),
                    pos(posJug),
                    body(),
                    grande(),
                    origin('bot'),
                    'taGrandecito',
                ])

                jugador.onHeadbutt((obj)=>{
                    if(obj.is('moneda-sorpresa')){
                        const musicMoneda = play("coin", {
                            volume: 0.3,
                        });
                        add([
                            sprite("moneda"),
                            pos(obj.pos.sub(0,30)),
                            scale(1.7),
                            area(),
                            solid(),
                            lifespan(0.3),
                        ])
                        destroy(obj);
                        add([
                            sprite("bloqueVacio"),
                            pos(obj.pos),
                            scale(1.7),
                            area(),
                            solid(),
                        ])
                        monedas++;
                        puntaje.text = monedas;
                    }
                    if(obj.is('moneda-sorpresa-invisible')){
                        const musicMoneda = play("coin", {
                            volume: 0.3,
                        });
                        add([
                            sprite("moneda"),
                            pos(obj.pos.sub(0,30)),
                            scale(1.7),
                            area(),
                            solid(),
                            lifespan(0.3),
                        ])
                        destroy(obj);
                        add([
                            sprite("bloqueVacio"),
                            pos(obj.pos),
                            scale(1.7),
                            area(),
                            solid(),
                        ])
                        monedas+= 3;
                        puntaje.text = monedas;
                    }
                    if(obj.is('hongo-sorpresa')){
                        add([
                            sprite("hongo"),
                            pos(obj.pos.sub(0,30)),
                            scale(1.7),
                            area(),
                            solid(),
                            body(),
                            'esHongo',
                        ])
                        destroy(obj);
                        add([
                            sprite("bloqueVacio"),
                            pos(obj.pos),
                            scale(1.7),
                            area(),
                            solid(),
                        ])
                    }

                    if(obj.is('bloquesito'))
                    {
                        destroy(obj);
                    }
                    if(obj.is('estrellita'))
                    {
                        const musicMoneda = play("coin", {
                            volume: 0.4,
                        });
                        add([
                            sprite("estrellita"),
                            pos(obj.pos.sub(0,30)),
                            scale(0.2),
                            area(),
                            solid(),
                            lifespan(0.3),
                            
                            
                        ])
                        destroy(obj);
                        monedas+=5;
                        puntaje.text = monedas;

                    }
                })
            
                jugador.collides('esHongo', (m)=>{
                    const musicHongo = play("hongoS", {
                        volume: 0.8,
                    })
                    destroy(m);
                    jugador.crecer();
                })
                jugador.onFall(()=>{
                    estaSaltando = true;
                })

                jugador.action(()=>{
                    if(jugador.isGrounded())
                        estaSaltando = false;
                })
                jugador.action(()=>{
                    camPos(jugador.pos);
                    if(jugador.pos.y >= caidaMuerte){
                        musicLevel.stop();
                        go('estadoFinal', {score: puntaje.text, estado: 'Game Over'});
                    }
                })

                jugador.collides('peligroso', (p)=>{
                    if(estaSaltando){
                        const musicGoomba = play("goomba", {
                            volume: 0.9,
                        })
                        destroy(p);
                    }
                    else{
                        if(jugador.is('taChikito') && puedoMorir){
                            musicLevel.stop();
                            go('estadoFinal', {score: puntaje.text, estado: 'Game Over'});
                        }
                        else if (jugador.is('taGrandecito') && puedoMorir){
                            puedoMorir = false;
                            destroy(jugador);
                            creacionJugador("pequeño", jugador.pos);
                            tiempoSinMorir = setTimeout(function retraso(){puedoMorir = true;}, 2000);
                        }
                    }
                })
                jugador.collides('ganaste', (g)=>{
                    musicLevel.stop();
                    go('estadoFinal', {score:puntaje.text, estado: 'Ganaste'})
                })
        }

        

        function grande(){
            let esGrande = false;
            return{
                encoger(){
                    destroy(jugador);
                    creacionJugador("pequeño", jugador.pos);
                    esGrande = false;
                },
                crecer(){
                    destroy(jugador);
                    console.log(jugador.pos)
                    creacionJugador("grande", jugador.pos);
                    esGrande = true;
                }
            }
        }

        function saltar() {
            if (jugador.isGrounded()) {
                const musicSalto = play("salto", {
                    volume: 0.1,
                })
                jugador.jump(750);
                estaSaltando = true;
            }
        }

        action('esHongo', (m)=>{
            m.move(50, 0);
        })

        action('peligroso', (p)=>{
            p.move(-60, 0);
        })
        

        //Botones
        const btnArriba = add([
            scale(0.06),
            sprite('arriba'),
            area(),
            fixed(),
            pos(1060, 100),
            opacity(0.5),
        ])
        const btnDerecha = add([
            scale(0.06),
            sprite('derecha'),
            area(),
            fixed(),
            pos(1100, 160),
            opacity(0.5),
        ])
        const btnIzquierda = add([
            scale(0.06),
            sprite('izquierda'),
            area(),
            fixed(),
            pos(1020, 160),
            opacity(0.5),
        ])

        const keyDown = {
            left: false,
            right: false
        }

        onTouchStart((id, pos) =>{
            if(btnIzquierda.hasPoint(pos)){
                keyDown.left = true;
                btnIzquierda.opacity = 1;
            }
            else if(btnDerecha.hasPoint(pos)){
                keyDown.right = true;
                btnDerecha.opacity = 1;
            }
            else if (btnArriba.hasPoint(pos)){
                saltar();
                btnArriba.opacity = 1;
            }
            
        })

        const onTouchChanged = (_, pos)=>{
            if(!btnIzquierda.hasPoint(pos)){
                keyDown.left = false;
                btnIzquierda.opacity = 0.5;
            }
            else{
                keyDown.left = true;
                btnIzquierda.opacity = 1;
            }

            if(!btnDerecha.hasPoint(pos)){
                keyDown.right = false;
                btnDerecha.opacity = 0.5;
            }
            else{
                keyDown.right = true;
                btnDerecha.opacity = 1;
            }

            if(!btnArriba.hasPoint(pos)){
                btnArriba.opacity = 0.5;
            }
            else{
                btnArriba.opacity = 1;
            }
        }

        onTouchMove(onTouchChanged);
        onTouchEnd(onTouchChanged);

        const moveLeft = () =>{
            jugador.move(-200, 0);
        }
        const moveRight = () =>{
            jugador.move(200, 0);
        }

        onKeyDown('left', ()=>{
            keyDown.left = true;
        })
        onKeyRelease('left', ()=>{
            keyDown.left = false;
        })
        onKeyDown('right', ()=>{
            keyDown.right = true;
        })
        onKeyRelease('right', ()=>{
            keyDown.right = false;
        })
        onKeyDown('up', ()=>{
            saltar();
        })

        onUpdate(()=>{
            if(keyDown.left)
                moveLeft();
            else if(keyDown.right)
                moveRight();
        })
        
        //Puntaje
        const monedaPuntaje = add([
            pos(1020, 25),
            scale(1.7),
            sprite("moneda"),
            area(),
            fixed(),
        ])
        const puntaje = add([
            text(monedas),
            {
                value:'score',
            },
            pos(1060, 20),
            scale(0.5),
            area(),
            fixed(),
        ])
    })

    scene('estadoFinal', ({score, estado})=>{
        let duracion;
        if(estado==="Game Over"){
            duracion=7000;
            const musicLevel = play("nivelPerdido", {
                volume: 0.5,
            })
        }
        else if(estado==="Ganaste"){
            duracion=6000;
            const musicLevel = play("nivelGanado", {
                volume: 0.5,
            })
        }

        add([text(estado, 32), origin('center'), pos(width()/2.1, height()/3.5)])
        add([text('Puntaje:'), origin('center'), pos(width()/2.1, height()/3.5 + 80)])
        add([text(score, 32), origin('center'), pos(width()/2.1, height()/3.5 + 160)])

        let red = setTimeout(redireccionarIndex, duracion);

        function redireccionarIndex(){
            let elJugador = localStorage.getItem("elJugador");
            localStorage.removeItem(elJugador);
            localStorage.setItem(elJugador, monedas);
            location.href = "index.html";
        }
    })
    
    go("juego");

}