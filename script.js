// Estado global da aplicação
let simuladoData = null;
let questaoAtual = 0;
let respostasAluno = {};
let nomeAluno = '';

// Carregamento inicial
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('questoes.json');
        simuladoData = await response.json();
        console.log('Dados do simulado carregados:', simuladoData);
    } catch (error) {
        console.error('Erro ao carregar questões:', error);
        alert('Erro ao carregar as questões. Por favor, recarregue a página.');
    }
});

// Função para iniciar o simulado
function iniciarSimulado() {
    const nomeInput = document.getElementById('nomeAluno');
    const nomeError = document.getElementById('nomeError');
    
    nomeAluno = nomeInput.value.trim();
    
    if (!nomeAluno) {
        nomeError.classList.add('show');
        nomeInput.focus();
        return;
    }
    
    nomeError.classList.remove('show');
    
    // Resetar estado
    questaoAtual = 0;
    respostasAluno = {};
    
    // Configurar tela de questões
    document.getElementById('totalQuestoes').textContent = simuladoData.simulado.totalQuestoes;
    document.getElementById('studentName').textContent = `Aluno: ${nomeAluno}`;
    
    // Mostrar primeira questão
    mostrarQuestao(0);
    
    // Trocar telas
    trocarTela('questoes-screen');
}

// Função para trocar telas
function trocarTela(telaId) {
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar tela específica
    document.getElementById(telaId).classList.add('active');
}

// Função para mostrar questão
function mostrarQuestao(indice) {
    if (!simuladoData || !simuladoData.simulado.questoes[indice]) {
        console.error('Questão não encontrada:', indice);
        return;
    }
    
    const questao = simuladoData.simulado.questoes[indice];
    
    // Atualizar informações da questão
    document.getElementById('questaoAtual').textContent = indice + 1;
    document.getElementById('questaoNumero').textContent = indice + 1;
    document.getElementById('questaoTipo').textContent = questao.tipo;
    document.getElementById('questaoEnunciado').textContent = questao.enunciado;
    
    // Atualizar barra de progresso
    const progresso = ((indice + 1) / simuladoData.simulado.totalQuestoes) * 100;
    document.getElementById('progressFill').style.width = `${progresso}%`;
    
    // Gerar alternativas
    const container = document.getElementById('alternativasContainer');
    container.innerHTML = '';
    
    questao.alternativas.forEach((alternativa, altIndice) => {
        const letra = String.fromCharCode(65 + altIndice); // A, B, C, D
        const alternativaDiv = document.createElement('div');
        alternativaDiv.className = 'alternativa';
        
        const radioId = `questao_${indice}_alt_${altIndice}`;
        
        alternativaDiv.innerHTML = `
            <input type="radio" id="${radioId}" name="questao_${indice}" value="${letra}" onchange="selecionarAlternativa(${indice}, '${letra}')">
            <label for="${radioId}">${alternativa}</label>
        `;
        
        container.appendChild(alternativaDiv);
    });
    
    // Restaurar resposta anterior se existir
    if (respostasAluno[indice]) {
        const radio = document.querySelector(`input[name="questao_${indice}"][value="${respostasAluno[indice]}"]`);
        if (radio) {
            radio.checked = true;
            radio.closest('.alternativa').classList.add('selected');
        }
    }
    
    // Atualizar botões
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProxima = document.getElementById('btnProxima');
    
    btnAnterior.disabled = indice === 0;
    
    // Verificar se pode avançar
    const podeAvancar = respostasAluno[indice] !== undefined;
    btnProxima.disabled = !podeAvancar;
    
    // Texto do botão próxima
    if (indice === simuladoData.simulado.totalQuestoes - 1) {
        btnProxima.innerHTML = '<i class="fas fa-check"></i> Finalizar';
    } else {
        btnProxima.innerHTML = 'Próxima <i class="fas fa-arrow-right"></i>';
    }
}

// Função para selecionar alternativa
function selecionarAlternativa(questaoIndice, letra) {
    respostasAluno[questaoIndice] = letra;
    
    // Atualizar visual
    document.querySelectorAll(`input[name="questao_${questaoIndice}"]`).forEach(radio => {
        radio.closest('.alternativa').classList.remove('selected');
    });
    
    const radioSelecionado = document.querySelector(`input[name="questao_${questaoIndice}"][value="${letra}"]`);
    if (radioSelecionado) {
        radioSelecionado.closest('.alternativa').classList.add('selected');
    }
    
    // Habilitar botão próxima
    document.getElementById('btnProxima').disabled = false;
}

// Função para questão anterior
function questaoAnterior() {
    if (questaoAtual > 0) {
        questaoAtual--;
        mostrarQuestao(questaoAtual);
    }
}

// Função para próxima questão
function proximaQuestao() {
    if (!respostasAluno[questaoAtual]) {
        alert('Por favor, selecione uma resposta antes de continuar.');
        return;
    }
    
    if (questaoAtual < simuladoData.simulado.totalQuestoes - 1) {
        questaoAtual++;
        mostrarQuestao(questaoAtual);
    } else {
        // Finalizar simulado
        finalizarSimulado();
    }
}

