# 📖 MANUAL DE SOBREVIVÊNCIA E TUTORIAL DE MECÂNICAS
## 🟪 FIVE NIGHTS AT GEOMETRY — DOCUMENTO AUXILIAR DE DESENVOLVIMENTO

Bem-vindo ao guia de contenção do sistema de segurança. Quando o ambiente de simulação entra em colapso, entender a lógica matemática por trás de cada ameaça geométrica é a única diferença entre alcançar as 6:00 AM ou sofrer uma falha crítica generalizada.

Abaixo está o detalhamento completo de como cada Inteligência Artificial opera, as falhas de sistema associadas e os protocolos exatos de defesa.

---

## 🗺️ 1. O SISTEMA DE RADAR (GLOBAL NODE MAP)

A visão convencional por câmeras foi substituída por um **Painel de Varredura de Nós de Rede**.
* **Como Funciona:** Ao abrir o Tablet, o jogador visualiza um mapa de topologia de rede analógica com efeito de estática de fundo.
* **O Ping Global:** Clicar em **"EMITIR PING RADAR GLOBAL"** envia um pulso de rastreamento que demora alguns segundos para processar. O monitor de status indicará a quantidade de anomalias detectadas, e os botões das câmeras onde os inimigos físicos estão localizados piscarão em vermelho crítico (`ping-active`).
* **Vulnerabilidade:** Manter o Tablet aberto impede que você visualize o escritório principal, deixando-o completamente vulnerável a ataques diretos e impossibilitado de fechar as portas físicas.

---

## 👤 2. OS INIMIGOS FÍSICOS (AGRESSORES DE CORREDOR)

Estes inimigos movem-se fisicamente pelas instalações virtuais da rede e tentam invadir diretamente o escritório do programador. Eles operam em uma máquina de estados baseada em testes aleatórios periódicos (RNG).

### 🔷 QUADRADO AZUL (Ameaça da Esquerda)
* **Padrão de Movimentação:** Inicia no Palco Principal (Posição 1), move-se para o Corredor Esquerdo (Posição 2 / Monitorado pela **CAM 2**), avança para a Soleira da Porta Esquerda (Posição 3) e, finalmente, invade o Escritório (Posição 4 - Game Over).
* **Frequência de Checagem:** Avalia seu movimento a cada **4 segundos**. Caso o número sorteado (1 a 20) seja menor ou igual ao seu nível de IA (`squareAiLevel`), ele avança um passo.
* **Como Neutralizar:** Quando o radar acusar que o Quadrado Azul atingiu a Posição 3 (Porta Esquerda), o jogador deve fechar imediatamente a Porta Esquerda. Se a porta estiver fechada no momento da próxima checagem, ele colidirá contra o escudo magnético e será forçado a recuar de volta para o Palco Principal (Posição 1).

### 🔺 TRIÂNGULO VERMELHO (Ameaça da Direita)
* **Padrão de Movimentação:** Segue a mesma lógica estrutural do Quadrado, mas espelhado na ala oposta. Vai do Palco (Posição 1) para o Corredor Direito (Posição 2 / Monitorado pela **CAM 3**), avança para a Soleira da Porta Direita (Posição 3) e invade o Escritório (Posição 4 - Game Over).
* **Frequência de Checagem:** Avalia seu movimento a cada **7 segundos**, agindo de forma assíncrona em relação ao Quadrado.
* **Como Neutralizar:** Ao detectá-lo na Porta Direita através do pulso do radar, feche imediatamente a Porta Direita. Na próxima checagem dele, se a porta estiver selada, o Triângulo colidirá e retornará imediatamente ao Palco Principal.

---

## 🖥️ 3. OS INIMIGOS HACKERS (VÍRUS DE CÓDIGO)

Estes inimigos não entram pela porta, mas corrompem os scripts internos do sistema operacional, desativando suas defesas e forçando o jogador a interagir com o Terminal e o Manual.

### 🟡 CÍRCULO AMARELO (O Vírus de Câmera)
* **Modo de Ataque:** Opera silenciosamente a cada **10 segundos**. Se passar no teste de probabilidade (RNG), ele ataca se a tela de erro e o terminal já não estiverem visíveis, disparando o alerta de vírus.
* **A Mecânica de Defesa (Minigame de Sintaxe):** O jogador deve clicar em "Open Terminal" para abrir o terminal seguro. O sistema compilará uma lista de 9 strings na tela (8 palavras normais de sistema e 1 palavra corrompida). 
* **O Contra-ataque:** O jogador precisa analisar a lista e **clicar na palavra infectada** (termos anômalos que fogem do vocabulário padrão do sistema de segurança).
  * **Se acertar:** O vírus é expurgado e os sistemas voltam ao normal.
  * **Se errar:** O vírus destrói permanentemente um dos nós de vídeo na ordem de prioridade estabelecida (Palco 1 → Fundos 4 → Corredor Esq 2 → Corredor Dir 3). O botão da câmera no radar exibirá permanentemente o aviso **"DEAD"**, deixando o jogador cego naquela área pelo resto da noite.

