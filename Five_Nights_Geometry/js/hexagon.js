// ==========================================
// HEXÁGONO CIANO — Vírus de Firewall
// Camadas, sistemas corrompidos, manual, terminal, puzzle.
// ==========================================

const HEXAGON_CONFIG = {
    maxLayers: 5,
    tickMs: 12000,
    attackThreshold: 70,
};

const BROKEN_SYSTEMS = [
    'camera_offline',
    'door_left_jammed',
    'door_right_jammed',
    'clock_glitch',
    'power_leak',
];

const REPAIR_CODES = [
    { system: 'camera_offline',    command: 'fix camera',      desc: 'Recompila o feed da câmera principal.' },
    { system: 'door_left_jammed',  command: 'unjam door_left', desc: 'Libera o motor travado da porta esquerda.' },
    { system: 'door_right_jammed', command: 'unjam door_right',desc: 'Libera o motor travado da porta direita.' },
    { system: 'clock_glitch',      command: 'sync clock',      desc: 'Ressincroniza o cronômetro do sistema.' },
    { system: 'power_leak',        command: 'seal power_leak', desc: 'Fecha o vazamento no gerador.' },
];

let firewallLayers = HEXAGON_CONFIG.maxLayers;
const brokenSystems = new Set();
let hexagonInterval = null;
let clockGlitchInterval = null;

window.isPowerLeaking = false;

// ============ AI ============
function startHexagonAI() {
    firewallLayers = HEXAGON_CONFIG.maxLayers;
    brokenSystems.clear();
    window.isPowerLeaking = false;
    renderFirewallUI();
    renderBrokenSystems();
    if (hexagonInterval) clearInterval(hexagonInterval);
    hexagonInterval = setInterval(hexagonTick, HEXAGON_CONFIG.tickMs);
}

function hexagonTick() {
    const rng = Math.floor(Math.random() * 100) + 1;
    if (rng > HEXAGON_CONFIG.attackThreshold) {
        breakLayer();
    }
}

function breakLayer() {
    if (firewallLayers <= 0) return;
    firewallLayers--;
    const available = BROKEN_SYSTEMS.filter(s => !brokenSystems.has(s));
    if (available.length > 0) {
        const target = available[Math.floor(Math.random() * available.length)];
        applyBrokenSystem(target);
    }
    renderFirewallUI();
    if (firewallLayers <= 0) {
        gameOverHexagon();
    }
}

function applyBrokenSystem(sys) {
    brokenSystems.add(sys);
    switch (sys) {
        case 'camera_offline':
            document.getElementById('btn-cameras').disabled = true;
            break;
        case 'door_left_jammed':
            document.getElementById('btn-door-left').disabled = true;
            break;
        case 'door_right_jammed':
            document.getElementById('btn-door-right').disabled = true;
            break;
        case 'clock_glitch':
            startClockGlitch();
            break;
        case 'power_leak':
            window.isPowerLeaking = true;
            break;
    }
    renderBrokenSystems();
    terminalEcho(`[ALERT] ${sys} corrupted by HEXAGON`, 'line-err');
}

function repairSystem(sys) {
    if (!brokenSystems.has(sys)) return false;
    brokenSystems.delete(sys);
    switch (sys) {
        case 'camera_offline':
            document.getElementById('btn-cameras').disabled = false;
            break;
        case 'door_left_jammed':
            document.getElementById('btn-door-left').disabled = false;
            break;
        case 'door_right_jammed':
            document.getElementById('btn-door-right').disabled = false;
            break;
        case 'clock_glitch':
            stopClockGlitch();
            break;
        case 'power_leak':
            window.isPowerLeaking = false;
            break;
    }
    renderBrokenSystems();
    return true;
}

function startClockGlitch() {
    if (clockGlitchInterval) return;
    const clock = document.getElementById('clock');
    clockGlitchInterval = setInterval(() => {
        const chars = '!@#$%^&*?<>/\\|';
        let g = '';
        for (let i = 0; i < 8; i++) g += chars[Math.floor(Math.random() * chars.length)];
        clock.innerText = g;
    }, 180);
}

function stopClockGlitch() {
    if (!clockGlitchInterval) return;
    clearInterval(clockGlitchInterval);
    clockGlitchInterval = null;
    if (typeof updateDisplays === 'function') updateDisplays();
}

// ============ HUD ============
function renderFirewallUI() {
    const el = document.getElementById('firewall-layers');
    if (!el) return;
    el.innerText = '▮'.repeat(firewallLayers) + '▯'.repeat(HEXAGON_CONFIG.maxLayers - firewallLayers);
    el.classList.remove('warning', 'critical');
    if (firewallLayers <= 1) el.classList.add('critical');
    else if (firewallLayers <= 2) el.classList.add('warning');
}

function renderBrokenSystems() {
    const el = document.getElementById('broken-systems-ui');
    if (!el) return;
    el.innerHTML = '';
    brokenSystems.forEach(sys => {
        const div = document.createElement('div');
        div.className = 'broken-line';
        div.innerText = `[!] ${sys}`;
        el.appendChild(div);
    });
}

// ============ NOTEBOOK ============
const NOTEBOOK_PAGES = [
    {
        title: 'PROCEDIMENTOS DE EMERGÊNCIA',
        intro: 'Se algum sistema for corrompido pelo vírus, abra o TERMINAL e digite o comando exato da página correspondente. Comandos só funcionam enquanto o sistema estiver corrompido.',
        entries: [],
    },
    {
        title: 'CÓDIGOS DE REPARO — I',
        entries: REPAIR_CODES.slice(0, 3),
    },
    {
        title: 'CÓDIGOS DE REPARO — II',
        entries: REPAIR_CODES.slice(3),
    },
    {
        title: 'FIREWALL — RESTAURAÇÃO',
        intro: 'Para subir +1 camada de Firewall, digite o comando abaixo no Terminal e resolva o circuito lógico exibido.',
        entries: [
            { system: 'restore_firewall', command: 'restore_firewall', desc: 'Abre o painel de circuito lógico.' },
        ],
    },
];

