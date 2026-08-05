// ==========================================
// IA DO QUADRADO AZUL (Ataca pela Esquerda)
// ==========================================

let squarePosition = 1; // 1: Palco, 2: Corredor Esq, 3: Porta Esq, 4: Escritório (Morte)
let squareAiLevel = 5;  // Nível de agressividade (de 1 a 20)
let squareInterval;     // O cronômetro que faz ele pensar

function updateSquareAI() {
    let rng = Math.floor(Math.random() * 20) + 1;
    
    if (rng <= squareAiLevel) {
        console.log("Quadrado se moveu! (RNG: " + rng + ")");
        
        if (squarePosition === 1) {
            squarePosition = 2; 
            console.log("Quadrado está no Corredor Esquerdo (CAM 2)");
        } 
        else if (squarePosition === 2) {
            squarePosition = 3; 
            console.log("Quadrado está na PORTA ESQUERDA!");
        } 
        else if (squarePosition === 3) {
            if (isLeftDoorClosed === true) {
                squarePosition = 1; 
                console.log("BAM! Quadrado bateu na porta e voltou pro palco.");
            } else {
                squarePosition = 4;
                triggerJumpscare("QUADRADO AZUL");
            }
        }
    } else {
        console.log("Quadrado ficou parado. (RNG: " + rng + ")");
    }
}