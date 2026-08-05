// ==========================================
// IA DO CIRCULO AMARELO (O Vírus das Palavras)
// ==========================================

let circleAiLevel = 3;  // Nível de agressividade (de 1 a 20)
let circleInterval;     // O cronômetro que faz ele pensar

function updateCircleAI() {
    let rng = Math.floor(Math.random() * 20) + 1;
    
    if (rng <= circleAiLevel) {
        console.log("CÍRCULO AMARELO ATACOU! (RNG: " + rng + ")");
        
        const virusAlert = document.getElementById('virus-alert');
        const terminalOverlay = document.getElementById('terminal-overlay');
        
        // Só ataca se a tela de erro já não estiver aparecendo
        if (virusAlert.classList.contains('hidden') && terminalOverlay.classList.contains('hidden')) {
            virusAlert.classList.remove('hidden');
        }
    } else {
        console.log("Circulo processando em silêncio... (RNG: " + rng + ")");
    }
}