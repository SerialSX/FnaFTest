// ==========================================
// LÓGICA DO MENU PRINCIPAL
// ==========================================

let menuRngInterval; // Variável para guardar o "motor" do menu

// Função da transição visual (Glitch)
function triggerGlitch() {
    const menuScreen = document.getElementById('menu-screen');
    menuScreen.classList.add('glitched');
    
    setTimeout(() => {
        menuScreen.classList.remove('glitched');
    }, 400);
}

// Inicia o gerador de números do menu
function startMenuRNG() {
    menuRngInterval = setInterval(() => {
        let rng = Math.floor(Math.random() * 15) + 1;
        // console.log("Número sorteado pro Glitch: " + rng); // Pode deixar comentado para não poluir
        
        if (rng > 10) {
            triggerGlitch();
        }
    }, 5000);
}

// Função para PARAR o menu (Vamos chamar ela quando o jogo começar)
function stopMenuRNG() {
    clearInterval(menuRngInterval);
    console.log("Sistema do Menu desligado.");
}

// Liga o motor assim que a tela abre
startMenuRNG();