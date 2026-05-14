// ==========================================
// SISTEMA DO MANUAL (NOTEBOOK)
// ==========================================

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

// Botões do Notebook
document.addEventListener('DOMContentLoaded', () => {
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
});