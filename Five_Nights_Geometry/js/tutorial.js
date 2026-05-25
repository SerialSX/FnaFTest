// ==========================================
// NOITE 0: MOTOR DE DIÁLOGO (VISUAL NOVEL)
// ==========================================

const tutorialOverlay = document.getElementById('tutorial-overlay');
const tutorialLoading = document.getElementById('tutorial-loading');
const tutorialScene = document.getElementById('tutorial-scene');
const tutorText = document.getElementById('tutor-text');
const tutorNext = document.getElementById('tutor-next');
const tutorBox = document.getElementById('tutor-dialogue-box');

let isTyping = false;
let currentDialogue = [];
let dialogueIndex = 0;
let typeSpeed = 35; // Velocidade da "digitação" (em ms)

// 1. INICIA A SEQUÊNCIA DE BOOT
function startTutorialBoot() {
    tutorialOverlay.classList.remove('hidden');
    tutorialLoading.style.display = 'flex';
    tutorialScene.classList.add('hidden');
    tutorialScene.style.opacity = '0';

    // Fica 3 segundos na tela "INICIALIZANDO SIMULAÇÃO_"
    setTimeout(() => {
        tutorialLoading.style.display = 'none';
        tutorialScene.classList.remove('hidden');
        
        // Timeout minúsculo só pro CSS registrar o display block antes de mudar a opacidade
        setTimeout(() => {
            tutorialScene.style.opacity = '1'; // Inicia o Fade-in da figura cinza
        }, 100);

        // Espera o fade-in terminar (4s) para o bicho começar a falar
        setTimeout(() => {
            startDialogue([
                "SISTEMA INICIADO.",
                "Olá. Eu sou a sua unidade de assistência de debug.",
                "Identifiquei que você foi escalado para validar o Geometry OS.",
                "Não se preocupe, eu guiarei você pelos protocolos básicos de sobreviv... digo, de teste."
            ]);
        }, 4500);

    }, 3000);
}

// 2. SISTEMA DE MÁQUINA DE ESCREVER
function startDialogue(lines) {
    currentDialogue = lines;
    dialogueIndex = 0;
    showLine();
}

function showLine() {
    if (dialogueIndex >= currentDialogue.length) {
        console.log("Diálogo terminou. Liberando jogador...");
        tutorialOverlay.classList.add('hidden');
        // AQUI NÓS VAMOS INICIAR A GAMEPLAY DO TUTORIAL DEPOIS
        return;
    }

    isTyping = true;
    tutorText.innerHTML = '';
    tutorNext.classList.add('hidden');
    let text = currentDialogue[dialogueIndex];
    let i = 0;

    function typeWriter() {
        if (isTyping && i < text.length) {
            tutorText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else if (isTyping) {
            // Terminou de digitar a frase
            isTyping = false;
            tutorNext.classList.remove('hidden'); 
        }
    }
    typeWriter();
}

// 3. CLIQUE PARA AVANÇAR OU PULAR O TEXTO
tutorBox.addEventListener('click', () => {
    if (isTyping) {
        // Se ainda está digitando, clicar faz o texto aparecer inteiro de uma vez (Skip)
        isTyping = false;
        tutorText.innerHTML = currentDialogue[dialogueIndex];
        tutorNext.classList.remove('hidden');
    } else {
        // Se já terminou de digitar, clicar passa para a próxima frase
        dialogueIndex++;
        showLine();
    }
});