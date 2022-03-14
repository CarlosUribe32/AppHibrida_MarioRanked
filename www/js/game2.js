import kaboom from"./vendor/kaboom.mjs";let monedas=0;function game2(){const e=document.getElementById("nivel_app");let o,a,i,s,t=localStorage.getItem("personajeSeleccionado");let l,n=!0;"mario"===t?(o="marioGrande",a=.012,i=.07):"luigi"===t?(o="luigiGrande",a=.03,i=.13):"toad"===t&&(o="toadGrande",a=.079,i=.25),kaboom({global:!0,fullscreen:!0,scale:1,debug:!0,background:[50,125,139],canvas:e}),loadSprite("piso","./imgs/nivel_piso.png"),loadSprite("bloque","./imgs/nivel_bloque.png"),loadSprite("bloqueVacio","./imgs/nivel_bloque2.png"),loadSprite("flor","./imgs/nivel_flor.png"),loadSprite("goomba","./imgs/nivel_goomba.png"),loadSprite("goomba2","./imgs/nivel_goomba2.png"),loadSprite("hongo","./imgs/nivel_hongo.png"),loadSprite("moneda","./imgs/nivel_moneda.png"),loadSprite("sorpresa","./imgs/nivel_sorpresa.png"),loadSprite("tubo","./imgs/nivel_tubo.png"),loadSprite("tubo1","./imgs/nivel_tubo1.png"),loadSprite("tubo2","./imgs/nivel_tubo2.png"),loadSprite("tubo3","./imgs/nivel_tubo3.png"),loadSprite("marioGrande","./imgs/personaje_mario2.png"),loadSprite("luigiGrande","./imgs/personaje_luigi2.png"),loadSprite("toadGrande","./imgs/personaje_toad2.png"),loadSprite("mario","./imgs/personaje_mario.png"),loadSprite("meta","./imgs/nivel_meta.png"),loadSprite("luigi","./imgs/personaje_luigi.png"),loadSprite("toad","./imgs/personaje_toad.png"),loadSprite("arriba","./imgs/nivel_arriba.png"),loadSprite("abajo","./imgs/nivel_abajo.png"),loadSprite("izquierda","./imgs/nivel_izquierda.png"),loadSprite("derecha","./imgs/nivel_derecha.png"),loadSprite("blAzul","./imgs/nivel-bloqueAzul.png"),loadSprite("estrellita","./imgs/creditos_estrella.png"),loadSprite("nube","./imgs/nivel-nube.png"),loadSound("nivel2","./sounds/nivel2.mp3"),loadSound("nivelPerdido","./sounds/nivelPerdido.mp3"),loadSound("nivelGanado","./sounds/nivelGanado.mp3"),loadSound("salto","./sounds/salto.mp3"),loadSound("goomba","./sounds/goomba.mp3"),loadSound("coin","./sounds/moneda.mp3"),loadSound("hongoS","./sounds/hongo.mp3"),scene("juego",(()=>{const r=play("nivel2",{loop:!0,volume:.5}),d=[];let p;function g(e,d){"pequeño"===e?p=add([scale(a),sprite(t),area(),solid(),pos(d),body(),m(),origin("bot"),"taChikito"]):"grande"===e&&(p=add([scale(i),sprite(o),area(),solid(),pos(d),body(),m(),origin("bot"),"taGrandecito"])),p.onHeadbutt((e=>{if(e.is("moneda-sorpresa")){play("coin",{volume:.3});add([sprite("moneda"),pos(e.pos.sub(0,30)),scale(1.7),area(),solid(),lifespan(.3)]),destroy(e),add([sprite("bloqueVacio"),pos(e.pos),scale(1.7),area(),solid()]),monedas++,y.text=monedas}if(e.is("moneda-sorpresa-invisible")){play("coin",{volume:.3});add([sprite("moneda"),pos(e.pos.sub(0,30)),scale(1.7),area(),solid(),lifespan(.3)]),destroy(e),add([sprite("bloqueVacio"),pos(e.pos),scale(1.7),area(),solid()]),monedas+=3,y.text=monedas}if(e.is("hongo-sorpresa")&&(add([sprite("hongo"),pos(e.pos.sub(0,30)),scale(1.7),area(),solid(),body(),"esHongo"]),destroy(e),add([sprite("bloqueVacio"),pos(e.pos),scale(1.7),area(),solid()])),e.is("bloquesito")&&destroy(e),e.is("estrellita")){play("coin",{volume:.4});add([sprite("estrellita"),pos(e.pos.sub(0,30)),scale(.2),area(),solid(),lifespan(.3)]),destroy(e),monedas+=5,y.text=monedas}})),p.collides("esHongo",(e=>{play("hongoS",{volume:.8});destroy(e),p.crecer()})),p.onFall((()=>{s=!0})),p.action((()=>{p.isGrounded()&&(s=!1)})),p.action((()=>{camPos(p.pos),p.pos.y>=700&&(r.stop(),go("estadoFinal",{score:y.text,estado:"Game Over"}))})),p.collides("peligroso",(e=>{if(s){play("goomba",{volume:.9});destroy(e)}else p.is("taChikito")&&n?(r.stop(),go("estadoFinal",{score:y.text,estado:"Game Over"})):p.is("taGrandecito")&&n&&(n=!1,destroy(p),g("pequeño",p.pos),l=setTimeout((function(){n=!0}),2e3))})),p.collides("ganaste",(e=>{r.stop(),go("estadoFinal",{score:y.text,estado:"Ganaste"})}))}function m(){let e=!1;return{encoger(){destroy(p),g("pequeño",p.pos),e=!1},crecer(){destroy(p),console.log(p.pos),g("grande",p.pos),e=!0}}}function c(){if(p.isGrounded()){play("salto",{volume:.1});p.jump(750),s=!0}}e.addEventListener("touchend",(e=>{[...e.changedTouches].forEach((e=>{d.forEach((o=>{o(e.identifier,vec2(e.clientX,e.clientY).scale(.005))}))}))})),addLevel(["                                 m                                         m                m                    ","                                                                                                                  e      ","                                                                                 e                             ","        m                                                       e                                            ","                                                  mm                                             m                        m","                                      m                                                                     ","       # # #            00                                              m                                     ","                                                                                           $$                            !","                 m                             %%                                                                xx ","                                                                               %$$$%                           -+xx     ","                           %$%*%       ###                   x                                               xx()xx","      %%%%%                                                 xx                                             -+xx()xx","                                                           xxx                              xx           xx()xx()xx ","                                                          xxxx                                         -+xx()xx()xx","                               ^      %%%%%%             xxxxx      -+        ========                x()xx()xx()xx  ","              ^   ^   ^  -+-+-+-+-+                ^    xxxxxx      ()                               xx()xx()xx()xx    ","=========================()()()()()            =================    =======                ===========================   ==="],{width:35,height:35,"=":()=>[scale(1.7),sprite("piso"),area(),solid()],"!":()=>[scale(.137),sprite("meta"),area(),solid(),"ganaste"],$:()=>[scale(1.7),sprite("sorpresa"),area(),solid(),"moneda-sorpresa"],"#":()=>[scale(1.7),sprite("sorpresa"),area(),solid(),opacity(0),"moneda-sorpresa-invisible"],"%":()=>[scale(1.7),sprite("bloque"),area(),solid(),"bloquesito"],"*":()=>[scale(1.7),sprite("sorpresa"),area(),solid(),"hongo-sorpresa"],"^":()=>[scale(1.7),sprite("goomba"),area(),solid(),body(),"peligroso"],"(":()=>[scale(.9),sprite("tubo2"),area(),solid()],")":()=>[scale(.9),sprite("tubo3"),area(),solid()],"-":()=>[scale(.9),sprite("tubo1"),area(),solid()],"+":()=>[scale(.9),sprite("tubo"),area(),solid()],x:()=>[scale(.9),sprite("blAzul"),area(),solid()],e:()=>[scale(.1),sprite("estrellita"),area(),solid(),"estrellita"],m:()=>[scale(.3),sprite("nube"),area()]}),g("pequeño",[30,0]),action("esHongo",(e=>{e.move(50,0)})),action("peligroso",(e=>{e.move(-60,0)}));const u=add([scale(.06),sprite("arriba"),area(),fixed(),pos(150,250),opacity(.5)]),x=add([scale(.06),sprite("derecha"),area(),fixed(),pos(550,250),opacity(.5)]),b=add([scale(.06),sprite("izquierda"),area(),fixed(),pos(450,250),opacity(.5)]),v={left:!1,right:!1};onTouchStart(((e,o)=>{b.hasPoint(o)?(v.left=!0,b.opacity=1):x.hasPoint(o)?(v.right=!0,x.opacity=1):u.hasPoint(o)&&(c(),u.opacity=1)}));const h=(e,o)=>{b.hasPoint(o)?(v.left=!0,b.opacity=1):(v.left=!1,b.opacity=.5),x.hasPoint(o)?(v.right=!0,x.opacity=1):(v.right=!1,x.opacity=.5),u.hasPoint(o)?u.opacity=1:u.opacity=.5};onTouchMove(h),function(e){d.push(e)}(h);onKeyDown("left",(()=>{v.left=!0})),onKeyRelease("left",(()=>{v.left=!1})),onKeyDown("right",(()=>{v.right=!0})),onKeyRelease("right",(()=>{v.right=!1})),onKeyDown("up",(()=>{c()})),onUpdate((()=>{v.left?p.move(-200,0):v.right&&p.move(200,0)}));add([pos(480,50),scale(1.7),sprite("moneda"),area(),fixed()]);const y=add([text(monedas),{value:"score"},pos(520,45),scale(.5),area(),fixed()])})),scene("estadoFinal",(({score:e,estado:o})=>{let a;if("Game Over"===o){a=7e3;play("nivelPerdido",{volume:.5})}else if("Ganaste"===o){a=6e3;play("nivelGanado",{volume:.5})}add([text(o,32),origin("center"),pos(width()/2.1,height()/3.5)]),add([text("Puntaje:"),origin("center"),pos(width()/2.1,height()/3.5+80)]),add([text(e,32),origin("center"),pos(width()/2.1,height()/3.5+160)]);setTimeout((function(){let e=localStorage.getItem("elJugador");localStorage.removeItem(e),localStorage.setItem(e,monedas),location.href="index.html"}),a)})),go("juego")}window.onload=game2;