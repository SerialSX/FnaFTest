# 🟪 FIVE NIGHTS AT GEOMETRY - DEV ROADMAP & GDD

## 📖 A Lore do Jogo (O Contexto)
Você é um programador desenvolvendo o software, o sistema de segurança e as IAs para uma futura pizzaria. Porém, as IAs saíram do controle e te trancaram dentro do próprio ambiente de simulação. O seu objetivo é sobreviver **11 noites** nesse pesadelo digital, precisando hackear, consertar e modificar o código do sistema "ao vivo" pelo Terminal para se defender das formas geométricas que você mesmo criou.

---

## ✅ FASE 1: Fundação e Estrutura (CONCLUÍDO)
- [x] **Menu Principal:** Tela inicial com arte (formas normais), botões funcionais e overlay de estática.
- [x] **Sistema de Glitch (Menu):** Gerador de números aleatórios (RNG) que corrompe o fundo para uma versão dark/roxa da tela de forma autônoma.
- [x] **Layout do Escritório (Whitebox):** Sala montada em wireframe (tracejados) contendo mesa, relógio, bateria e portas.
- [x] **Game Loop Básico:** Relógio rodando (12 AM às 6 AM) e sistema de Game Over/Vitória.
- [x] **Sistema de Energia:** Bateria drenando em 1% por segundo (dreno passivo).
- [x] **Sistema de Portas Físicas:** Botões que fecham a porta esquerda/direita (alterando o visual do CSS para linha contínua vermelha) e dobram o gasto de bateria para 2%/seg.
- [x] **IA Básica (Inimigos Físicos):** - [x] **Quadrado Azul:** Máquina de estados. Ataca pela Esquerda.
  - [x] **Triângulo Vermelho:** Máquina de estados. Ataca pela Direita.
  - *Nota: Eles possuem timers independentes e testam se as portas estão fechadas antes de dar o Jumpscare.*

---

## ✅ FASE 2: Inimigos Hackers e Minigames (CONCLUÍDO)

### 🟡 Círculo Amarelo (O Vírus de Câmera)
*Mecânica: Derruba o tablet de câmeras, deixando o jogador cego.*
- [x] Lógica Matemática: Criar os arrays de "Palavras Normais" e "Palavras de Erro", pescando 8 normais e 1 corrompida e embaralhando tudo.
- [x] Interface do Minigame: Criar a tela com as palavras jogadas na tela (efeito verde Matrix com z-index corrigido e overlays).
- [x] Ação do Jogador: Encontrar e clicar na "Palavra Corrompida" no meio das técnicas para restaurar a visão/evitar punição.

### 🔷 Hexágono Ciano (O Vírus de Firewall)
*Mecânica: Vírus tentando atravessar 5 camadas de Firewall/Antivirus. A cada camada quebrada, um sistema do escritório falha. O jogador conserta os sistemas e restaura as camadas em paralelo.*

- [x] **Estado do Firewall:** 5 camadas com renderização na HUD.
- [x] **IA do Hexágono:** RNG configurado para quebrar camadas e corromper sistemas aleatórios.
- [x] **Sistemas Corrompidos:** Câmeras off, portas travadas, relógio com glitch e vazamento de energia implementados.
- [x] **O Manual:** Overlay físico na mesa com paginação e lista de códigos.
- [x] **Terminal:** Tela interativa que aceita comandos (`fix camera`, `unjam door`, etc) e reflete os reparos no jogo.
- [x] **Puzzle de Circuito Lógico:** Mini-game de portas lógicas (AND, OR, etc) para restaurar as camadas do Firewall funcionando.

- [ ] **O Manual (Notebook físico na mesa):**
  - Objeto clicável na mesa do escritório (parece um caderno de papel).
  - Abre overlay paginado com a lista "Sistema Corrompido → Comando de Reparo".
  - O jogador precisa **ler** o manual para descobrir qual comando digitar no terminal (não há atalho/UI mostrando).

- [ ] **Terminal (Tela fullscreen):**
  - Aberto pelo jogador (botão ou tecla `T`).
  - Comandos de reparo de sistema: ex. `fix camera`, `unjam door_left`, `sync clock`, `seal power_leak`.
  - Comando de restauração: `restore_firewall` → abre o Puzzle de Circuito.

- [x] **Puzzle de Circuito Lógico (restaurar 1 camada):**
  - Mostra uma tabela-verdade alvo (2 entradas A, B → coluna de saída).
  - Mostra opções de portas lógicas: `AND`, `OR`, `XOR`, `NAND`, `NOR`, `XNOR`.
  - O jogador clica a porta que produz a saída alvo.
  - **Acerto:** +1 camada de Firewall.
  - **Erro:** Punição (perde energia / avança Quadrado e Triângulo uma casa).

---

## 📡 FASE 3: Radar Digital e Protocolos de Energia (A FAZER)

### 🛰️ Sistema de Radar (Visão 2D)
- [ ] Conceito: No mundo digital, a visão é um radar de cima (Top-down) ao invés de imagens 3D estáticas.
- [ ] Mecânica de Ping: O sistema manda um sinal periódico ao ativar a câmera.
- [ ] Delay de Processamento: Mensagem *"Signal Received, assembling ping..."* (espera de 1 ou 2 segundos) antes de revelar a forma geométrica na localização (Ex: *"Triangle is here"*).

### ⚡ Protocolo de Reset de Energia
- [ ] Comando: `Reset Energy Generator Protocol` (digitado no Terminal).
- [ ] Função: Restaura a bateria instantaneamente para **50%**. 
- *Risco/Compensação: Se usado quando a energia estiver acima de 50%, a bateria cai para 50%, punindo o jogador por desespero antecipado.*

---

## 🎯 FASE 4: Polimento e Finalização (A FAZER)
- [ ] **Polimento Audiovisual:** Sons de portas fechando, cliques no terminal, alarmes de sistema e estática.
- [ ] **Jumpscares:** Telas de Game Over com as IAs.
- [ ] **Progressão:** Balanceamento da dificuldade progressiva da Noite 1 à 11.