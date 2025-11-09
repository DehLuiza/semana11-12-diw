const API_URL = "http://localhost:3000/filmes";
async function carregarFilmes() {
    try {
        const response = await fetch(API_URL);
        const filmes = await response.json();
        montarCarrossel(filmes);
        montarCatalogo(filmes);
    } catch (error) {
        console.error("Erro ao carregar filmes:", error);
    }
}

function montarCarrossel(filmes) {
    const carouselInner = document.getElementById("carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    filmes.slice(0, 3).forEach((filme, index) => {
        const activeClass = index === 0 ? "active" : "";
        carouselInner.innerHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${filme.imagem}" class="d-block w-100" alt="${filme.titulo}">
                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                    <h5>${filme.titulo}</h5>
                    <p>${filme.genero} | ${filme.ano}</p>
                </div>
            </div>
        `;
        carouselIndicators.innerHTML += `
            <button type="button" data-bs-target="#carouselDestaques" data-bs-slide-to="${index}" class="${activeClass}" aria-label="Slide ${index + 1}"></button>
        `;
    });
}

function montarCatalogo(filmes) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    filmes.forEach(filme => {
        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <p class="card-text">${filme.descricao}</p>
                        <a href="detalhes.html?id=${filme.id}" class="btn btn-primary">Ver detalhes</a>
                    </div>
                </div>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", carregarFilmes);