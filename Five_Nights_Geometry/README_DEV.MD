# 🟪 FIVE NIGHTS AT GEOMETRY - DEV ROADMAP & GDD

## 📖 A Lore do Jogo (O Contexto)
Você é um programador desenvolvendo o software, o sistema de segurança e as IAs para uma futura pizzaria. Porém, as IAs saíram do controle e te trancaram dentro do próprio ambiente de simulação. O seu objetivo é sobreviver **11 noites** nesse pesadelo digital, precisando hackear, consertar e modificar o código do sistema "ao vivo" pelo Terminal para se defender das formas geométricas que você mesmo criou.

---

## ✅ FASE 1: Fundação e Estrutura (CONCLUÍDO)
- [x] **Menu Principal:** Tela inicial com arte (formas normais), botões funcionais e overlay de estática.
- [x] **Sistema de Glitch (Menu):** Gerador de números aleatórios (RNG) que corrompe o fundo para uma versão dark/roxa da tela de forma autônoma.
- [x] **Layout do Escritório (Whitebox):** Sala montada em wireframe contendo mesa, relógio, bateria e portas.
- [x] **Game Loop Básico:** Relógio rodando (12 AM às 6 AM) e sistema de Game Over/Vitória configurável.
- [x] **Sistema de Energia:** Bateria drenando em 1% por segundo (dreno passivo).
- [x] **Sistema de Portas Físicas:** Botões que fecham a porta esquerda/direita e dobram o gasto de bateria para 2%/seg.
- [x] **IA Básica (Inimigos Físicos):** - [x] **Quadrado Azul:** Máquina de estados. Ataca pela Esquerda.
  - [x] **Triângulo Vermelho:** Máquina de estados. Ataca pela Direita.

---

## ✅ FASE 2: Inimigos Hackers e Minigames (CONCLUÍDO)

### 🟡 Círculo Amarelo (O Vírus de Câmera)
*Mecânica: Destrói as câmeras do radar de forma permanente durante a noite.*
- [x] Lógica Matemática: Arrays de "Palavras Normais" e "Palavras de Erro" embaralhadas.
- [x] Interface do Minigame: Tela com efeito Matrix no terminal.
- [x] Ação do Jogador: Clicar na anomalia para evitar a destruição do Node de Vídeo (Câmera).

### 🔷 Hexágono Ciano (O Vírus de Firewall)
*Mecânica: Quebra camadas de Firewall e corrompe sistemas (câmeras, portas, energia, relógio).*
- [x] **O Manual (Notebook):** Overlay paginado clicável na mesa com a lista "Sistema Corrompido → Comando de Reparo".
- [x] **Terminal de Comandos:** Tela interativa que aceita comandos (`fix camera`, `unjam door_left`, `sync clock`, `seal power_leak`).
- [x] **Puzzle de Circuito Lógico:** Mini-game de portas lógicas (AND, OR, XOR) acessado pelo comando `restore_firewall` para recuperar camadas de defesa.

---

## 🚧 FASE 3: Radar Digital e Protocolos de Energia (EM ANDAMENTO)

### 🛰️ Sistema de Radar (Global Node Map)
- [x] Interface HUD: Tablet tela cheia com opacidade sólida e placeholders laterais, imune ao Jumpscare de luz.
- [x] Efeito Visual: Nevasca/Chiado animado no fundo do tablet.
- [x] Mecânica de Ping: Botão que emite um pulso e avalia o mapa inteiro.
- [x] Detecção de Anomalias: Sistema lê a posição das IAs, aplica o CSS `ping-active` e informa quantas anomalias foram detectadas no visor.
- [ ] **Sistema de Sonar 3D (Apenas a partir da Noite 6):** O Ping dará um *flash* visual mostrando uma renderização 3D/Wireframe da sala em P&B com a silhueta da criatura.

### ⚡ Protocolos de Energia e Blackout
- [x] **Protocolo de Blackout:** Quando a energia zera, luzes dão *fade-out*, botões físicos travam e portas escancaram.
- [x] **Bateria de Emergência:** O tablet de câmeras sobrevive no escuro por exatos 15 segundos antes de morrer completamente. O relógio continua rodando em background.
- [ ] **Comando de Override de Energia:**
  - Comando: `Reset Energy Generator Protocol` (digitado no Terminal).
  - Função: Restaura a bateria instantaneamente para **50%**. 
  - *Risco/Compensação: Se usado quando a energia estiver acima de 50%, a bateria cai para 50%, punindo o jogador por desespero antecipado.*

---

## 🎯 FASE 4: Polimento e Finalização (A FAZER)
- [ ] **Polimento Audiovisual:** Sons de portas fechando, cliques no terminal, alarmes de sistema e estática.
- [ ] **Jumpscares:** Telas de Game Over com as IAs.
- [ ] **Progressão:** Balanceamento da dificuldade progressiva da Noite 1 à 11.