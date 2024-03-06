
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

const cardapio = async () => {
    const cardapio_content = await (await fetch('/content.json')).json()

    
}