function niveles(){
    let niveles_nivel1 = document.getElementById("niveles_div_nivel1");
    let niveles_nivel2 = document.getElementById("niveles_div_nivel2");
    let niveles_nivel3 = document.getElementById("niveles_div_nivel3"); 
    
    niveles_nivel1.addEventListener("click",niveles_aNivel1);
    niveles_nivel2.addEventListener("click",niveles_aNivel2);
    niveles_nivel3.addEventListener("click",niveles_aNivel3);
}

function niveles_aNivel1(){
    location.href="nivel1.html";
}
function niveles_aNivel2(){
    location.href="nivel2.html";
}
function niveles_aNivel3(){
    location.href="nivel3.html";
}