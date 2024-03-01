
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

function calcularTotal(){
    var selectPratos = document.getElementById("select_pratos");
    var selectBebidas = document.getElementById("select_bebidas");
    var selectSobremesas = document.getElementById("select_sobremesas");
    var resultadoSpan = document.getElementById("resultado");

    var total = 0;
    var pratos = 0;
    var bebidas = 0;
    var sobremesas = 0;

    switch(selectPratos.value){
        case "Omelet":
            total += 12;
            pratos = 12;
            break;
        case "Hylian Tomato Pizza":
            total += 12;
            pratos = 12;
            break;
        case "Mushroom Risotto":
            total += 12;
            pratos = 12;
            break;
        case "Curry Rice":
            total += 12;
            pratos = 12;
            break;
    }

    switch(selectBebidas.value){
        case "Noble Pursuit":
            total += 12;
            bebidas = 12;
            break;
        case "Fairy Tonic":
            total += 12;
            bebidas = 12;
            break;
        case "Energizing Elixir":
            total += 12;
            bebidas = 12;
            break;
        case "Milk":
            total += 12;
            bebidas = 12;
            break;
    }

    switch(selectSobremesas.value){
        case "Apple Pie":
            total += 12;
            sobremesas = 12;
            break;
        case "Monster Cake":
            total += 12;
            sobremesas = 12;
            break;
        case "Fruitcake":
            total += 12;
            sobremesas = 12;
            break;
        case "Rock Hard Food":
            total += 12;
            sobremesas = 12;
            break;
    }

    resultadoSpan.textContent = `R$ ${total.toFixed(2)}`
    document.getElementById("prato-pronto").innerHTML = pratos.toFixed(2);
    document.getElementById("bebidas-pronto").innerHTML = bebidas.toFixed(2);
    document.getElementById("sobremesas-pronto").innerHTML = sobremesas.toFixed(2);
}

const limpar = () => {
    document.getElementById("exampleFormControlInput1").value = "";
    document.getElementById("resultado").textContent = "";
    document.getElementById("select_pratos").value = "Selecione um prato";
    document.getElementById("select_bebidas").value = "Selecione uma bebida";
    document.getElementById("select_sobremesas").value = "Selecione uma sobremesa";
    document.getElementById("prato-pronto").textContent = "";
    document.getElementById("bebidas-pronto").textContent = "";
    document.getElementById("sobremesas-pronto").textContent = "";
}
