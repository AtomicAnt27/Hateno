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

const addToOrder = async (item) => {
    var sacolaPrev = localStorage.getItem('sacola');
    if (sacolaPrev === null) {
        sacolaPrev = "[]";
    }
    var sacola = await JSON.parse(sacolaPrev);
    sacola.push(item);
    localStorage.setItem('sacola', JSON.stringify(sacola));

    const nomeItem = item.name;

    calcularTotal();

    // Criar o toast
    var toastContainer = document.querySelector('.toastContainer');

    var toast = document.createElement('div');
    toast.classList.add('toastFloat');
    toast.textContent = '';

    var toastText = document.createElement('span');
    toastText.textContent = nomeItem;
    toastText.style.color = 'black';

    var closeBtn = document.createElement('button');
    closeBtn.classList.add('toastFloat-close-btn');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function () {
        toast.remove();
    };

    toast.appendChild(toastText);
    toast.appendChild(closeBtn);
    toastContainer.appendChild(toast);

    // Remover toast após 5 segundos
    setTimeout(() => {
        toast.remove();
    }, 8000);
}

const calcularTotal = () => {
    var sacolaRaw = localStorage.getItem('sacola');
    if (sacolaRaw === null) {
        sacolaRaw = "[]";
    }
    var sacola = JSON.parse(sacolaRaw);

    var total = 0;
    sacola.forEach(item => {
        total += item.price; // Certifique-se de que o campo price está sendo acessado corretamente
    });

    document.querySelectorAll('.total-content').forEach(elm => {
        elm.textContent = "R$ " + total.toFixed(2);
    });

    console.log(total); // Verifique se o total está sendo calculado corretamente

    return total;
}

const cardapioRender = async () => {
    if (localStorage.getItem('nome') !== null) {
        document.querySelector('#nome-print').textContent = localStorage.getItem('nome');
    }


    try {
        const response = await fetch("./content.json");
        const data = await response.json();
        console.log(data);

        var wrapEverything = document.createElement('div');
        wrapEverything.classList.add('wrap-everything');
        document.body.appendChild(wrapEverything);

        var contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        wrapEverything.appendChild(contentDiv);

        var toastContainer = document.createElement('div');
        toastContainer.classList.add('toastContainer');
        contentDiv.appendChild(toastContainer);

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

            var categotyTitle = document.createElement('h2');
            categotyTitle.textContent = categoria.nome;
            cardapioDiv.appendChild(categotyTitle);

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

                var cardButtonContainer = document.createElement('div');
                cardButtonContainer.classList.add('.card-button-container');
                var cardButton = document.createElement('a');
                cardButton.classList.add("btn", "btn-primary", "cardBtn");
                cardButton.textContent = "+ Add to order"
                cardButton.onclick = function () { addToOrder(item); }
                var cardPriceBadge = document.createElement('div');
                cardPriceBadge.classList.add('item-price');
                cardPriceBadge.classList.add('badge');
                cardPriceBadge.classList.add('text-bg-light');
                cardPriceBadge.textContent = `R$ ${item.price.toFixed(2)}`;
                cardPriceBadge.style.color = "black";

                cardButtonContainer.appendChild(cardButton);
                cardBody.appendChild(cardButtonContainer);
                cardButtonContainer.appendChild(cardPriceBadge);

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

        calcularTotal();

    } catch (error) {
        console.error("Erro ao carregar o cardápio:", error);
    }
}
window.addEventListener('load', cardapioRender);