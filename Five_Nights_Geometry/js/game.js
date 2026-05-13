// Variáveis de estado do jogo
let hour = 0; // 0 representa 12 AM
let power = 100;
let clockInterval;
let powerInterval;


// Capturando os elementos da tela
const clockDisplay = document.getElementById('clock');
const powerDisplay = document.getElementById('power');

// --- SISTEMA DE PORTAS ---
const doorLeft = document.getElementById('door-left');
const doorRight = document.getElementById('door-right');
const btnDoorLeft = document.getElementById('btn-door-left');
const btnDoorRight = document.getElementById('btn-door-right');

let isLeftDoorClosed = false;
let isRightDoorClosed = false;

// Botão da Porta Esquerda
btnDoorLeft.addEventListener('click', () => {
    isLeftDoorClosed = !isLeftDoorClosed; // Inverte o estado
    
    if (isLeftDoorClosed) {
        doorLeft.classList.add('closed');
        doorLeft.innerText = "FECHADA";
        btnDoorLeft.classList.add('active');
    } else {
        doorLeft.classList.remove('closed');
        doorLeft.innerText = "PORTA ABERTA";
        btnDoorLeft.classList.remove('active');
    }
});

// Botão da Porta Direita
btnDoorRight.addEventListener('click', () => {
    isRightDoorClosed = !isRightDoorClosed;
    
    if (isRightDoorClosed) {
        doorRight.classList.add('closed');
        doorRight.innerText = "FECHADA";
        btnDoorRight.classList.add('active');
    } else {
        doorRight.classList.remove('closed');
        doorRight.innerText = "PORTA ABERTA";
        btnDoorRight.classList.remove('active');
    }
});

// Função que inicia a noite
function startNoite() {
    hour = 0;
    power = 100;
    updateDisplays();

    // LIGA AS IAs
    squareInterval = setInterval(updateSquareAI, 4000);
    triangleInterval = setInterval(updateTriangleAI, 7000);
    circleInterval = setInterval(updateCircleAI, 10000);
    
    startHexagonAI();

    // Loop do Relógio: Passa 1 hora a cada 5 segundos (para teste)
    clockInterval = setInterval(() => {
        hour++;
        updateDisplays();
        
        if (hour === 6) {
            winGame();
        }
    }, 5000); 

    powerInterval = setInterval(() => {
        if (power > 0) {
            let drainAmount = 1; 
            
            // Cada porta fechada gasta +1
            if (isLeftDoorClosed) drainAmount += 1;
            if (isRightDoorClosed) drainAmount += 1;
            // Vazamento no gerador (Hexágono): +1 drain
            if (window.isPowerLeaking) drainAmount += 1;

            // Se o tablet das câmeras estiver aberto, gasta +1 (se já tiver implementado)
            // if (isCameraOpen) drainAmount += 1;

            power -= drainAmount;
            
            if(power < 0) power = 0; 
            updateDisplays();
        } else {
            runOutPower(); // Acabou a energia!
        }
    }, 1000);
}

// Atualiza os textos na tela
function updateDisplays() {
    let displayHour = hour === 0 ? 12 : hour;
    clockDisplay.innerText = `${displayHour}:00 AM`;
    powerDisplay.innerText = `${power}%`;
}

// Função de Vitória (Chegou às 6 AM)
function winGame() {
    clearInterval(clockInterval);
    clearInterval(powerInterval);
    console.log("6 AM alcançado!");
    alert("6:00 AM! Você sobreviveu à primeira noite!");
    // Futuramente, voltamos para o menu aqui
}

// Função de Fim de Energia
function runOutPower() {
    clearInterval(powerInterval);
    console.log("Energia acabou...");
    // Futuramente: Apagar as luzes, tocar música assustadora e dar jumpscare
}

// ==========================================
// EVENTOS DE DERROTA
// ==========================================

// Função Global de Jumpscare
function triggerJumpscare(monstro) {
    console.error("JUMPSCARE: O " + monstro + " TE PEGOU!");
    alert("JUMPSCARE! O " + monstro + " entrou no escritório!");
    
    // Para o tempo e o gasto de bateria
    clearInterval(clockInterval);
    clearInterval(powerInterval);
}