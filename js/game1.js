import kaboom from "./vendor/kaboom.mjs";
let monedas = 0;
window.onload = game1;

function game1(){

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
        background: [137, 226, 234], 
        canvas
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
     loadSprite('tubo1', 'nivel_tubo1.png');
     loadSprite('tubo2', 'nivel_tubo2.png');
     loadSprite('tubo3', 'nivel_tubo3.png');
     loadSprite('marioGrande', 'personaje_mario2.png');
     loadSprite('luigiGrande', 'personaje_luigi2.png');
     loadSprite('toadGrande', 'personaje_toad2.png');
     loadSprite('mario', 'personaje_mario.png');
     loadSprite('meta', 'nivel_meta.png');
     loadSprite('luigi', 'personaje_luigi.png');
     loadSprite('toad', 'personaje_toad.png');

     loadSprite('arriba', 'nivel_arriba.png');
     loadSprite('abajo', 'nivel_abajo.png');
     loadSprite('izquierda', 'nivel_izquierda.png');
     loadSprite('derecha', 'nivel_derecha.png');


    scene("juego", ()=>{
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
            "         # # #               ",
            "                                  !",
            "                           ",
            "                                  ",
            "                           ",
            "     $   %$%*%                   ",
            "                                   ",
            "                           ",
            "                         -+  ",
            "              ^   ^   ^  ()      ",
            "===========================  =========",
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
                "moneda-sorpresa-invicible",
            ],
            "%": () => [
                scale(1.7),
                sprite("bloque"),
                area(),
                solid(),
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
                    if(obj.is('moneda-sorpresa-invicible')){
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
                })
            
                jugador.collides('esHongo', (m)=>{
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
                        go('estadoFinal', {score: puntaje.text, estado: 'Game Over'});
                    }
                })

                jugador.collides('peligroso', (p)=>{
                    if(estaSaltando){
                        destroy(p);
                    }
                    else{
                        if(jugador.is('taChikito') && puedoMorir){
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
        add([text(estado, 32), origin('center'), pos(width()/2.1, height()/3.5)])
        add([text('Puntaje:'), origin('center'), pos(width()/2.1, height()/3.5 + 80)])
        add([text(score, 32), origin('center'), pos(width()/2.1, height()/3.5 + 160)])

        let red = setTimeout(redireccionarIndex, 5000);

        function redireccionarIndex(){
            let elJugador = localStorage.getItem("elJugador");
            localStorage.removeItem(elJugador);
            localStorage.setItem(elJugador, monedas);
            location.href = "index.html";
        }
    })
    
    go("juego");

}