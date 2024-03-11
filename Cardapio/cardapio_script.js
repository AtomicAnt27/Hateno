// function muda_cardapio(n) {
//     var cardapios = document.querySelectorAll('.cardapio');

//     cardapios.forEach(cardapio => {
//         cardapio.classList.add('hidden');
//     });

//     cardapios[n].classList.remove('hidden');
// }

// function refresh() {
//     var cardapios = document.querySelectorAll('.cardapio');
//     cardapios.forEach(cardapio => {
//         cardapio.classList.remove('hidden');
//     });
// }

const cardapioRender = async() => {
    module = await (await fetch("./content.json")).json();
    console.log(module);

    wrapEverything = document.createElement('div');
    wrapEverything.classList.add('wrap-everything');
    document.body.appendChild(wrapEverything);

    contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    wrapEverything.appendChild(contentDiv);

    var i = -1;
    module.forEach(categoria => {
        i += 1;
    
        console.log("Categoria: ", categoria.nome, categoria.itens);

        cardapioDiv = document.createElement('div');
        cardapioDiv.classList.add('cardapio');

        wrapCardsDiv = document.createElement('div')
        wrapCardsDiv.classList.add('wrap-cards')
        categoria.itens.forEach(item => {
            cardDiv = document.createElement('div')
            cardDiv.classList.add('card');

            cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.src = item.img;
            cardDiv.appendChild(cardImg);

            cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            
            cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = item.name;
            cardBody.appendChild(cardTitle);

            cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = item.text;
            cardBody.appendChild(cardText);

            cardButtonGroup = document.createElement('div');
            cardButtonGroup.classList.add('btn-group');
            cardButtonGroup.classList.add('btn-group-card');
            cardButtonGroup.setAttribute('role', 'group');
            cardButton = document.createElement('a');
            cardButton.classList.add('btn');
            cardButton.classList.add('btn-danger');
            cardButton.onclick = () => {adicionarSacola(item)};
            cardButtonIcon = document.createElement('span');
            cardButtonIcon.classList.add('material-symbols-outlined');
            cardButtonIcon.textContent = "add"
            cardButton.appendChild(cardButtonIcon);
            cardButton.innerHTML += "Adicionar na Sacola";
            cardPriceBadge = document.createElement('div');
            cardPriceBadge.classList.add('item-price');
            cardPriceBadge.classList.add('badge');
            cardPriceBadge.classList.add('text-bg-light');
            cardPriceBadge.textContent = `R$ ${item.preco.toFixed(2)}`;
            cardButtonGroup.appendChild(cardButton);
            cardButtonGroup.appendChild(cardPriceBadge);
            cardBody.appendChild(cardButtonGroup);

            cardDiv.appendChild(cardBody);

            wrapCardsDiv.appendChild(cardDiv);
        })
        cardapioDiv.appendChild(wrapCardsDiv);

        contentDiv.appendChild(cardapioDiv);
    })
}
window.addEventListener('load', cardapioRender);