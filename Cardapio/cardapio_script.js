
function muda_cardapio(n) {
    var cardapios = document.querySelectorAll('.cardapio');

    cardapios.forEach(cardapio => {
        cardapio.classList.add('hidden');
    });

    cardapios[n].classList.remove('hidden');
}

function refresh(){
    var cardapios = document.querySelectorAll('.cardapio');
    cardapios.forEach(cardapio => {
        cardapio.classList.remove('hidden');
    });
}

const render = (card) => {
    var card = $("card");
    card.innerHTML = "";

    var img = document.createElement("img");
    img.className = "card-text";
    card.appendChild(img);

    var card_body = document.createElement("div");
    card_body.className = "card-body";
    card_body.innerHTML = "";
    card.appendChild(card_body);

    var title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = prova.name;
    card_body.appendChild(title);

    var text = document.createElement("p");
    text.className = "card-text";
    card_body.appendChild(text);

    var cart_button = document.createElement("a");
    cart_button.className = "btn btn-primary";
    cart_button.setAttribute('href', "#")
    card_body.appendChild(cart_button);
}