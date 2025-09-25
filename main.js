// =========================================================
// 1. ESTADO GLOBAL DO JOGO (Estatísticas do Mundo)
// =========================================================
let gameState = {
    nome: "[Desconhecido]",
    populacao: 0,
    recursos: "Nenhum",
    cultura: "Vazia",
    impacto: 0,
    // Variável para armazenar o ID do estado atual da história
    currentScene: 'start_game' 
};

// =========================================================
// 2. FUNÇÕES DE EXIBIÇÃO DA INTERFACE (DOM)
// =========================================================

/**
 * Atualiza o texto da história, as opções e as estatísticas na tela.
 * @param {string} storyText - O novo texto narrativo.
 * @param {Array<Object>} choices - Array de objetos de escolha {text, nextScene}.
 */
function updateDisplay(storyText, choices) {
    // Atualiza o texto da história
    document.getElementById('story-text').innerHTML = `<p>${storyText}</p>`;
    
    // Atualiza as opções de decisão
    const choicesDiv = document.getElementById('choice-buttons');
    choicesDiv.innerHTML = ''; // Limpa botões anteriores

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        // Chama handleChoice() passando o ID da próxima cena
        button.onclick = () => handleChoice(choice.nextScene); 
        choicesDiv.appendChild(button);
    });

    // Atualiza o Painel de Estatísticas
    document.getElementById('stat-nome').textContent = gameState.nome;
    document.getElementById('stat-populacao').textContent = gameState.populacao.toLocaleString();
    document.getElementById('stat-recursos').textContent = gameState.recursos;
    document.getElementById('stat-cultura').textContent = gameState.cultura;
    document.getElementById('stat-impacto').textContent = gameState.impacto;
}

// =========================================================
// 3. LÓGICA DO JOGO
// =========================================================

/**
 * Inicializa o jogo e pede o nome do mundo.
 */
function startGame() {
    const nomeMundo = prompt("Em primeiro lugar, qual é o nome do mundo que você irá fundar?");
    
    if (nomeMundo && nomeMundo.trim() !== "") {
        gameState.nome = nomeMundo.trim();
        gameState.populacao = 100; // Começa com uma pequena população inicial
        gameState.currentScene = 'geography_choice';
        loadScene(gameState.currentScene);
    } else {
        alert("O mundo precisa de um nome, Fundador(a)! Tente novamente.");
        loadScene('start_game'); // Volta para o início
    }
}

/**
 * Processa a decisão do jogador e carrega a próxima cena.
 * @param {string} nextSceneID - O ID da próxima cena a ser carregada.
 */
function handleChoice(nextSceneID) {
    // Lógica para aplicar os efeitos da decisão (já incluída nas funções de consequência)

    gameState.currentScene = nextSceneID;
    loadScene(nextSceneID);
}

/**
 * Carrega e exibe a cena (texto e opções) com base no ID.
 * É o núcleo da narrativa.
 */
