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
    
    console.log("Noite 1 iniciada...");

    startNoite();
}

// Evento de clique no botão
btnNewGame.addEventListener('click', startGame);

// Capturando a tela do menu (caso ainda não tenha no seu código)
// const menuScreen = document.getElementById('menu-screen'); // Se já existir lá em cima, não precisa copiar esta linha de novo

// PASSO 1: A FUNÇÃO DA TRANSIÇÃO VISUAL
// Isso aqui faz a tela piscar para o roxo e voltar rápido
function triggerGlitch() {
    // Adiciona a classe que mostra a imagem corrompida
    menuScreen.classList.add('glitched');
    
    // Espera 200 milissegundos (um piscar de olhos) e remove a classe, voltando ao normal
    setTimeout(() => {
        menuScreen.classList.remove('glitched');
    }, 400);
}

// PASSO 2: O GERADOR DE NÚMEROS (RNG)
// Isso aqui vai ficar rodando de fundo enquanto o jogador estiver no menu
function startMenuRNG() {
    // Cria um loop que roda a cada 5 segundos (5000 milissegundos)
    setInterval(() => {
        // Gera um número aleatório de 1 até 15
        let rng = Math.floor(Math.random() * 15) + 1;
        
        // (Opcional) Mostra no console o número sorteado pra você ver funcionando
        console.log("Número sorteado pro Glitch: " + rng);

        // Se o número for maior que 10 (ou seja: 11, 12, 13, 14 ou 15), ativa o glitch!
        if (rng > 10) {
            triggerGlitch();
        }
    }, 5000);
}

// PASSO 3: LIGAR O MOTOR ASSIM QUE O JOGO ABRIR
startMenuRNG();