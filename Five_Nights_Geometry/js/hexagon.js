// ==========================================
// IA DO HEXÁGONO CIANO (Vírus de Firewall)
// ==========================================

const HEXAGON_CONFIG = {
    maxLayers: 5,
    tickMs: 20000,
    attackThreshold: 70,
};

const BROKEN_SYSTEMS = [
    'camera_offline', 'door_left_jammed', 'door_right_jammed', 'clock_glitch', 'power_leak',
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

// ============ LÓGICA DA IA ============
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
    if (typeof terminalEcho === 'function') terminalEcho(`[ALERT] ${sys} corrupted by HEXAGON`, 'line-err');
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

// ============ SISTEMAS DE INTERFERÊNCIA ============
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

function gameOverHexagon() {
    if (hexagonInterval) clearInterval(hexagonInterval);
    if (typeof clockInterval !== 'undefined') clearInterval(clockInterval);
    if (typeof powerInterval !== 'undefined') clearInterval(powerInterval);
    stopClockGlitch();
    alert('JUMPSCARE: O HEXÁGONO CIANO ATRAVESSOU O FIREWALL!');
}