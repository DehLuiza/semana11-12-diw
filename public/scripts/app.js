const API_URL = "http://localhost:3000/filmes";

async function carregarFilmes() {
  const resp = await fetch(API_URL);
  const filmes = await resp.json();

  const container = document.getElementById("cards-container");
  if (container) {
    container.innerHTML = filmes.map(f =>
      `<div class="col-12 col-sm-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img src="${f.imagem_principal || 'img/semfoto.png'}" class="card-img-top" alt="${f.titulo}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${f.titulo}</h5>
            <p class="card-text flex-grow-1">${f.descricao}</p>
            <p class="small">${f.genero} • ${f.ano}</p>
            <a href="detalhes.html?id=${f.id}" class="btn btn-primary mt-auto">Ver detalhes</a>
          </div>
        </div>
      </div>`
    ).join('');
  }
}

async function carregarDetalhe() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const resp = await fetch(`${API_URL}/${id}`);
  const filme = await resp.json();

  const root = document.getElementById("detalhe-root");
  if (root) {
    root.innerHTML = `
      <h2>${filme.titulo}</h2>
      <p>${filme.genero} (${filme.ano})</p>
      <p>${filme.descricao}</p>
      <hr>
      <button class="btn btn-danger" onclick="deletarFilme(${filme.id})">Excluir</button>
    `;
  }
}

async function cadastrarFilme(e) {
  e.preventDefault();
  const novoFilme = {
    titulo: document.getElementById("titulo").value,
    ano: document.getElementById("ano").value,
    genero: document.getElementById("genero").value,
    descricao: document.getElementById("descricao").value
  };

  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoFilme)
  });

  if (resp.ok) {
    alert("Filme cadastrado com sucesso!");
    window.location.href = "index.html";
  }
}

async function deletarFilme(id) {
  if (confirm("Deseja realmente excluir este filme?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("Filme excluído!");
    window.location.href = "index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cards-container")) carregarFilmes();
  if (document.getElementById("detalhe-root")) carregarDetalhe();
  const form = document.getElementById("formFilme");
  if (form) form.addEventListener("submit", cadastrarFilme);
});