import api from "./api.js";
const ui = {
    async preencherFormulario(petId) {
        const pet = await api.buscarPetPorId(petId);
        document.getElementById("pet-id").value = pet.id;
        document.getElementById("pet-conteudo").value = pet.nome;
        document.getElementById("pet-autoria").value = pet.raca;
    },
    async renderizarPets() {
        const listaPets = document.getElementById('lista-resgatinho');
        const mensagemVazia = document.getElementById("mensagem-vazia");
        listaPets.innerHTML = "";
        try {
            const pets = await api.buscarPets();
            pets.forEach(ui.adicionarPetsNaLista);
            if (pets.length === 0) {
                mensagemVazia.style.display = "block";
              } else {
                mensagemVazia.style.display = "none";
                pets.forEach(ui.adicionarPetsNaLista);
              }
        } catch {
           alert('Erro ao renderizar pets');
        }
    },
    limparFormulario() {
        document.getElementById("pet-form").reset();
    },

    adicionarPetsNaLista(pet) {
        const listaPets = document.getElementById("lista-resgatinho");
        const li = document.createElement("li");
        li.setAttribute("data-id", pet.id);
        li.classList.add("li-resgatinho");

        const logPet = document.createElement("img");
        logPet.src = "/imagens/cat_18642998.svg";
        logPet.classList.add("logo");

        const petNome = document.createElement("div");
        petNome.textContent = pet.nome;
        petNome.classList.add("resgatinho-name");

        const petRaca = document.createElement("div");
        petRaca.textContent = pet.raca;
        petRaca.classList.add("resgatinho-raca");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => ui.preencherFormulario(pet.id);

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "/imagens/icone-editar.svg";
        iconeEditar.alt = "Editar";
        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPet(pet.id);
                ui.renderizarPets();
            } catch {
                alert('Erro ao excluir pet');
            }
        }


        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "imagens/icone-excluir.png";
        iconeExcluir.alt = "Excluir";
        botaoExcluir.appendChild(iconeExcluir);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(logPet);
        li.appendChild(petNome);
        li.appendChild(petRaca);
        li.appendChild(icones);
        listaPets.appendChild(li);
        }
}

export default ui;