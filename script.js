function toggleMenu() {
    const menu = document.querySelector('.menu');
    const icone = document.getElementById('icone-menu');

    menu.classList.toggle('show');

    if (menu.classList.contains('show')) {
        icone.style.transform = "rotate(180deg)";
        icone.textContent = '✕';
    } else {
        icone.style.transform = "rotate(0deg)";
        icone.textContent = '☰';
    }
}

const usuario = "ericwilliann";
const url = `https://api.github.com/users/${usuario}/repos`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar repositórios.");
        }
        return response.json();
    })
    .then(data => {
        const list = document.getElementById("repo-list");
        if (data.length === 0) {
            list.innerHTML = "<p>Você não tem repositórios públicos.</p>";
            return;
        }

        data.forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("projetos-card");

            card.innerHTML = `
                    <div class="caixa-textos-projetos">
                        <h3 class="info-titulo">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                        </h3>
                         <p class="paragrafo-projetos">${repo.description || "Sem descrição"}</p>
                    </div>`;

            list.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);
        const list = document.getElementById("repo-list");
        list.innerHTML = "<p>Erro ao carregar os repositórios.</p>";
    });

function enviarWhats(event) {
    event.preventDefault();
    const nome = document.getElementById('nome');
    const mensagem = document.getElementById('mensagem');
    const telefoneCodificado = "NTUxMjk4MjcwMjUyMQ==";
    const telefone = atob(telefoneCodificado);
    console.log(telefone);

    const texto = `Olá Eric Willian, meu nome é ${nome.value} e gostaria de entrar em contato com você. ${mensagem.value}`;
    const msgFormatada = encodeURIComponent(texto);

    const url = `https://wa.me/${telefone}?text=${msgFormatada}`;

    window.open(url, '_blank');
}