function loadScene(sceneID) {
    let storyText = "";
    let choices = [];

    switch(sceneID) {
        case 'start_game':
            // Se o jogo recomeçar, reseta as estatísticas iniciais
            if (gameState.nome !== "[Desconhecido]") {
                gameState.nome = "[Desconhecido]";
                gameState.populacao = 0;
                gameState.recursos = "Nenhum";
                gameState.cultura = "Vazia";
                gameState.impacto = 0;
            }
            storyText = `Você está no Limiar do Vazio. Sua primeira tarefa é conceber o cosmos. Pressione "Iniciar Criação" para começar.`;
            choices = [
                { text: "Iniciar Criação", nextScene: 'geography_choice' }
            ];
            break;

        // --- CENA 1: GEOGRAFIA ---
        case 'geography_choice':
            storyText = `Com o nome do mundo de **${gameState.nome}** estabelecido, você deve agora moldar sua fundação física. Qual será a característica geográfica dominante?`;
            choices = [
                { 
                    text: "A. O Arquipélago da Névoa: Ilhas vulcânicas envoltas em bruma. Mar abundante, terra escassa.", 
                    nextScene: 'consequence_archipelago' 
                },
                { 
                    text: "B. A Cordilheira Sombria: Montanhas imponentes e vales profundos. Riqueza em minérios, clima severo.", 
                    nextScene: 'consequence_mountains' 
                },
                { 
                    text: "C. As Estepes do Vento: Campos infinitos. Solo fértil para agricultura, mas sem barreiras naturais.", 
                    nextScene: 'consequence_steppes' 
                }
            ];
            break;

        // --- CONSEQÜÊNCIAS DA GEOGRAFIA ---
        case 'consequence_archipelago':
            gameState.recursos = "Marítimos (Pérolas, Peixes Raros)";
            gameState.populacao += 50;
            gameState.impacto += 10;
            storyText = `O Arquipélago da Névoa é criado. Seu povo se torna **navegador** por necessidade. A cultura será voltada para o mar. Eles serão mestres na navegação, mas vulneráveis a grandes tempestades e à falta de madeira para construção.`;
            choices = [
                { text: "Próxima Decisão: Escolher a Filosofia de Vida", nextScene: 'philosophy_choice' }
            ];
            break;

        case 'consequence_mountains':
            gameState.recursos = "Minérios (Ferro, Gemas)";
            gameState.populacao += 20;
            gameState.impacto += 15;
            storyText = `A Cordilheira Sombria se eleva. Seu povo se torna **minerador e construtor de fortalezas**. Eles vivem isolados em cidades escavadas nas rochas, com acesso a materiais de guerra, mas a agricultura é quase impossível.`;
            choices = [
                { text: "Próxima Decisão: Escolher a Filosofia de Vida", nextScene: 'philosophy_choice' }
            ];
            break;

        case 'consequence_steppes':
            gameState.recursos = "Agrícolas (Grãos, Pecuária)";
            gameState.populacao += 100;
            gameState.impacto += 8;
            storyText = `As Estepes do Vento se estendem. Seu povo se torna **pastor e agricultor**. A terra os recompensa com fartura, mas a falta de barreiras significa que a defesa militar será a maior prioridade.`;
            choices = [
                { text: "Próxima Decisão: Escolher a Filosofia de Vida", nextScene: 'philosophy_choice' }
            ];
            break;
            
        // --- CENA 2: FILOSOFIA DE VIDA (CULTURA) ---
        case 'philosophy_choice':
            storyText = `A fundação de **${gameState.nome}** está lançada. Qual filosofia de vida guiará a cultura de seu povo?`;
            choices = [
                { text: "D. A Tradição da Memória: Valorizar a história e os antepassados. (Cultura conservadora)", nextScene: 'consequence_memory' },
                { text: "E. O Culto à Inovação: Buscar incessantemente novas tecnologias e conhecimentos. (Cultura progressista)", nextScene: 'consequence_innovation' }
            ];
            break;

        // --- CONSEQÜÊNCIAS DA FILOSOFIA ---
        case 'consequence_memory':
            gameState.cultura = "Conservadora/Tradicionalista";
            gameState.impacto += 5;
            storyText = `A Tradição da Memória se estabelece. Seu povo honrará o passado, o que garante a coesão social, mas pode levar à estagnação tecnológica e à desconfiança de estrangeiros.`;
            choices = [
                { text: "Fim do Capítulo 1: Analisar o Mapa", nextScene: 'end_of_chapter_1' }
            ];
            break;
            
        case 'consequence_innovation':
            gameState.cultura = "Progressista/Científica";
            gameState.impacto += 7;
            storyText = `O Culto à Inovação domina. Seu povo alcançará grandes saltos tecnológicos rapidamente, mas a rápida mudança social pode gerar divisões internas e desprezo pelos métodos antigos.`;
            choices = [
                { text: "Fim do Capítulo 1: Analisar o Mapa", nextScene: 'end_of_chapter_1' }
            ];
            break;

        // --- CENA FINAL DO CAPÍTULO 1 ---
        case 'end_of_chapter_1':
            storyText = `**FIM DO CAPÍTULO 1: O ALICERCE**<br><br>O mundo de **${gameState.nome}** agora tem uma base geográfica e cultural. Seu povo, com uma população de **${gameState.populacao}** e focado em **${gameState.recursos}**, está pronto para o próximo desafio: construir um governo.`;
            choices = [
                { text: "Capítulo 2: A Ascensão do Governo (Em Construção)", nextScene: 'start_game' }
            ];
            break;

        default:
            storyText = "Cena Desconhecida. O jogo retornará ao início.";
            choices = [{ text: "Recomeçar", nextScene: 'start_game' }];
            break;
    }

    // Força a atualização da tela com a nova história e opções
    updateDisplay(storyText, choices);
}

// =========================================================
// 4. INICIALIZAÇÃO
// =========================================================

// Função chamada quando a página carrega.
document.addEventListener('DOMContentLoaded', () => {
    // Carrega a cena inicial para mostrar o botão 'Iniciar Jogo'
    loadScene('start_game'); 
});w