### 💠 HEXÁGONO CIANO (O Infiltrador de Firewall)
* **Modo de Ataque:** Varre as defesas da rede a cada **20 segundos**. Se for bem-sucedido, ele rompe **1 das 5 camadas protetoras do Firewall**.
* **Efeito Colateral (Corrupção de Sistemas):** Toda vez que uma camada é rompida, o Hexágono corrompe aleatoriamente um sistema vital do escritório, adicionando um dreno ou uma trava física:
  1. `camera_offline`: Desativa o botão físico das câmeras, impedindo a abertura do tablet.
  2. `door_left_jammed`: Trava o botão da porta esquerda, impedindo que ela seja alterada.
  3. `door_right_jammed`: Trava o botão da porta direita, impedindo que ela seja alterada.
  4. `clock_glitch`: Altera o código visual do relógio para caracteres especiais ilegíveis, impedindo que o jogador saiba as horas.
  5. `power_leak`: Rompe os selos do gerador principal, gerando um dreno passivo extra de energia.
* **Como Neutralizar (Protocolo de Reparo de Duas Etapas):**
  1. **Consertar o Sistema Afetado:** O jogador deve consultar o Manual físico (Notebook) na mesa para ler o comando exato de reparo, abrir o Terminal de Linha de Comando e digitar:
     * `fix camera` — Restaura o feed das câmeras.
     * `unjam door_left` — Libera o motor travado da porta esquerda.
     * `unjam door_right` — Libera o motor travado da porta direita.
     * `sync clock` — Ressincroniza o cronômetro do sistema.
     * `seal power_leak` — Fecha o vazamento de energia do gerador.
  2. **Recuperar a Camada do Firewall:** O sistema danificado voltará a funcionar, mas o Firewall continuará exposto. O jogador deve digitar `restore_firewall` no terminal para abrir o **Painel de Circuito Lógico**. O minigame gerará uma Tabela Verdade aleatória com duas entradas (A, B) e uma Saída. O jogador deve analisar e selecionar a porta lógica correta (`AND`, `OR`, `XOR`, `NAND`, `NOR`, `XNOR`) que gera aquela saída exata.
     * **Acerto:** Recupera +1 camada protetora do Firewall.
     * **Erro:** Pune o jogador removendo 5% de energia da bateria principal instantaneamente.

---

## ⚡ 4. GESTÃO DE ENERGIA E O PROTOCOLO DE BLACKOUT

A energia do jogo é o recurso mais escasso e dita o ritmo da sobrevivência.

* **Consumo Passivo e Ativo:** A bateria sofre um dreno natural a cada período configurado. Fechar a porta esquerda acrescenta dreno ativo, fechar a direita acrescenta mais dreno, e sofrer um vazamento de energia (`power_leak`) pelo Hexágono acumula ainda mais consumo na bateria.
* **O Apagão (0% de Bateria):** Quando a barra de energia zera, a energia da rede elétrica da parede cai inteira. As portas perdem a atração magnética e se **escancaram automaticamente**, deixando o escritório totalmente exposto. As luzes do escritório sofrem um *fade-out* lento até o breu completo, e os botões físicos da porta e o terminal param de responder. O relógio continua rodando em background no escuro, permitindo que a noite seja ganha na sorte.
* **A Bateria Reserva do Tablet:** O Tablet possui uma bateria interna independente que garante **exatos 15 segundos de sobrevida no escuro**. Após os 15 segundos, o tablet desliga e a escuridão é total.
* **O Comando Hacker de Salvação (Override):** Durante os 15 segundos de escuridão total, a única salvação do jogador é digitar correndo o comando de emergência no Terminal:
  * `reset generator`
  * **Resultado:** O comando força o reinício do gerador central, restaurando instantaneamente a bateria principal do escritório para **50%**, limpando o modo blackout, acendendo as luzes e reativando as portas e sistemas.
  * **A Punição por Desespero:** Se o jogador digitar `reset generator` enquanto a energia ainda estiver **acima de 50%**, o sistema entenderá como uma sobrecarga desnecessária por pânico e derrubará a energia do jogador **para 50% de forma punitiva**, desperdiçando bateria preciosa.