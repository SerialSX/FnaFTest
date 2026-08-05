// ==========================================
// IA DO TRIANGULO VERMELHO (Ataca pela Direita)
// ==========================================

let trianglePosition = 1; // 1: Palco, 2: Corredor Dir, 3: Porta Dir, 4: Escritório (Morte)
let triangleAiLevel = 5;  // Nível de agressividade (de 1 a 20)
let triangleInterval;     // O cronômetro que faz ele pensar

function updateTriangleAI() {
    let rng = Math.floor(Math.random() * 20) + 1;
    
    if (rng <= triangleAiLevel) {
        console.log("Triangulo se moveu! (RNG: " + rng + ")");
        
        if (trianglePosition === 1) {
            trianglePosition = 2; 
            console.log("Triangulo está no Corredor Direito (CAM 3)");
        } 
        else if (trianglePosition === 2) {
            trianglePosition = 3; 
            console.log("Triangulo está na PORTA DIREITA!");
        } 
        else if (trianglePosition === 3) {
            if (isRightDoorClosed === true) {
                trianglePosition = 1; 
                console.log("BAM! Triangulo bateu na porta e voltou pro palco.");
            } else {
                trianglePosition = 4;
                triggerJumpscare("TRIANGULO VERMELHO");
            }
        }
    } else {
        console.log("Triangulo ficou parado. (RNG: " + rng + ")");
    }
}