// Variáveis de estado do jogo
let hour = 0; // 0 representa 12 AM
let power = 100;
let clockInterval;
let powerInterval;

// Capturando os elementos da tela
const clockDisplay = document.getElementById('clock');
const powerDisplay = document.getElementById('power');

// Função que inicia a noite
function startNoite() {
    hour = 0;
    power = 100;
    updateDisplays();

    // Loop do Relógio: Passa 1 hora a cada 5 segundos (para teste)
    clockInterval = setInterval(() => {
        hour++;
        updateDisplays();
        
        if (hour === 6) {
            winGame();
        }
    }, 5000); 

    // Loop da Bateria: Drena 1% de energia a cada 1 segundo
    powerInterval = setInterval(() => {
        if (power > 0) {
            power--;
            updateDisplays();
        } else {
            runOutPower();
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