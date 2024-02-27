
function comecar(){
    var name = document.getElementById("exampleFormControlInput1").value;

    show(name);
}

function show(name){
    document.getElementById("nomePrint").textContent = name;
    var div = document.getElementById("selects-div");
    if(name && name.trim() !== ""){
        div.style.display = "flex";
        document.getElementById("exampleFormControlInput1").style.background = "none";
    }else{
        document.getElementById("error").style.display = "flex";
        div.style.display = "none";
    }
}

function fechar(){
    document.getElementById("error").style.display = "none";
    document.getElementById("exampleFormControlInput1").style.background = "lightpink";
}