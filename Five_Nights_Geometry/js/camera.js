// ==========================================
// SISTEMA DE RADAR GLOBAL E CÂMERAS
// ==========================================

const btnCameras = document.getElementById('btn-cameras');
const cameraSystem = document.getElementById('camera-system');
let isCameraOpen = false;

// Fila de destruição do Círculo Amarelo (Palco, Fundos, Corredor Esq, Corredor Dir)
let cameraBreakOrder = [1, 4, 2, 3]; 
let brokenCameras = [];

// --- 1. LÓGICA DE ABRIR/FECHAR O TABLET E O FIREWALL ---
btnCameras.addEventListener('click', () => {
    if (btnCameras.disabled) return; 

    isCameraOpen = !isCameraOpen; 
    
    // Procura o Firewall na tela
    const firewallHUD = document.querySelector('.firewall-ui');
    
    if (isCameraOpen) {
        cameraSystem.classList.remove('hidden');
        btnCameras.innerText = "FECHAR CÂMERAS";
        
        // Mostra o Firewall quando o tablet abre
        if (firewallHUD) firewallHUD.style.display = 'block'; 
    } else {
        cameraSystem.classList.add('hidden');
        btnCameras.innerText = "ABRIR CÂMERAS";
        
        // Esconde o Firewall quando o tablet fecha
        if (firewallHUD) firewallHUD.style.display = 'none'; 
    }
});

// --- 2. LÓGICA DE DESTRUIÇÃO (VÍRUS DO CÍRCULO) ---
function breakNextCamera() {
    if (cameraBreakOrder.length > 0) {
        let camId = cameraBreakOrder.shift(); 
        brokenCameras.push(camId);
        
        console.warn(`[VÍRUS] CRÍTICO: Câmera ${camId} destruída!`);

        // Acha o node no mapa e aplica a classe 'dead'
        let camBtn = document.getElementById(`cam${camId}`);
        if (camBtn) {
            camBtn.classList.add('dead');
            camBtn.innerText = "DEAD";
        }
    } else {
        console.error("Todas as câmeras foram destruídas! Cegueira total.");
    }
}

// --- 3. LÓGICA DO PING GLOBAL ---
const btnPing = document.getElementById('btn-ping-global');
const statusDisplay = document.getElementById('status-display');

btnPing.addEventListener('click', () => {
    btnPing.disabled = true;
    
    // Limpa alertas antigos
    document.querySelectorAll('.node-btn').forEach(btn => btn.classList.remove('ping-active'));
    
    statusDisplay.innerText = "ENVIANDO PING RADAR PARA TODOS OS NODES...";

    setTimeout(() => {
        statusDisplay.innerText = "SINAL RECEBIDO. ANALISANDO INTERFERÊNCIAS...";

        setTimeout(() => {
            let anomalies = 0;

            // Verifica o Quadrado Azul (Se não estiver no escritório(4) e a câmera não estiver quebrada)
            if (typeof squarePosition !== 'undefined' && squarePosition >= 1 && squarePosition <= 3) {
                if (!brokenCameras.includes(squarePosition)) {
                    document.getElementById(`cam${squarePosition}`).classList.add('ping-active');
                    anomalies++;
                }
            }

            // Verifica o Triângulo Vermelho
            if (typeof trianglePosition !== 'undefined' && trianglePosition >= 1 && trianglePosition <= 3) {
                if (!brokenCameras.includes(trianglePosition)) {
                    document.getElementById(`cam${trianglePosition}`).classList.add('ping-active');
                    anomalies++;
                }
            }

            // Atualiza o painel de status
            if (anomalies > 0) {
                statusDisplay.innerText = `SCAN COMPLETO. ${anomalies} ANOMALIA(S) DETECTADA(S).`;
            } else {
                statusDisplay.innerText = "SCAN COMPLETO. NENHUMA ANOMALIA VISÍVEL.";
            }

            // O alerta fica piscando vermelho por 5 segundos e depois some, liberando novo ping
            setTimeout(() => {
                document.querySelectorAll('.node-btn').forEach(btn => btn.classList.remove('ping-active'));
                statusDisplay.innerText = "SINAL PERDIDO. RECOMENDA-SE NOVO PING.";
                btnPing.disabled = false;
            }, 5000);
            
        }, 1500);
    }, 1500);
});