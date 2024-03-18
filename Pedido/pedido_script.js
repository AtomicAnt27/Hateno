var itemDiv;

function fechar(){
    document.getElementById("error").style.display = "none";
    document.getElementById("exampleFormControlInput1").style.background = "lightpink";
}

function limparSelecao() {
    if(confirm("Você tem certeza que quer limpar sua sacola?")) {
        localStorage.setItem('sacola', '[]');
        orderRender();
    }
}

function fazerPedido() {
    var sacolaRaw = localStorage.getItem('sacola');
    if (sacolaRaw === null) {
        sacolaRaw = "[]";
    }
    var sacola = JSON.parse(sacolaRaw);
    
    var listaPedidos = "";

    sacola.forEach(item => {
        listaPedidos += `${item.nome} - R$ ${item.preco.toFixed(2)};`;
        listaPedidos += ' ';
    });
}

const calcularTotal = () => {
    var sacolaRaw = localStorage.getItem('sacola');
    if (sacolaRaw === null) {
        sacolaRaw = "[]";
    }
    var sacola = JSON.parse(sacolaRaw);

    var total = 0;
    sacola.forEach(item => {
        total += item.price
    })

    document.querySelectorAll('.total-content').forEach(elm => {
        elm.textContent = "R$ "+total.toFixed(2);
    })

    return total;
}

const orderRender = () => {

    var sacolaRaw = localStorage.getItem('sacola');
    if (sacolaRaw === null) {
        sacolaRaw = "[]";
    }
    var sacola = JSON.parse(sacolaRaw);

    var itemListDiv = document.querySelector('.item-list');
    itemListDiv.innerHTML = "";

    var itemi = -1;
    sacola.forEach(item => {
        itemi += 1;

        var itemDiv = document.createElement('div'); // itemDiv
        itemDiv.classList.add('item-div');

        var itemDeleteWrap = document.createElement('button');
        itemDeleteWrap.classList.add('btn');
        itemDeleteWrap.classList.add('btn-outline-danger');
        itemDeleteWrap.classList.add('item-delete-btn');
        itemDeleteWrap.setAttribute('data-item-id', itemi);
        itemDeleteWrap.setAttribute('onclick', 'itemDeleteBtn(this)');

        var itemDeleteBtn = document.createElement('span')
        itemDeleteBtn.classList.add('material-symbols-outlined')
        itemDeleteBtn.textContent = "delete";
        itemDeleteBtn.onclick = function () {
            itemDiv.remove();
        };
        
        itemDeleteWrap.appendChild(itemDeleteBtn)
        itemDiv.appendChild(itemDeleteWrap);

        var itemImg = document.createElement('img'); /// itemImg
        itemImg.classList.add('item-img');
        itemImg.src = item.img;
        itemDiv.appendChild(itemImg);           /// \itemImg

        var itemInfo = document.createElement('div'); /// itemInfo
        itemInfo.classList.add('item-info');

        var itemNome = document.createElement('h5');    //// itemNome
        itemNome.classList.add('item-nome');
        itemNome.textContent = item.name;
        itemInfo.appendChild(itemNome);              //// \itemNome

        var itemPreco = document.createElement('p');    //// itemPreco
        itemPreco.classList.add('item-preco');
        itemPreco.textContent = "R$ "+item.price.toFixed(2);
        itemInfo.appendChild(itemPreco);            //// \itemPreco
        
        itemDiv.appendChild(itemInfo);          /// \itemInfo
        itemListDiv.appendChild(itemDiv);
    })

    calcularTotal();

}

window.addEventListener('load', ()=>{

    orderRender();
    
    // if (localStorage.getItem('nome') === null) {
    //     var nameInputDiv = document.querySelector('.nomeinput-div');
    //     nameInputDiv.classList.remove('hidden');
    // } else {

    //     var nameInputDiv = document.querySelector('.nomeinput-div');
    //     nameInputDiv.classList.add('hidden');
        
    //     document.querySelector('#nome-print').textContent = localStorage.getItem('nome');
    // }
})