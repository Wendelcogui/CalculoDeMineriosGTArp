const precos = {
    ferro: 100,
    cobre: 180,
    prata: 340,
    ouro: 675,
    rubi: 1350,
    diamante: 1800
};

let itens = {
    ferro: 0,
    cobre: 0,
    prata: 0,
    ouro: 0,
    rubi: 0,
    diamante: 0
};

// Carregar os dados do localStorage quando a página for carregada
window.onload = function() {
    if (localStorage.getItem('itens')) {
        itens = JSON.parse(localStorage.getItem('itens'));
    }
    atualizarExibicao();
};

function adicionar(item) {
    let quantidade = parseInt(document.getElementById(item).value);
    if (quantidade > 0) {
        itens[item] += quantidade;
        salvarNoLocalStorage();
        atualizarExibicao();
    }
}

function remover(item) {
    let quantidade = parseInt(document.getElementById(item).value);
    if (quantidade > 0 && itens[item] >= quantidade) {
        itens[item] -= quantidade;
        salvarNoLocalStorage();
        atualizarExibicao();
    }
}

function atualizarExibicao() {
    const exibicao = document.getElementById('exibicao');
    exibicao.innerHTML = '';

    let total = 0;

    for (let item in itens) {
        if (itens[item] > 0) {
            const valorItem = precos[item] * itens[item];
            total += valorItem;

            const li = document.createElement('li');
            li.textContent = `${item.charAt(0).toUpperCase() + item.slice(1)}: ${itens[item]} unidades - R$ ${valorItem.toFixed(2)}`;
            exibicao.appendChild(li);
        }
    }

    document.getElementById('total').textContent = total.toFixed(2);
}

function salvarNoLocalStorage() {
    localStorage.setItem('itens', JSON.stringify(itens));
}
