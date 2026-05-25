// Captura as telas e o botão
const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const btnNewGame = document.getElementById('btn-new-game');

// Função para iniciar o jogo
function iniciarJogo() {
    // Esconde o menu e mostra o jogo
    menuScreen.classList.remove('active');
    menuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameScreen.classList.add('active');
    
    // Desliga os glitches do menu
    if (typeof stopMenuRNG === 'function') stopMenuRNG();

    // Direciona para a noite correta
    if (window.currentNight === 0) {
        console.log("Iniciando Noite 0 (Tutorial)...");
        startTutorialBoot(); // Inicia a cena do assistente
    } else {
        console.log(`Iniciando Noite ${window.currentNight}...`);
        startNoite(window.currentNight); // Inicia a noite normal
    }
}

// EVENTOS DOS BOTÕES
btnNewGame.addEventListener('click', () => {
    salvarJogo(0); // Zera o save pra Noite 0 (Tutorial)
    iniciarJogo();
});

btnContinue.addEventListener('click', () => {
    carregarSave(); // Lê o memory card para saber onde parou
    iniciarJogo();
});

// Evento de clique no botão
btnNewGame.addEventListener('click', startGame);
const btnContinue = document.getElementById('btn-continue');
window.currentNight = 0; // O jogo inteiro vai ler essa variável

function carregarSave() {
    let save = localStorage.getItem('geometry_save');
    window.currentNight = save ? parseInt(save) : 0;
}

function salvarJogo(noite) {
    localStorage.setItem('geometry_save', noite);
    window.currentNight = noite;
}