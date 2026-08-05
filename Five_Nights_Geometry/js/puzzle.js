// ==========================================
// SISTEMA DO PUZZLE DE CIRCUITO
// ==========================================

const GATES = {
    AND:  (a, b) => (a && b) ? 1 : 0,
    OR:   (a, b) => (a || b) ? 1 : 0,
    XOR:  (a, b) => (a ^ b) & 1,
    NAND: (a, b) => (a && b) ? 0 : 1,
    NOR:  (a, b) => (a || b) ? 0 : 1,
    XNOR: (a, b) => ((a ^ b) & 1) ? 0 : 1,
};

let puzzleAnswer = null;

function openPuzzle() {
    const names = Object.keys(GATES);
    puzzleAnswer = names[Math.floor(Math.random() * names.length)];
    renderPuzzle();
    document.getElementById('puzzle-overlay').classList.remove('hidden');
}

function renderPuzzle() {
    const table = document.getElementById('puzzle-truth-table');
    const fn = GATES[puzzleAnswer];
    let rows = '<tr><th>A</th><th>B</th><th>OUT</th></tr>';
    for (const a of [0, 1]) {
        for (const b of [0, 1]) {
            rows += `<tr><td>${a}</td><td>${b}</td><td>${fn(a, b)}</td></tr>`;
        }
    }
    table.innerHTML = rows;

    const gates = document.getElementById('puzzle-gates');
    gates.innerHTML = '';
    const shuffled = Object.keys(GATES).slice().sort(() => Math.random() - 0.5);
    shuffled.forEach(g => {
        const btn = document.createElement('button');
        btn.className = 'gate-btn';
        btn.innerText = `${g}(a, b)`;
        btn.addEventListener('click', () => puzzleCheck(g));
        gates.appendChild(btn);
    });

    const fb = document.getElementById('puzzle-feedback');
    fb.innerText = '';
    fb.className = 'puzzle-footer';
}

function puzzleCheck(choice) {
    const fb = document.getElementById('puzzle-feedback');
    if (choice === puzzleAnswer) {
        fb.innerText = `[OK] ${choice} bate com a tabela. +1 camada de Firewall.`;
        fb.className = 'puzzle-footer ok';
        firewallLayers = Math.min(HEXAGON_CONFIG.maxLayers, firewallLayers + 1);
        
        if (typeof renderFirewallUI === 'function') renderFirewallUI();
        
        setTimeout(closePuzzle, 1200);
    } else {
        fb.innerText = `[ERR] ${choice} não bate. Punição: -5% energia. Tente novamente.`;
        fb.className = 'puzzle-footer err';
        if (typeof power !== 'undefined') {
            power = Math.max(0, power - 5);
            if (typeof updateDisplays === 'function') updateDisplays();
        }
        setTimeout(renderPuzzle, 1400);
    }
}

function closePuzzle() {
    document.getElementById('puzzle-overlay').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('puzzle-close').addEventListener('click', closePuzzle);
});