function muda_cardapio(btn) {
    var n = btn.getAttribute('data-cardapio-id');
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

const cardapioRender = async () => {
    let data = await (await fetch("./content.json")).json();
    console.log(data);

    var wrapEverything = document.createElement('div');
    wrapEverything.classList.add('wrap-everything');
    document.body.appendChild(wrapEverything);

    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    wrapEverything.appendChild(contentDiv);

    var cardapioTitle = document.createElement('h1');
    cardapioTitle.classList.add('cardapio-title');
    cardapioTitle.textContent = "CARDAPIO"
    contentDiv.appendChild(cardapioTitle)

    var cardapioSwitcher = document.createElement('div');
    cardapioSwitcher.classList.add('btn-group');
    cardapioSwitcher.setAttribute('role', 'group');
    cardapioSwitcher.setAttribute('aria-label', 'Basic radio toggle button group');
    contentDiv.appendChild(cardapioSwitcher);

    var btnRefreshCardapio = document.createElement('input');
    btnRefreshCardapio.classList.add('btn-check');
    btnRefreshCardapio.setAttribute('type', 'radio');
    btnRefreshCardapio.setAttribute('name', 'cardapio');
    btnRefreshCardapio.setAttribute('autocomplete', 'off');
    btnRefreshCardapio.setAttribute('checked', 'checked');
    btnRefreshCardapio.id = "btncardapio_refresh";
    btnRefreshCardapio.addEventListener('click', refresh);
    cardapioSwitcher.appendChild(btnRefreshCardapio);

    var btnRefreshCardapioLabel = document.createElement('label');
    btnRefreshCardapioLabel.classList.add('btn');
    btnRefreshCardapioLabel.classList.add('btn-outline-dark');
    btnRefreshCardapioLabel.classList.add('material-symbols-outlined');
    btnRefreshCardapioLabel.textContent = "add";
    btnRefreshCardapioLabel.setAttribute('for', 'btncardapio_refresh');
    cardapioSwitcher.appendChild(btnRefreshCardapioLabel);

    var i = -1;
    data.forEach(categoria => {
        i += 1;

        var cardapioDiv = document.createElement('div');
        cardapioDiv.classList.add('cardapio');

        var wrapCardsDiv = document.createElement('div')
        wrapCardsDiv.classList.add('wrap-cards')
        categoria.itens.forEach(item => {
            var cardDiv = document.createElement('div')
            cardDiv.classList.add('card');

            var cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.src = item.img;
            cardDiv.appendChild(cardImg);

            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            var cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = item.name;
            cardBody.appendChild(cardTitle);

            var cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = item.text;
            cardBody.appendChild(cardText);

            var cardButton = document.createElement('a');
            cardButton.classList.add('cardBtn');
            cardButton.classList.add('btn');
            cardButton.classList.add('btn-primary');
            cardButton.textContent = "+ Add to order"
            cardButton.onclick = () => { adicionarSacola(item) };
            cardBody.appendChild(cardButton);

            cardDiv.appendChild(cardBody);

            wrapCardsDiv.appendChild(cardDiv);
        })
        cardapioDiv.appendChild(wrapCardsDiv);

        contentDiv.appendChild(cardapioDiv);

        var btnMudaCardapio = document.createElement('input');
        btnMudaCardapio.classList.add('btn-check');
        btnMudaCardapio.setAttribute('type', 'radio');
        btnMudaCardapio.setAttribute('name', 'cardapio');
        btnMudaCardapio.setAttribute('autocomplete', 'off');
        btnMudaCardapio.id = "btncardapio_" + categoria.nome;
        btnMudaCardapio.setAttribute('data-cardapio-id', i);
        btnMudaCardapio.addEventListener('click', function () {
            muda_cardapio(this);
        });
        cardapioSwitcher.appendChild(btnMudaCardapio);
        var btnMudaCardapioLabel = document.createElement('label');
        btnMudaCardapioLabel.classList.add('btn');
        btnMudaCardapioLabel.classList.add('btn-outline-dark');
        btnMudaCardapioLabel.textContent = categoria.nome;
        btnMudaCardapioLabel.setAttribute('for', 'btncardapio_' + categoria.nome);
        cardapioSwitcher.appendChild(btnMudaCardapioLabel);
    })
}
window.addEventListener('load', cardapioRender);