// ==========================================
// SISTEMA DO TERMINAL HACKER
// ==========================================

function openTerminal() {
    document.getElementById('terminal-overlay').classList.remove('hidden');
    setTimeout(() => document.getElementById('terminal-input').focus(), 50);

    const out = document.getElementById('terminal-output');
    if (out.innerHTML === '') {
        terminalEcho("GEOMETRY OS v1.0 ONLINE...", "line-ok");
        terminalEcho("Sistemas estabilizados. Aguardando comando.", "line-info");
    }
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
        if (typeof openPuzzle === 'function') openPuzzle();
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

// Botões e Atalhos do Terminal
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('terminal-object').addEventListener('click', openTerminal);
    document.getElementById('terminal-close').addEventListener('click', closeTerminal);
    document.getElementById('terminal-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const v = e.target.value;
            e.target.value = '';
            terminalSubmit(v);
        }
    });

    // Atalhos Globais de Teclado
    document.addEventListener('keydown', e => {
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT') return;
        if (e.key === 't' || e.key === 'T') {
            const term = document.getElementById('terminal-overlay');
            if (term.classList.contains('hidden')) openTerminal();
        }
        if (e.key === 'Escape') {
            closeTerminal();
            if (typeof closeNotebook === 'function') closeNotebook();
            if (typeof closePuzzle === 'function') closePuzzle();
        }
    });
});