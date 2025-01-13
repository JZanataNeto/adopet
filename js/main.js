import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPets();

    const formularioPets = document.getElementById("pet-form");
    const botaoCancelar = document.getElementById("botao-cancelar");

    formularioPets.addEventListener("submit", manipularSubmissaoFormulario);
    botaoCancelar.addEventListener("click", manipularCancelamento);
});

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById("pet-id").value;
    const nome = document.getElementById("pet-conteudo").value;
    const raca = document.getElementById("pet-autoria").value;
 
    try {
        if(id) {
            await api.editarPet({id, nome, raca});
        } else {
            await api.salvarPets({nome, raca});
        }
        ui.renderizarPets();
    } catch {
        alert("Erro ao editar ou salvar pet");
    }
 }

 function manipularCancelamento() {
    ui.limparFormulario();
  }