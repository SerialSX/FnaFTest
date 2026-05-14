// ==========================================
// SISTEMA DE CÂMERAS E RADAR
// ==========================================

const btnCameras = document.getElementById('btn-cameras');
const cameraSystem = document.getElementById('camera-system');
let isCameraOpen = false;

// Fila de destruição do Círculo Amarelo (Da mais inútil para a mais vital)
let cameraBreakOrder = [1, 4, 2, 3]; 
let brokenCameras = [];

// Função para abrir/fechar o tablet
btnCameras.addEventListener('click', () => {
    // Se o sistema de câmeras estiver quebrado pelo Hexágono, ele nem tenta abrir
    if (btnCameras.disabled) return; 

    isCameraOpen = !isCameraOpen; // Inverte o estado (Aberto/Fechado)
    
    if (isCameraOpen) {
        cameraSystem.classList.remove('hidden');
        btnCameras.innerText = "FECHAR CÂMERAS";
    } else {
        cameraSystem.classList.add('hidden');
        btnCameras.innerText = "ABRIR CÂMERAS";
    }
});

// Função que o Círculo Amarelo chama quando o jogador erra a palavra
function breakNextCamera() {
    if (cameraBreakOrder.length > 0) {
        let camId = cameraBreakOrder.shift(); 
        brokenCameras.push(camId);
        
        console.warn(`[VÍRUS] CRÍTICO: Câmera ${camId} destruída permanentemente!`);

        // Quebra visualmente o botão no mapa
        let camBtn = document.querySelector(`.cam-btn[data-cam="${camId}"]`);
        if (camBtn) {
            camBtn.disabled = true;
            camBtn.style.backgroundColor = "#330000"; // Vermelho escuro
            camBtn.style.color = "#ff0000";
            camBtn.style.borderColor = "#ff0000";
            camBtn.innerText = "DEAD";
            camBtn.style.textDecoration = "line-through";
        }
    } else {
        console.error("Todas as câmeras foram destruídas! Cegueira total.");
    }
}

// ==========================================
// LÓGICA DE TROCA DE CÂMERAS
// ==========================================

const camButtons = document.querySelectorAll('.cam-btn');
const cameraNameDisplay = document.getElementById('camera-name');

// Dicionário com os nomes de cada câmera
const cameraNames = {
    "1": "CAM 01 - PALCO PRINCIPAL",
    "2": "CAM 02 - CORREDOR ESQUERDO",
    "3": "CAM 03 - CORREDOR DIREITO",
    "4": "CAM 04 - FUNDOS / GERADOR"
};

camButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Se a câmera estiver morta (destruída pelo Círculo), o clique não faz nada
        if (btn.disabled) return;

        // 1. Remove a classe 'active-cam' (verde) de TODOS os botões
        camButtons.forEach(b => b.classList.remove('active-cam'));

        // 2. Coloca a classe 'active-cam' (verde) SÓ no botão que você clicou
        btn.classList.add('active-cam');

        // 3. Muda o texto no topo da tela para o nome correto da câmera
        let camId = btn.getAttribute('data-cam');
        cameraNameDisplay.innerText = cameraNames[camId];

        // Futuramente: AQUI VAMOS TROCAR A IMAGEM DE FUNDO DA CÂMERA!
        console.log(`Visão alterada para: ${cameraNames[camId]}`);
    });
});