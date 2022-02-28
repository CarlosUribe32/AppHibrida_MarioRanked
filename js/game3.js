import kaboom from "./vendor/kaboom.mjs";
window.onload = game3;
let monedas = 0;


function game3() {
  const canvas = document.getElementById("nivel_app");
 
  
  let pPequeño = localStorage.getItem("personajeSeleccionado");
  let pGrande, escala, escalaGrande;
  let estaSaltando;
  const caidaMuerte = 700;
  let tiempoSinMorir;
  let puedoMorir = true;

  if (pPequeño === "mario") {
    pGrande = "marioGrande";
    escala = 0.012;
    escalaGrande = 0.07;
  } else if (pPequeño === "luigi") {
    pGrande = "luigiGrande";
    escala = 0.03;
    escalaGrande = 0.13;
  } else if (pPequeño === "toad") {
    pGrande = "toadGrande";
    escala = 0.079;
    escalaGrande = 0.25;
  }

  kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    background: [0,0,0],
    canvas,
  });

  
  loadSprite("lvl3_bloque", "./imgs/nivel2_bloque.png");
  loadSprite("lvl3_piso", "./imgs/nivel2_piso.png");
  loadSprite("lvl2_tubo", "./imgs/nivel_tubo1.png");
  loadSprite("mario", "./imgs/personaje_mario.png");
  loadSprite("marioGrande", "./imgs/personaje_mario2.png");
  loadSprite("luigiGrande", "./imgs/personaje_luigi2.png");
  loadSprite("toadGrande", "./imgs/personaje_toad2.png");
  loadSprite("mario", "./imgs/personaje_mario.png");
  loadSprite("meta", "./imgs/nivel_meta.png");
  loadSprite("luigi", "./imgs/personaje_luigi.png");
  loadSprite("toad", "./imgs/personaje_toad.png");
  loadSprite("arriba", "./imgs/nivel_arriba.png");
  loadSprite("abajo", "./imgs/nivel_abajo.png");
  loadSprite("izquierda", "./imgs/nivel_izquierda.png");
  loadSprite("derecha", "./imgs/nivel_derecha.png");
  loadSprite("bloqueVacio", "./imgs/nivel_bloque2.png");
  loadSprite("bloqueObstaculo","./imgs/bloque2_nivel3.png");
  loadSprite("flor", "./imgs/nivel_flor.png");
  loadSprite("tortuga", './imgs/tortuga_nivel3.png');
  loadSprite("caparazon", "./imgs/caparazon_nivel3.png");
  loadSprite("hongo", "./imgs/nivel_hongo.png");
  loadSprite("moneda", "./imgs/nivel_moneda.png");
  loadSprite("sorpresa", "./imgs/nivel_sorpresa.png");
  loadSprite("tubo", "./imgs/nivel_tubo.png");
  loadSprite("tubo1", "./imgs/nivel_tubo1.png");
  loadSprite("tubo2", "./imgs/nivel_tubo2.png");
  loadSprite("tubo3", "./imgs/nivel_tubo3.png");
  loadSprite('arriba', './imgs/nivel3_arriba.png');
  loadSprite('abajo', './imgs/nivel3_abajo.png');
  loadSprite('izquierda', './imgs/nivel3_izquierda.png');
  loadSprite('derecha', './imgs/nivel3_derecha.png');
  loadSprite('goomba', './imgs/nivel_goomba.png');
  loadSprite('caparazon','./imgs/caparazon_nivel3.png');
  loadSound("nivel1", "./sounds/nivel1.mp3");
  loadSound("nivelPerdido", "./sounds/nivelPerdido.mp3");
  loadSound("nivelGanado", "./sounds/nivelGanado.mp3");
  loadSound("salto", "./sounds/salto.mp3");
  loadSound("goomba", "./sounds/goomba.mp3");
  loadSound("coin", "./sounds/moneda.mp3");
  loadSound("hongoS", "./sounds/hongo.mp3");

  scene("game", () => {
    const musicLevel = play("nivel1", {
      loop: true,
      volume: 0.5,
    });

    const touchEndActions = [];
    canvas.addEventListener("touchend", (e) => {
      [...e.changedTouches].forEach((t) => {
        touchEndActions.forEach((action) => {
          action(t.identifier, vec2(t.clientX, t.clientY).scale(1 / 200));
        });
      });
    });

    function onTouchEnd(action) {
      touchEndActions.push(action);
      return () => {
        const idx = touchEndActions.findIndex((a) => a === action);
        if (idx >= 0) {
          touchEndActions.splice(idx, 1);
        }
      };
    }
    addLevel(
      [
        "                          ",
        "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
        "%                                                                                              %%   %%%%%%          %%%%      %%%%",
        "%                                                                                              %%   %%%%%%          %%%%  g   %%%%",
        "%                                                                                            %%          %           %    %%                 ",
        "%                                                                                            %%          %           %    %%                                                              ",
        "%                                                                                            %%          %           %0*  %%     gg        ttt  0000                                                                                                                %%%%%%",
        "%                                                                   % %%%% %                 %%          %           %%%  %%  %%%%%%    tt                                !",
        "%                                                 #                 %0%  %0%                 %%      0000%",
        "%      *$$$                              b  b                       %%%  %%%                 %%%%    %%%%%", 
        "%                                     b  b  b  b     b                                         %%",
        "%                                  b  b  b  b  b     b                                         %%",
        "%                               b  b  b  b  b  b    gb  b",
        "===========================================================================================================================================================================",
        "==========================================================================================================================================================================="
      ],
      {
        width: 40,
        height: 40,

        "=": () => [sprite("lvl3_piso"), area(), solid()],

        "%": () => [sprite("lvl3_bloque"), area(), solid(),"bloquesito"],

        "!": () => [scale(0.132), sprite("meta"), area(), solid(), "ganaste"],
        "$": () => [
          scale(2),
          sprite("sorpresa"),
          area(),
          solid(),
          "moneda-sorpresa",
        ],
        
        "#": () => [
          scale(2.0),
          sprite("sorpresa"),
          area(),
          solid(),
          opacity(0),
          "moneda-sorpresa-invisible",
        ],
        "*": () => [
          scale(2.0),
          sprite("sorpresa"),
          area(),
          solid(),
          "hongo-sorpresa",
        ],
        "t": () => [
          scale(0.090),
          sprite("tortuga"),
          area(),
          solid(),
          body(),
          "peligroso",
          "tortu"
      ],
      "g": () => [
        scale(1.7),
        sprite("goomba"),
        area(),
        solid(),
        body(),
        "peligroso",
        
    ],
    "0": () => [
      scale(1.7),
      sprite("moneda"),
      area(),
      solid(),
      "esMoneda"
    ],
        "b": () => [
          scale(1.0),
          sprite("bloqueObstaculo"),
          area(),
          solid(),
        ],
        "(": () => [scale(0.9), sprite("tubo2"), area(), solid()],
        ")": () => [scale(0.9), sprite("tubo3"), area(), solid()],
        "-": () => [scale(0.9), sprite("tubo1"), area(), solid()],
        "+": () => [scale(0.9), sprite("tubo"), area(), solid()],
        
        
      }
    );
    
    let jugador;
    creacionJugador("pequeño", [90,350]);

    function creacionJugador(tamaño, posJug) {
      if (tamaño === "pequeño")
        jugador = add([
          scale(escala),
          sprite(pPequeño),
          area(),
          solid(),
          pos(posJug),
          body(),
          grande(),
          origin("top"),
          "taChikito",
        ]);
      else if (tamaño === "grande")
        jugador = add([
          scale(escalaGrande),
          sprite(pGrande),
          area(),
          solid(),
          pos(posJug),
          body(),
          grande(),
          origin("bot"),
          "taGrandecito",
        ]);

      jugador.onHeadbutt((obj) => {
        if (obj.is("moneda-sorpresa")) {
          const musicMoneda = play("coin", {
            volume: 0.3,
          });
          add([
            sprite("moneda"),
            pos(obj.pos.sub(0, 30)),
            scale(1.7),
            area(),
            solid(),
            lifespan(0.3),
          ]);
          destroy(obj);
          add([
            sprite("bloqueVacio"),
            pos(obj.pos),
            scale(2.0),
            area(),
            solid(),
          ]);
          monedas++;
          puntaje.text = monedas;
        }
        if (obj.is("moneda-sorpresa-invisible")) {
          const musicMoneda = play("coin", {
            volume: 0.3,
          });
          add([
            sprite("moneda"),
            pos(obj.pos.sub(0, 30)),
            scale(1.7),
            area(),
            solid(),
            lifespan(0.3),
          ]);
          destroy(obj);
          add([
            sprite("bloqueVacio"),
            pos(obj.pos),
            scale(1.7),
            area(),
            solid(),
          ]);
          monedas += 3;
          puntaje.text = monedas;
        }
        if (obj.is("hongo-sorpresa")) {
          add([
            sprite("hongo"),
            pos(obj.pos.sub(0, 30)),
            scale(1.7),
            area(),
            solid(),
            body(),
            "esHongo",
          ]);
          destroy(obj);
          add([
            sprite("bloqueVacio"),
            pos(obj.pos),
            scale(2.0),
            area(),
            solid(),
          ]);
        }
        if (obj.is("bloquesito")) {
          destroy(obj);
        }
      });

      jugador.collides("esMoneda", (m) => {
        const musicHongo = play("coin", {
          volume: 0.8,
        });
        destroy(m);
        monedas += 1;
        puntaje.text = monedas;
      });

      jugador.collides("esHongo", (m) => {
        const musicHongo = play("hongoS", {
          volume: 0.8,
        });
        destroy(m);
        jugador.crecer();
      });
      jugador.onFall(() => {
        estaSaltando = true;
      });

      jugador.action(() => {
        if (jugador.isGrounded()) estaSaltando = false;
      });
      jugador.action(() => {
        camPos(jugador.pos);
        if (jugador.pos.y >= caidaMuerte) {
          musicLevel.stop();
          go("estadoFinal", { score: puntaje.text, estado: "Game Over" });
        }
      });
      jugador.collides('capa',(a)=>{
        
        if (estaSaltando) {
          const musicGoomba = play("goomba", {
            volume: 0.9,
          });

        } 
      })
      jugador.collides("peligroso", (p) => {
        if (estaSaltando) {
          const musicGoomba = play("goomba", {
            volume: 0.9,
          });
          destroy(p);
          if(p.is("tortu")){
          add([
            sprite("caparazon"),
            scale(0.090),
            pos(p.pos),
            area(),
            solid(),
            body(),
            "capa"
          ])
        }

        } else {
          if (jugador.is("taChikito") && puedoMorir) {
            musicLevel.stop();
            go("estadoFinal", { score: puntaje.text, estado: "Game Over" });
          } else if (jugador.is("taGrandecito") && puedoMorir) {
            puedoMorir = false;
            destroy(jugador);
            creacionJugador("pequeño", jugador.pos);
            tiempoSinMorir = setTimeout(function retraso() {
              puedoMorir = true;
            }, 2000);
          }
        }
      });
      
      jugador.collides("ganaste", (g) => {
        musicLevel.stop();
        go("estadoFinal", { score: puntaje.text, estado: "Ganaste" });
      });
    }

    function grande() {
      let esGrande = false;
      return {
        encoger() {
          destroy(jugador);
          creacionJugador("pequeño", jugador.pos);
          esGrande = false;
        },
        crecer() {
          destroy(jugador);
          console.log(jugador.pos);
          creacionJugador("grande", jugador.pos);
          esGrande = true;
        },
      };
    }

    function saltar() {
      if (jugador.isGrounded()) {
        const musicSalto = play("salto", {
          volume: 0.1,
        });
        jugador.jump(850);
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
      scale(1),
      sprite('arriba'),
      area(),
      fixed(),
      pos(106, 100),
      opacity(0.5),
  ])
  const btnDerecha = add([
      scale(1),
      sprite('derecha'),
      area(),
      fixed(),
      pos(1200, 100),
      opacity(0.5),
  ])
  const btnIzquierda = add([
      scale(1),
      sprite('izquierda'),
      area(),
      fixed(),
      pos(1120, 100),
      opacity(0.5),
  ])

    const keyDown = {
      left: false,
      right: false,
    };

    onTouchStart((id, pos) => {
      if (btnIzquierda.hasPoint(pos)) {
        keyDown.left = true;
        btnIzquierda.opacity = 1;
      } else if (btnDerecha.hasPoint(pos)) {
        keyDown.right = true;
        btnDerecha.opacity = 1;
      } else if (btnArriba.hasPoint(pos)) {
        saltar();
        btnArriba.opacity = 1;
      }
    });

    const onTouchChanged = (_, pos) => {
      if (!btnIzquierda.hasPoint(pos)) {
        keyDown.left = false;
        btnIzquierda.opacity = 0.5;
      } else {
        keyDown.left = true;
        btnIzquierda.opacity = 1;
      }

      if (!btnDerecha.hasPoint(pos)) {
        keyDown.right = false;
        btnDerecha.opacity = 0.5;
      } else {
        keyDown.right = true;
        btnDerecha.opacity = 1;
      }

      if (!btnArriba.hasPoint(pos)) {
        btnArriba.opacity = 0.5;
      } else {
        btnArriba.opacity = 1;
      }
    };

    onTouchMove(onTouchChanged);
    onTouchEnd(onTouchChanged);

    const moveLeft = () => {
      jugador.move(-200, 0);
    };
    const moveRight = () => {
      jugador.move(200, 0);
    };

    onKeyDown("left", () => {
      keyDown.left = true;
    });
    onKeyRelease("left", () => {
      keyDown.left = false;
    });
    onKeyDown("right", () => {
      keyDown.right = true;
    });
    onKeyRelease("right", () => {
      keyDown.right = false;
    });
    onKeyDown("up", () => {
      saltar();
    });

    onUpdate(() => {
      if (keyDown.left) moveLeft();
      else if (keyDown.right) moveRight();
    });

    const monedaPuntaje = add([
      pos(1020, 25),
      scale(1.7),
      sprite("moneda"),
      area(),
      fixed(),
    ]);
    const puntaje = add([
      text(monedas),
      {
        value: "score",
      },
      pos(1060, 20),
      scale(0.5),
      area(),
      fixed(),
    ]);
  });

  go("game");
}
