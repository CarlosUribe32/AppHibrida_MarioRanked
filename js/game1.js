import kaboom from "./vendor/kaboom.mjs";
let monedas = 0;
window.onload = game1;

function game1(){

    const canvas = document.getElementById('nivel_app');


    //Inicializamos Kaboom
    kaboom({
        global: true,
        fullscreen: true,
        scale: 1,
        debug: true,
        background: [137, 226, 234], 
        canvas
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
    loadSprite('luigi', 'personaje_luigi.png');
    loadSprite('toad', 'personaje_toad.png');

    loadSprite('arriba', 'nivel_arriba.png');
    loadSprite('abajo', 'nivel_abajo.png');
    loadSprite('izquierda', 'nivel_izquierda.png');
    loadSprite('derecha', 'nivel_derecha.png');

    //Definimos el escenario
    addLevel([
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "     $   %$%*%                   ",
        "                           ",
        "                         -+  ",
        "              ^   ^   ^  ()  ",
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
        "$": () => [
            scale(1.7),
            sprite("sorpresa"),
            area(),
            solid(),
            "moneda-sorpresa",
            
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
            "peligro",
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
    function grande(){
        let timer = 0;
        let esGrande = false;
        return{
            update(){
                if(esGrande){
                    timer -= dt();
                    if(timer<=0)
                        this.encoger()
                }
            },
            encoger(){
                this.sprite("mario");
                timer = 0;
                esGrande = false;
            },
            crecer(time){
                this.sprite("marioGrande");
                timer = time;
                esGrande = true;
            }
        }
    }
    const jugador = add([
        scale(0.012),
        sprite('mario'),
        area(),
        solid(),
        pos(30, 0),
        body(),
        grande(),
        origin('bot'),
    ])

    function saltar() {
        if (jugador.isGrounded()) {
            jugador.jump(680);
        }
    }

    jugador.onHeadbutt((obj)=>{
        if(obj.is('moneda-sorpresa')){
            add([
                sprite("moneda"),
                pos(obj.pos.sub(0,30)),
                scale(1.7),
                area(),
                solid(),
                'esMoneda',
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
        }
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
        jugador.move(-200, 0)
    }
    const moveRight = () =>{
        jugador.move(200, 0)
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
    ])
    const puntaje = add([
        text(monedas),
        {
            value:'score',
        },
        pos(1060, 20),
        scale(0.5),
    ])

    function grande(){
        let timer = 0;
        let esGrande = false;
        return{
            update(){
                if(esGrande){
                    timer -= dt();
                    if(timer<=0)
                        this.encoger()
                }
            },
            encoger(){
                this.sprite("mario");
                timer = 0;
                esGrande = false;
            },
            crecer(time){
                this.sprite("marioGrande");
                timer = time;
                esGrande = true;
            }
        }
    }

}