let notebookPage = 0;

function openNotebook() {
    notebookPage = 0;
    renderNotebookPage();
    document.getElementById('notebook-overlay').classList.remove('hidden');
}

function closeNotebook() {
    document.getElementById('notebook-overlay').classList.add('hidden');
}

function renderNotebookPage() {
    const page = NOTEBOOK_PAGES[notebookPage];
    const root = document.getElementById('notebook-page');
    let html = `<h2>${page.title}</h2>`;
    if (page.intro) html += `<p style="margin-bottom:14px;">${page.intro}</p>`;
    page.entries.forEach(e => {
        html += `<div class="entry">
            <span class="entry-sys">${e.system}</span>
            <span class="entry-cmd">${e.command}</span>
            <div>${e.desc}</div>
        </div>`;
    });
    root.innerHTML = html;
    document.getElementById('notebook-pageinfo').innerText = `${notebookPage + 1} / ${NOTEBOOK_PAGES.length}`;
    document.getElementById('notebook-prev').disabled = notebookPage === 0;
    document.getElementById('notebook-next').disabled = notebookPage === NOTEBOOK_PAGES.length - 1;
}

// ============ TERMINAL ============
function openTerminal() {
    document.getElementById('terminal-overlay').classList.remove('hidden');
    setTimeout(() => document.getElementById('terminal-input').focus(), 50);
}

function closeTerminal() {
    document.getElementById('terminal-overlay').classList.add('hidden');
}

function terminalEcho(text, cls = 'line-ok') {
    const out = document.getElementById('terminal-output');
    if (!out) return;
    const line = document.createElement('div');
    line.className = cls;
    line.innerText = text;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
}

function terminalSubmit(raw) {
    const input = (raw || '').trim().toLowerCase();
    if (!input) return;
    terminalEcho(`root@office:~$ ${input}`, 'line-echo');

    if (input === 'help') {
        terminalEcho('Available: help, status, fix camera, unjam door_left, unjam door_right, sync clock, seal power_leak, restore_firewall, clear', 'line-info');
        return;
    }
    if (input === 'clear') {
        document.getElementById('terminal-output').innerHTML = '';
        return;
    }
    if (input === 'status') {
        terminalEcho(`Firewall: ${firewallLayers}/${HEXAGON_CONFIG.maxLayers}`, 'line-info');
        if (brokenSystems.size === 0) {
            terminalEcho('Systems: ALL OK', 'line-ok');
        } else {
            brokenSystems.forEach(s => terminalEcho(`  [!] ${s}`, 'line-err'));
        }
        return;
    }
    if (input === 'restore_firewall') {
        if (firewallLayers >= HEXAGON_CONFIG.maxLayers) {
            terminalEcho('Firewall already at maximum.', 'line-info');
            return;
        }
        terminalEcho('Opening logic-gate repair console...', 'line-ok');
        openPuzzle();
        return;
    }

    const match = REPAIR_CODES.find(c => c.command === input);
    if (match) {
        if (repairSystem(match.system)) {
            terminalEcho(`[OK] ${match.system} restored.`, 'line-ok');
        } else {
            terminalEcho(`[WARN] ${match.system} is not currently corrupted.`, 'line-info');
        }
        return;
    }

    terminalEcho(`command not found: ${input}`, 'line-err');
}

// ============ PUZZLE ============
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
        renderFirewallUI();
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

// ============ GAME OVER ============
function gameOverHexagon() {
    if (hexagonInterval) clearInterval(hexagonInterval);
    if (typeof clockInterval !== 'undefined') clearInterval(clockInterval);
    if (typeof powerInterval !== 'undefined') clearInterval(powerInterval);
    stopClockGlitch();
    alert('JUMPSCARE: O HEXÁGONO CIANO ATRAVESSOU O FIREWALL!');
}

// ============ BINDINGS ============
function initHexagonBindings() {
    document.getElementById('notebook-object').addEventListener('click', openNotebook);
    document.getElementById('notebook-close').addEventListener('click', closeNotebook);
    document.getElementById('notebook-prev').addEventListener('click', () => {
        notebookPage = Math.max(0, notebookPage - 1);
        renderNotebookPage();
    });
    document.getElementById('notebook-next').addEventListener('click', () => {
        notebookPage = Math.min(NOTEBOOK_PAGES.length - 1, notebookPage + 1);
        renderNotebookPage();
    });

    document.getElementById('terminal-object').addEventListener('click', openTerminal);
    document.getElementById('terminal-close').addEventListener('click', closeTerminal);
    document.getElementById('terminal-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const v = e.target.value;
            e.target.value = '';
            terminalSubmit(v);
        }
    });

    document.getElementById('puzzle-close').addEventListener('click', closePuzzle);

    document.addEventListener('keydown', e => {
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT') return;
        if (e.key === 't' || e.key === 'T') {
            const term = document.getElementById('terminal-overlay');
            if (term.classList.contains('hidden')) openTerminal();
        }
        if (e.key === 'Escape') {
            closeTerminal();
            closeNotebook();
            closePuzzle();
        }
    });
}

document.addEventListener('DOMContentLoaded', initHexagonBindings);
