// ==========================================
// SISTEMA DO MINIGAME (VÍRUS DO CÍRCULO)
// ==========================================

// 1. O Banco de Palavras (Pode colocar quantas quiser aqui depois)
const palavrasNormais = [
    "Function_Door", "Central_Connection", "Terminal_Overdrive", 
    "System_Boot", "Camera_Feed", "Audio_Link", 
    "Security_Breach", "Power_Grid", "Ventilation_Control",
    "Mainframe_Access", "Data_Log", "Motion_Sensor"
];

const palavrasErro = [
    "Banana_Core", "Pizza_Protocol", "Teeth_Render", 
    "Glitch_Entity", "Smile_Format", "Eye_Tracker",
    "Meat_Syntax", "Blood_String", "Shadow_Byte"
];

// Função mágica que embaralha qualquer lista (padrão de programação de jogos)
function embaralharLista(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]]; // Troca as palavras de lugar
    }
    return lista;
}

// 2. A função que vai disparar o minigame
function startTerminalMinigame() {
    console.log("ALERTA: VÍRUS DETECTADO! Iniciando minigame do Terminal...");
    // Troca as telas: esconde o jogo e mostra o terminal
    document.getElementById('game-screen').classList.replace('active', 'hidden');
    document.getElementById('terminal-screen').classList.replace('hidden', 'active');
    
    let maoDoJogador = []; // Nossa "caixa temporária"

    // Passo 1: Pescando 8 palavras normais aleatórias
    for(let i = 0; i < 8; i++) {
        let randomIndex = Math.floor(Math.random() * palavrasNormais.length);
        maoDoJogador.push(palavrasNormais[randomIndex]);
    }

    // Passo 2: Pescando 1 palavra de erro (O Impostor)
    let randomErrorIndex = Math.floor(Math.random() * palavrasErro.length);
    let palavraInfectada = palavrasErro[randomErrorIndex];
    maoDoJogador.push(palavraInfectada);

    // Passo 3: Embaralha as 9 palavras!
    maoDoJogador = embaralharLista(maoDoJogador);

    // Passo 4: Mostrando no F12 para a gente ver funcionando (Amanhã jogamos isso na tela)
    console.log("--- TELA DO TERMINAL ---");
    console.log(maoDoJogador);
    console.log("-> O Jogador precisa encontrar e clicar em: " + palavraInfectada);
}

// O botão "Open Terminal" que aparece no escritório
const btnOpenTerminal = document.getElementById('btn-open-terminal');

btnOpenTerminal.addEventListener('click', () => {
    // Esconde o aviso de erro do escritório
    document.getElementById('virus-alert').classList.add('hidden');
    
    // Dispara a função que criamos para abrir a tela preta e gerar as palavras
    startTerminalMinigame();
});

document.getElementById('virus-alert').classList.remove('hidden');