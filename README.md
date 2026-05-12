# Portfólio Pessoal - Kaue Figuero Teixeira

Site portfólio pessoal desenvolvido como atividade prática da disciplina **Fundamentos da Programação Web** do Centro Universitário Internacional **UNINTER**.

## 🌐 Site publicado

👉 [Acesse o site aqui](https://kaueft.github.io/portfolio/)

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura semântica das páginas
- **CSS3** — estilização puro, sem frameworks (CSS Variables, Grid, Flexbox, Media Queries)
- **JavaScript** (puro / Vanilla JS) — interatividade, validação de formulário, alternância de tema

> Não foi utilizado nenhum framework (Bootstrap, Tailwind, React, Vue, jQuery, etc.), conforme exigido pela atividade.

## 📁 Estrutura do projeto

```
/
├── index.html          → Página "Sobre Mim" (inicial)
├── formacao.html       → Página "Formação"
├── portfolio.html      → Página "Portfólio" de projetos
├── contato.html        → Página "Contato" com formulário
├── css/
│   └── estilo.css      → Estilos do site
├── js/
│   └── script.js       → Interações em JavaScript
└── README.md           → Este arquivo
```

## ✨ Funcionalidades

- ✅ 4 páginas interligadas por menu fixo visível em todas elas
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Alternância de tema **claro / escuro** com preferência salva no `localStorage`
- ✅ Menu mobile (hambúrguer) que abre/fecha em telas pequenas
- ✅ Formulário de contato com **validação completa em JavaScript**:
  - Verifica se todos os campos estão preenchidos
  - Valida o formato do e-mail
  - Limpa os campos após o envio simulado
  - Exibe modal de confirmação "Mensagem enviada com sucesso!"
- ✅ Filtro de projetos por categoria na página Portfólio
- ✅ Animações suaves e linha do tempo (timeline) para formação

## 🚀 Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Kaueft/portfolio.git
   ```
2. Abra o arquivo `index.html` no seu navegador.

## 📝 Sobre a atividade

Este projeto foi desenvolvido individualmente como entrega da atividade prática da disciplina.
