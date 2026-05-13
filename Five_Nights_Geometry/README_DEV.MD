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

## 🚧 FASE 2: Inimigos Hackers e Minigames (EM ANDAMENTO)

### 🟡 Círculo Amarelo (O Vírus de Câmera)
*Mecânica: Derruba o tablet de câmeras, deixando o jogador cego.*
- [x] Lógica Matemática: Criar os arrays de "Palavras Normais" e "Palavras de Erro", pescando 8 normais e 1 corrompida e embaralhando tudo. (`minigame.js`)
- [ ] Interface do Minigame: Criar a tela preta com as palavras jogadas na tela (efeito verde Matrix).
- [ ] Ação do Jogador: Encontrar e clicar na "Palavra Corrompida" (Ex: *Banana_Core*) no meio das técnicas (Ex: *System_Boot*) para restaurar a visão.

### 🔷 Hexágono Ciano (O Vírus de Sistema)
*Mecânica: Preso em um container virtual com 5 "Salva Guardas" (Bypasses). Ele tenta fugir constantemente.*
- [ ] Lógica de Fuga (RNG a cada 10s):
  - **0 a 89:** Contido (Nada acontece).
  - **90 a 149:** Quebra 1 dos 5 Bypasses.
  - **150:** Ataque Crítico! (Alerta vermelho na tela dando poucos segundos para o jogador reagir).
- [ ] Terminal de Manutenção (Tela Fullscreen): O jogador precisa abrir o terminal para consertar o sistema.
- [ ] Comandos do Terminal:
  - `restore_bypass`: Conserta os bloqueios perdidos.
  - `Restart Security System`: Prende o Hexágono novamente. Demora 5 segundos (tela apaga/reinicia, e o som de boot atrai a IA de volta pro container).
  - `Override Security Bypass` **(Botão de Pânico)**: Cancela o Ataque Crítico (150). **Punição:** Dá um choque no gerador perdendo de 3% a 5% de energia instantaneamente E avança o Quadrado e o Triângulo uma casa em direção à porta!

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