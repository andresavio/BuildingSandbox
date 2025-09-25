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
    // Lógica para aplicar os efeitos da decisão (será adicionada aqui)
    // Exemplo: if (nextSceneID === 'ilhas_consequencia') { gameState.recursos = "Marítimos Raros"; gameState.impacto += 5; }

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
            storyText = `Bem-vindo(a), Fundador(a). Você está no Limiar do Vazio. Sua primeira tarefa é nomear o cosmos que irá criar.`;
            choices = [
                { text: "Nomear o Mundo e Iniciar a Criação", nextScene: 'geography_choice' }
            ];
            break;

        case 'geography_choice':
            storyText = `Com o nome do mundo estabelecido, você deve agora moldar sua fundação física. Qual será a característica geográfica dominante?`;
            choices = [
                { 
                    text: "A. Um vasto Arquipélago de Ilhas Tropicais: Rica em vida marinha e recursos costeiros.", 
                    nextScene: 'ilhas_consequencia' 
                },
                { 
                    text: "B. Um único e imponente Continente Glacial: Abundante em minérios e protegido pelo gelo.", 
                    nextScene: 'glacial_consequencia' 
                }
            ];
            break;

        case 'ilhas_consequencia':
            // Efeito da Decisão
            gameState.recursos = "Marítimos Raros (Pérolas, Peixes)";
            gameState.cultura = "Navegadores";
            gameState.impacto += 5;

            storyText = `Você escolheu as Ilhas! O mundo de ${gameState.nome} é agora um reino de água salgada e sol. Seus colonos se tornam **Navegadores**, focados no mar. A terra é escassa, mas o horizonte é infinito.`;
            choices = [
                { text: "Próxima Decisão: Escolher o Primeiro Líder", nextScene: 'leader_choice' }
            ];
            break;

        case 'glacial_consequencia':
            // Efeito da Decisão
            gameState.recursos = "Minérios e Gelo (Ferro, Gelo Raro)";
            gameState.cultura = "Construtores de Abrigos";
            gameState.impacto += 5;
            
            storyText = `Você escolheu o Gelo! O continente de ${gameState.nome} é agora uma fortaleza de pedra e neve. Seus colonos se tornam **Construtores de Abrigos**, focados em extração e proteção contra o frio.`;
            choices = [
                { text: "Próxima Decisão: Escolher o Primeiro Líder", nextScene: 'leader_choice' }
            ];
            break;
            
        case 'leader_choice':
            storyText = `A fundação está lançada. Agora, quem guiará seus primeiros 100 cidadãos?`;
            choices = [
                { text: "Um Sábio Ancião (Foco em Conhecimento)", nextScene: 'end_of_chapter_1' },
                { text: "Um Guerreiro Forte (Foco em Segurança)", nextScene: 'end_of_chapter_1' }
            ];
            break;

        default:
            storyText = "Fim do Jogo/Cena Desconhecida. Obrigado por jogar!";
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
});