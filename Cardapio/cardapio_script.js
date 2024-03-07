
function muda_cardapio(n) {
    var cardapios = document.querySelectorAll('.cardapio');

    cardapios.forEach(cardapio => {
        cardapio.classList.add('hidden');
    });

    cardapios[n].classList.remove('hidden');
}

function refresh() {
    var cardapios = document.querySelectorAll('.cardapio');
    cardapios.forEach(cardapio => {
        cardapio.classList.remove('hidden');
    });
}

const cardapio = async () => {
    cardapio_content = await (await fetch('/content.json')).json()

    contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    document.body.appendChild(contentDiv);

    var i = -1;
    cardapio_content.forEach(categoria => {
        i += 1;

        cardapioDiv = document.createElement('div');
        cardapioDiv.classList.add('cardapio');

        wrapCards = document.createElement('wrap-cards');
        wrapCards.classList.add(wrap - cards);
        categoria.itens.forEach(item => {

            card = document.createElement('div')
            card.classList.add('card');

            img = document.createElement('img');
            img.classList.add('card-img-top');
            card.appendChild(img);

            card_body = document.createElement('div');
            card_body.classList.add('card-body');
            card.appendChild(card_body);

            title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = prova.name;
            card_body.appendChild(title);

            text = document.createElement('p');
            text.classList.add('card-text');
            card_body.appendChild(text);

            cart_button = document.createElement('a');
            card_button.classList.add('btn');
            card_button.classList.add('btn-primary');
            cart_button.onclick = () => { adicionarPedido() };
            card_button.textContent = "+ Adicionar ao Pedido";
            card_body.appendChild(card_button);

            wrapCards.appendChild(card);
        })
        cardapioDiv.appendChild(wrapCards);
        contentDiv.appendChild(cardapioDiv);
    })
}

window.addEventListener('load', cardapio);