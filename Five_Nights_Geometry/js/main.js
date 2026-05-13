// Captura as telas e o botão
const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const btnNewGame = document.getElementById('btn-new-game');

// Função para iniciar o jogo
function startGame() {
    // Esconde o menu
    menuScreen.classList.remove('active');
    menuScreen.classList.add('hidden');
    
    // Mostra a tela do jogo
    gameScreen.classList.remove('hidden');
    gameScreen.classList.add('active');
    
    // DESLIGA O MOTOR DO MENU!
    stopMenuRNG();
    
    console.log("Noite 1 iniciada...");
    startNoite();
}

// Evento de clique no botão
btnNewGame.addEventListener('click', startGame);