# Simulado ENADE - Publicidade e Propaganda

Uma aplicação web mobile-first para simulado do ENADE de Publicidade e Propaganda, desenvolvida com HTML5, CSS3 e JavaScript puro.

## 📋 Características

- **Mobile-First**: Design otimizado para dispositivos móveis
- **10 Questões**: Baseadas no ENADE 2015 de Publicidade e Propaganda
- **Sistema de Pontuação**: Cada questão vale 10 pontos (total: 100 pontos)
- **Feedback Personalizado**: Mensagens baseadas no desempenho do aluno
- **Gabarito Detalhado**: Mostra respostas corretas, incorretas e comentários explicativos
- **Navegação Intuitiva**: Uma questão por vez, com validação obrigatória
- **Design Moderno**: Interface limpa e profissional

## 🚀 Como Usar

### Opção 1: Servidor Local (Recomendado)
```bash
# Navegue até a pasta do projeto
cd simulado-enade-publicidade

# Inicie um servidor HTTP local
python3 -m http.server 8080

# Acesse no navegador
http://localhost:8080
```

### Opção 2: Servidor Web
Faça upload de todos os arquivos para seu servidor web e acesse via HTTP/HTTPS.

## 📁 Estrutura dos Arquivos

```
simulado-enade-publicidade/
├── index.html          # Página principal
├── styles.css          # Estilos CSS responsivos
├── script.js           # Lógica JavaScript
├── questoes.json       # Base de dados das questões
└── README.md          # Este arquivo
```

## 🎯 Funcionalidades

### Tela de Instruções
- Apresentação das regras do simulado
- Campo obrigatório para nome do aluno
- Validação de entrada

### Tela de Questões
- Barra de progresso visual
- Navegação entre questões (Anterior/Próxima)
- Seleção obrigatória de alternativa
- Indicação do tipo de questão
- Nome do aluno sempre visível

### Tela de Resultados
- Pontuação final (0-100)
- Número de acertos e erros
- Percentual de aproveitamento
- Feedback personalizado baseado na performance:
  - **80%+ (Excelente)**: "Excelente desempenho! Você demonstrou domínio dos conceitos..."
  - **60-79% (Bom)**: "Bom trabalho! Você tem uma base sólida, mas pode aprimorar..."
  - **<60% (Atenção)**: "É importante dedicar mais tempo aos estudos..."

### Gabarito Detalhado
- Lista completa de todas as questões
- Status visual (Correto/Incorreto)
- Resposta correta destacada
- Resposta do aluno (quando incorreta)
- Comentários explicativos para cada questão

## 🎨 Design Responsivo

- **Mobile-First**: Otimizado para smartphones
- **Tablet**: Layout adaptado para telas médias
- **Desktop**: Interface expandida para telas grandes
- **Cores**: Paleta moderna com gradientes azuis
- **Tipografia**: Fonte Inter para melhor legibilidade
- **Animações**: Transições suaves entre telas

## ⌨️ Atalhos de Teclado

Durante as questões:
- **Seta Esquerda**: Questão anterior
- **Seta Direita**: Próxima questão
- **1-4**: Selecionar alternativas A-D

## 🔧 Personalização

### Modificar Questões
Edite o arquivo `questoes.json` seguindo a estrutura:

```json
{
  "id": 1,
  "tipo": "Tipo da Questão",
  "enunciado": "Texto da questão...",
  "alternativas": [
    "A) Primeira alternativa",
    "B) Segunda alternativa",
    "C) Terceira alternativa",
    "D) Quarta alternativa"
  ],
  "gabarito": "B",
  "comentario": "Explicação da resposta correta"
}
```

### Modificar Pontuação
No arquivo `questoes.json`, altere:
- `totalQuestoes`: Número total de questões
- `pontosPorQuestao`: Pontos por questão

### Personalizar Cores
No arquivo `styles.css`, modifique as variáveis CSS:
```css
:root {
  --primary-color: #2563eb;
  --success-color: #10b981;
  --error-color: #ef4444;
  /* ... outras cores */
}
```

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Smartphones, tablets, desktops
- **Resolução**: Otimizado para 320px+ de largura

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Custom Properties, Animações
- **JavaScript ES6+**: Fetch API, Arrow Functions, Template Literals
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais. As questões são baseadas no ENADE 2015 de Publicidade e Propaganda.

## 🤝 Suporte

Para dúvidas ou sugestões sobre a aplicação, entre em contato através do site www.leoamato.com

---

**Desenvolvido com ❤️ para educação em Publicidade e Propaganda**

