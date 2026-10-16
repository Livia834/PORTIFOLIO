// idioma.js - Gerenciador global de idiomas

let idiomaAtual = localStorage.getItem('idioma') || 'pt';

function atualizarIdiomaPagina() {
    // 1. Atualiza elementos simples [data-pt] e [data-en]
    const elementos = document.querySelectorAll('[data-pt][data-en]');
    elementos.forEach(el => {
        el.textContent = el.getAttribute(`data-${idiomaAtual}`);
    });

    // 2. Atualiza elementos com formatação HTML [data-html-pt] e [data-html-en] (como quebras <br>)
    const elementosHTML = document.querySelectorAll('[data-html-pt][data-html-en]');
    elementosHTML.forEach(el => {
        el.innerHTML = el.getAttribute(`data-html-${idiomaAtual}`);
    });

    // 3. Atualiza os placeholders dos inputs e textareas do formulário (Contato)
    const inputsComPlaceholder = document.querySelectorAll('[data-pt-placeholder][data-en-placeholder]');
    inputsComPlaceholder.forEach(input => {
        input.placeholder = input.getAttribute(`data-${idiomaAtual}-placeholder`);
    });

    // 4. Atualiza o texto do botão de envio do formulário, caso tenha data-pt/data-en
    const btnEnviar = document.getElementById('button');
    if (btnEnviar && btnEnviar.hasAttribute('data-pt')) {
        btnEnviar.textContent = btnEnviar.getAttribute(`data-${idiomaAtual}`);
    }

    // 5. Atualiza o destaque visual do seletor PT | EN
    const spanPt = document.getElementById('lang-pt');
    const spanEn = document.getElementById('lang-en');

    if (spanPt && spanEn) {
        if (idiomaAtual === 'pt') {
            spanPt.classList.add('ativo');
            spanEn.classList.remove('ativo');
        } else {
            spanEn.classList.add('ativo');
            spanPt.classList.remove('ativo');
        }
    }

    // 6. Salva a preferência
    localStorage.setItem('idioma', idiomaAtual);
}

function carregarPDFPorIdioma() {
    const iframePdf = document.getElementById('pdf-curriculo');
    const linkBaixar = document.getElementById('btn-baixar');
    const linkAbrir = document.getElementById('btn-abrir');

    if (iframePdf && linkBaixar && linkAbrir) {
        if (idiomaAtual === 'en') {
            iframePdf.src = 'resume_livia_duarte_silva_en.pdf';
            linkBaixar.href = 'resume_livia_duarte_silva_en.pdf';
            linkBaixar.download = 'resume_livia_duarte_silva_en.pdf';
            linkAbrir.href = 'resume_livia_duarte_silva_en.pdf';
        } else {
            iframePdf.src = 'curriculo_livia_duarte_silva.pdf';
            linkBaixar.href = 'curriculo_livia_duarte_silva.pdf';
            linkBaixar.download = 'curriculo_livia_duarte_silva.pdf';
            linkAbrir.href = 'curriculo_livia_duarte_silva.pdf';
        }
    }
}

function alternarIdioma() {
    idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt';
    atualizarIdiomaPagina();
    carregarPDFPorIdioma();
}

// Executa automaticamente ao carregar qualquer página do site
document.addEventListener('DOMContentLoaded', () => {
    atualizarIdiomaPagina();
    carregarPDFPorIdioma();
});