function game1(){
    kaboom({
        global: true,
        fullscreen: true,
        scale: 1,
        debug: true,
        background: [137, 226, 234]
    })

    loadRoot('../imgs/');
    
    scene("game", ()=>{
        layers(['bg ', 'obj', 'ui'], 'obj')
    })      

    start("game")

}
