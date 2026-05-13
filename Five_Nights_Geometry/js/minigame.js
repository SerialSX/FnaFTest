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
    // 1. Abre o terminal flutuante do Lauan
    document.getElementById('terminal-overlay').classList.remove('hidden');

    let maoDoJogador = [];
    for(let i = 0; i < 8; i++) {
        let randomIndex = Math.floor(Math.random() * palavrasNormais.length);
        maoDoJogador.push(palavrasNormais[randomIndex]);
    }
    
    let randomErrorIndex = Math.floor(Math.random() * palavrasErro.length);
    let palavraInfectada = palavrasErro[randomErrorIndex];
    maoDoJogador.push(palavraInfectada);
    maoDoJogador = embaralharLista(maoDoJogador);

    // 2. Seleciona a tela do Lauan e injeta as palavras
    const terminalOutput = document.getElementById('terminal-output');
    terminalOutput.innerHTML = '<p style="color:red; text-shadow:none;">SISTEMA CORROMPIDO. SELECIONE A ANOMALIA:</p>';

    maoDoJogador.forEach(palavra => {
        let span = document.createElement('span');
        span.innerText = palavra;
        span.className = 'palavra-minigame'; 
        
        span.onclick = () => {
            if (palavra === palavraInfectada) {
                // ACERTOU! Esconde o terminal e limpa a tela
                document.getElementById('terminal-overlay').classList.add('hidden');
                terminalOutput.innerHTML = ''; // Limpa pra não bugar o terminal depois
                console.log("Sistema restaurado.");
            } else {
                alert("ACESSO NEGADO! SINTAXE VÁLIDA DETECTADA.");
            }
        };
        terminalOutput.appendChild(span);
    });
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