// Função para finalizar simulado
function finalizarSimulado() {
    // Calcular pontuação
    let acertos = 0;
    let erros = 0;
    
    simuladoData.simulado.questoes.forEach((questao, indice) => {
        if (respostasAluno[indice] === questao.gabarito) {
            acertos++;
        } else {
            erros++;
        }
    });
    
    const pontuacao = acertos * simuladoData.simulado.pontosPorQuestao;
    const percentual = (acertos / simuladoData.simulado.totalQuestoes) * 100;
    
    // Atualizar tela de resultado
    document.getElementById('scoreNumber').textContent = pontuacao;
    document.getElementById('resultadoNome').textContent = `Parabéns, ${nomeAluno}!`;
    document.getElementById('totalAcertos').textContent = acertos;
    document.getElementById('totalErros').textContent = erros;
    document.getElementById('percentualAcerto').textContent = `${percentual.toFixed(1)}%`;
    
    // Mensagem de feedback
    const messageElement = document.getElementById('resultadoMessage');
    let mensagem = '';
    let classe = '';
    
    if (percentual >= 80) {
        mensagem = 'Excelente desempenho! Você demonstrou domínio dos conceitos de Publicidade e Propaganda.';
        classe = 'excelente';
    } else if (percentual >= 60) {
        mensagem = 'Bom trabalho! Você tem uma base sólida, mas pode aprimorar alguns conceitos.';
        classe = 'bom';
    } else {
        mensagem = 'É importante dedicar mais tempo aos estudos. Revise os conceitos e pratique mais.';
        classe = 'atencao';
    }
    
    messageElement.textContent = mensagem;
    messageElement.className = `resultado-message ${classe}`;
    
    // Trocar para tela de resultado
    trocarTela('resultado-screen');
}

// Função para ver gabarito
function verGabarito() {
    const container = document.getElementById('gabaritoContainer');
    container.innerHTML = '';
    
    simuladoData.simulado.questoes.forEach((questao, indice) => {
        const respostaAluno = respostasAluno[indice];
        const acertou = respostaAluno === questao.gabarito;
        
        const gabaritoItem = document.createElement('div');
        gabaritoItem.className = 'gabarito-item';
        
        // Encontrar texto da alternativa correta
        const alternativaCorreta = questao.alternativas.find(alt => 
            alt.startsWith(questao.gabarito + ')')
        );
        
        // Encontrar texto da alternativa do aluno
        let alternativaAluno = '';
        if (respostaAluno) {
            alternativaAluno = questao.alternativas.find(alt => 
                alt.startsWith(respostaAluno + ')')
            );
        }
        
        gabaritoItem.innerHTML = `
            <div class="gabarito-header">
                <div class="gabarito-numero">Questão ${indice + 1}</div>
                <div class="gabarito-status ${acertou ? 'correto' : 'incorreto'}">
                    <i class="fas ${acertou ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    ${acertou ? 'Correto' : 'Incorreto'}
                </div>
            </div>
            
            <div class="gabarito-enunciado">${questao.enunciado}</div>
            
            <div class="gabarito-resposta">
                <div class="gabarito-resposta-item correto">
                    <i class="fas fa-check"></i>
                    <strong>Resposta correta:</strong> ${alternativaCorreta || questao.gabarito}
                </div>
                ${!acertou && respostaAluno ? `
                    <div class="gabarito-resposta-item incorreto">
                        <i class="fas fa-times"></i>
                        <strong>Sua resposta:</strong> ${alternativaAluno || respostaAluno}
                    </div>
                ` : ''}
            </div>
            
            <div class="gabarito-comentario">
                <strong>💡 Comentário:</strong> ${questao.comentario}
            </div>
        `;
        
        container.appendChild(gabaritoItem);
    });
    
    trocarTela('gabarito-screen');
}

// Função para voltar ao resultado
function voltarResultado() {
    trocarTela('resultado-screen');
}

// Função para reiniciar simulado
function reiniciarSimulado() {
    // Resetar dados
    questaoAtual = 0;
    respostasAluno = {};
    nomeAluno = '';
    
    // Limpar formulário
    document.getElementById('nomeAluno').value = '';
    document.getElementById('nomeError').classList.remove('show');
    
    // Voltar para tela inicial
    trocarTela('instrucoes-screen');
}

// Função para lidar com teclas (acessibilidade)
document.addEventListener('keydown', function(event) {
    const telaAtiva = document.querySelector('.screen.active');
    
    if (telaAtiva && telaAtiva.id === 'questoes-screen') {
        // Navegação com setas
        if (event.key === 'ArrowLeft' && !document.getElementById('btnAnterior').disabled) {
            questaoAnterior();
        } else if (event.key === 'ArrowRight' && !document.getElementById('btnProxima').disabled) {
            proximaQuestao();
        }
        
        // Seleção com números 1-4
        const numero = parseInt(event.key);
        if (numero >= 1 && numero <= 4) {
            const radio = document.querySelector(`input[name="questao_${questaoAtual}"]:nth-of-type(${numero})`);
            if (radio) {
                radio.click();
            }
        }
    }
});

// Adicionar eventos de clique nas alternativas
document.addEventListener('click', function(event) {
    if (event.target.closest('.alternativa')) {
        const alternativa = event.target.closest('.alternativa');
        const radio = alternativa.querySelector('input[type="radio"]');
        if (radio && !radio.checked) {
            radio.click();
        }
    }
});

// Prevenção de refresh acidental durante o simulado
window.addEventListener('beforeunload', function(event) {
    const telaAtiva = document.querySelector('.screen.active');
    if (telaAtiva && (telaAtiva.id === 'questoes-screen' || telaAtiva.id === 'resultado-screen')) {
        event.preventDefault();
        event.returnValue = 'Tem certeza que deseja sair? Seu progresso será perdido.';
        return event.returnValue;
    }
});

// Função de debug (remover em produção)
function debugSimulado() {
    console.log('Estado atual:', {
        questaoAtual,
        respostasAluno,
        nomeAluno,
        simuladoData
    });
}

