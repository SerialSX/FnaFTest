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

let internalBatteryTimer; // Timer para a bateria de emergência do Tablet

// Função de Fim de Energia (O Apagão Principal)
function runOutPower() {
    clearInterval(powerInterval); // Para APENAS o dreno de energia. 
    // O clockInterval CONTINUA RODANDO no escuro para o cara ter a chance de ganhar!

    console.log("Energia principal esgotada... PROTOCOLO DE BLACKOUT INICIADO.");

    // 1. As portas perdem a força magnética e abrem sozinhas (Vulnerabilidade total)
    isLeftDoorClosed = false;
    isRightDoorClosed = false;
    doorLeft.classList.remove('closed');
    doorRight.classList.remove('closed');
    doorLeft.innerText = "PORTA ABERTA";
    doorRight.innerText = "PORTA ABERTA";
    btnDoorLeft.classList.remove('active');
    btnDoorRight.classList.remove('active');

    // 2. Trava os botões físicos da mesa
    btnDoorLeft.disabled = true;
    btnDoorRight.disabled = true;
    let btnTerminal = document.getElementById('btn-open-terminal');
    if (btnTerminal) btnTerminal.disabled = true;

    // 3. Apaga as luzes da sala (com aquele fadezinho foda)
    document.body.classList.add('blackout-mode');

    // 4. Inicia a bateria interna do tablet (15 segundos de sobrevida)
    let tempoTablet = 15000;
    console.log(`Bateria de emergência do tablet ativada. Restam ${tempoTablet / 1000} segundos!`);

    internalBatteryTimer = setTimeout(() => {
        // A bateria do tablet morre. O radar desliga.
        console.log("Bateria do tablet morreu. Escuridão total. Agora é rezar para dar 6 AM.");

        document.getElementById('btn-cameras').disabled = true;
        const cameraSystem = document.getElementById('camera-system');
        if (cameraSystem) cameraSystem.classList.add('hidden');

    }, tempoTablet);
}

// Função que inicia a noite
function startNoite() {
    hour = 0;
    power = 100;
    updateDisplays();

    // LIGA AS IAs (A caçada começou!)
    squareInterval = setInterval(updateSquareAI, 9000);
    triangleInterval = setInterval(updateTriangleAI, 16000);
    circleInterval = setInterval(updateCircleAI, 20000);
    startHexagonAI();

    // Loop do Relógio: Passa 1 hora a cada 30 segundos
    clockInterval = setInterval(() => {
        hour++;
        updateDisplays();

        if (hour === 6) {
            winGame();
        }
    }, 30000);

    // Loop da Energia (Balanceado)
    powerInterval = setInterval(() => {
        if (power > 0) {
            let drainAmount = 1;

            // Cada porta fechada gasta +1
            if (isLeftDoorClosed) drainAmount += 1;
            if (isRightDoorClosed) drainAmount += 1;
            // Vazamento no gerador (Hexágono): +1 drain
            if (window.isPowerLeaking) drainAmount += 1;

            power -= drainAmount;

            if (power < 0) power = 0;
            updateDisplays();
        } else {
            runOutPower(); // Acabou a energia!
        }
    }, 4500);
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

// ==========================================
// PROTOCOLO DE OVERRIDE DO GERADOR
// ==========================================
function triggerEnergyOverride() {
    // 1. Atualiza a energia para 50% (seja punição ou salvação)
    let isPunishment = power > 50;
    power = 50;
    updateDisplays();

    // 2. Se a sala estiver em blackout, a gente ressuscita tudo
    if (document.body.classList.contains('blackout-mode')) {
        console.log("Gerador reiniciado! Luzes voltando...");

        // Cancela o Game Over do tablet
        if (typeof internalBatteryTimer !== 'undefined') {
            clearTimeout(internalBatteryTimer);
        }

        // Remove a escuridão
        document.body.classList.remove('blackout-mode');

        // Destrava os botões físicos da mesa
        btnDoorLeft.disabled = false;
        btnDoorRight.disabled = false;
        let btnTerminal = document.getElementById('btn-open-terminal');
        if (btnTerminal) btnTerminal.disabled = false;

        // Religa o dreno de energia normal da sala
        powerInterval = setInterval(() => {
            if (power > 0) {
                let drainAmount = 1;
                if (isLeftDoorClosed) drainAmount += 1;
                if (isRightDoorClosed) drainAmount += 1;
                if (window.isPowerLeaking) drainAmount += 1;

                power -= drainAmount;
                if (power < 0) power = 0;
                updateDisplays();
            } else {
                runOutPower();
            }
        }, 1000);
    }

    return isPunishment; // Retorna pro Terminal saber o que responder
}