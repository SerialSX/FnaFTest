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

// ==========================================
// FUNÇÕES GERAIS E OUTRAS IAs
// ==========================================

function triggerJumpscare(monstro) {
    console.error("JUMPSCARE: O " + monstro + " TE PEGOU!");
    alert("JUMPSCARE! O " + monstro + " entrou no escritório!");
}

// ==========================================
// IA DO CIRCULO AMARELO (Em construção)
// ==========================================