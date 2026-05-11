/* =============================================================
   PORTFÓLIO PESSOAL - JAVASCRIPT PRINCIPAL
   Disciplina: Fundamentos da Programação Web - UNINTER
   Tecnologia: JavaScript puro (sem frameworks como jQuery/React)

   Funcionalidades implementadas:
   1. Atualização automática do ano no rodapé
   2. Menu mobile (hamburguer) - abre/fecha em telas pequenas
   3. Alternância de tema claro/escuro (salvo no localStorage)
   4. Validação do formulário de contato (nome, e-mail e mensagem)
   5. Simulação de envio + modal de sucesso
   6. Filtro de projetos por categoria (página Portfólio)
   ============================================================= */


/* ==========================================================
   Espera o HTML carregar completamente antes de executar o JS.
   Isso evita erros de "elemento não encontrado".
   ========================================================== */
document.addEventListener('DOMContentLoaded', function () {

    // Inicializa cada funcionalidade
    atualizarAno();
    inicializarMenuMobile();
    inicializarTema();
    inicializarFormulario();
    inicializarFiltros();

});


/* ==========================================================
   FUNÇÃO 1: Atualiza o ano corrente no rodapé automaticamente
   ========================================================== */
function atualizarAno() {
    const spanAno = document.getElementById('anoAtual');
    if (spanAno) {
        spanAno.textContent = new Date().getFullYear();
    }
}


/* ==========================================================
   FUNÇÃO 2: Controle do menu mobile (hamburguer)
   Abre/fecha o menu lateral em dispositivos móveis
   ========================================================== */
function inicializarMenuMobile() {
    const botaoMenu = document.getElementById('menuToggle');
    const menu = document.getElementById('menuPrincipal');

    if (!botaoMenu || !menu) return; // segurança: sai se elementos não existirem

    // Ao clicar no botão hamburguer, alterna a classe "ativo" no menu
    botaoMenu.addEventListener('click', function () {
        menu.classList.toggle('ativo');
    });

    // Fecha o menu ao clicar em qualquer link (útil em mobile)
    const linksMenu = menu.querySelectorAll('a');
    linksMenu.forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('ativo');
        });
    });
}


/* ==========================================================
   FUNÇÃO 3: Tema claro/escuro
   - Lê preferência salva no localStorage
   - Permite alternar pelo botão "lua/sol"
   - Salva a escolha do usuário para a próxima visita
   ========================================================== */
function inicializarTema() {
    const botaoTema = document.getElementById('botaoTema');
    const iconeTema = document.querySelector('.icone-tema');
    const html = document.documentElement; // a tag <html>

    // 1. Aplica o tema salvo (se houver) quando a página carrega
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        html.setAttribute('data-tema', 'escuro');
        if (iconeTema) iconeTema.textContent = '☀️';
    }

    if (!botaoTema) return;

    // 2. Alterna o tema ao clicar no botão
    botaoTema.addEventListener('click', function () {
        const temaAtual = html.getAttribute('data-tema');

        if (temaAtual === 'escuro') {
            // Volta para o tema claro
            html.removeAttribute('data-tema');
            localStorage.setItem('tema', 'claro');
            if (iconeTema) iconeTema.textContent = '🌙';
        } else {
            // Aplica o tema escuro
            html.setAttribute('data-tema', 'escuro');
            localStorage.setItem('tema', 'escuro');
            if (iconeTema) iconeTema.textContent = '☀️';
        }
    });
}


/* ==========================================================
   FUNÇÃO 4: Validação e envio simulado do formulário de contato
   Requisitos da atividade:
   - Verificar se todos os campos estão preenchidos
   - Verificar se o e-mail tem formato válido
   - Limpar campos e mostrar mensagem de sucesso (modal)
   ========================================================== */
function inicializarFormulario() {
    const formulario = document.getElementById('formContato');
    if (!formulario) return; // sai se não estiver na página de contato

    formulario.addEventListener('submit', function (evento) {
        // Impede o envio padrão do formulário (que recarregaria a página)
        evento.preventDefault();

        // Captura os campos pelo ID
        const inputNome = document.getElementById('nome');
        const inputEmail = document.getElementById('email');
        const inputMensagem = document.getElementById('mensagem');

        // Captura os SPANs onde mostraremos as mensagens de erro
        const erroNome = document.getElementById('erroNome');
        const erroEmail = document.getElementById('erroEmail');
        const erroMensagem = document.getElementById('erroMensagem');

        // Variável que indica se todos os campos passaram na validação
        let valido = true;

        // --- Limpa mensagens e classes de erro anteriores ---
        [inputNome, inputEmail, inputMensagem].forEach(function (campo) {
            campo.classList.remove('invalido');
        });
        erroNome.textContent = '';
        erroEmail.textContent = '';
        erroMensagem.textContent = '';

        // --- Validação 1: campo NOME ---
        // Usa trim() para garantir que espaços em branco não sejam considerados válidos
        const nome = inputNome.value.trim();
        if (nome === '') {
            erroNome.textContent = 'Por favor, informe seu nome.';
            inputNome.classList.add('invalido');
            valido = false;
        } else if (nome.length < 3) {
            erroNome.textContent = 'O nome deve ter pelo menos 3 caracteres.';
            inputNome.classList.add('invalido');
            valido = false;
        }

        // --- Validação 2: campo E-MAIL ---
        const email = inputEmail.value.trim();
        if (email === '') {
            erroEmail.textContent = 'Por favor, informe seu e-mail.';
            inputEmail.classList.add('invalido');
            valido = false;
        } else if (!validarEmail(email)) {
            erroEmail.textContent = 'Por favor, informe um e-mail válido (ex: usuario@dominio.com).';
            inputEmail.classList.add('invalido');
            valido = false;
        }

        // --- Validação 3: campo MENSAGEM ---
        const mensagem = inputMensagem.value.trim();
        if (mensagem === '') {
            erroMensagem.textContent = 'Por favor, escreva uma mensagem.';
            inputMensagem.classList.add('invalido');
            valido = false;
        } else if (mensagem.length < 10) {
            erroMensagem.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
            inputMensagem.classList.add('invalido');
            valido = false;
        }

        // --- Se tudo estiver válido, simula o envio ---
        if (valido) {
            // Mostra mensagem de aviso (verde) abaixo do formulário
            const aviso = document.getElementById('avisoSucesso');
            if (aviso) aviso.style.display = 'block';

            // Abre o modal de confirmação
            abrirModal();

            // Em uma aplicação real, aqui faríamos uma chamada AJAX/Fetch
            // para enviar os dados ao servidor. Como estamos apenas SIMULANDO:
            console.log('Mensagem simulada enviada com sucesso!', {
                nome: nome,
                email: email,
                mensagem: mensagem
            });

            // Limpa os campos do formulário (requisito da atividade)
            formulario.reset();

            // Esconde a mensagem de aviso após 5 segundos
            setTimeout(function () {
                if (aviso) aviso.style.display = 'none';
            }, 5000);
        }
    });

    // Configura o fechamento do modal
    const fecharBtn = document.getElementById('fecharModal');
    const modal = document.getElementById('modal');

    if (fecharBtn) {
        fecharBtn.addEventListener('click', fecharModal);
    }

    // Permite fechar o modal clicando fora dele (no fundo escuro)
    if (modal) {
        modal.addEventListener('click', function (evento) {
            // Só fecha se o clique foi no fundo, não no conteúdo
            if (evento.target === modal) {
                fecharModal();
            }
        });
    }

    // Permite fechar o modal pressionando a tecla ESC
    document.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape') {
            fecharModal();
        }
    });
}


/* ----- Funções auxiliares para o formulário ----- */

/**
 * Valida o formato de um e-mail usando uma expressão regular.
 * Aceita formatos como: nome@dominio.com, nome.sobrenome@dominio.com.br
 * @param {string} email - O e-mail a ser validado
 * @returns {boolean} - true se o e-mail for válido, false caso contrário
 */
function validarEmail(email) {
    // Regex: aceita letras, números, pontos, hífens e underscore antes do @
    // Depois do @ exige domínio com pelo menos um ponto (ex: dominio.com)
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

/**
 * Abre o modal de confirmação adicionando a classe "ativo"
 */
function abrirModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('ativo');
        modal.setAttribute('aria-hidden', 'false');
    }
}

/**
 * Fecha o modal removendo a classe "ativo"
 */
function fecharModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('ativo');
        modal.setAttribute('aria-hidden', 'true');
    }
}


/* ==========================================================
   FUNÇÃO 5: Filtro de projetos por categoria
   Na página Portfólio, esconde/mostra projetos conforme a
   categoria escolhida nos botões de filtro.
   ========================================================== */
function inicializarFiltros() {
    const containerFiltros = document.getElementById('filtros');
    const projetos = document.querySelectorAll('.projeto');
    const mensagemVazia = document.getElementById('mensagemVazia');

    // Sai se não estiver na página de portfólio
    if (!containerFiltros || projetos.length === 0) return;

    const botoesFiltro = containerFiltros.querySelectorAll('.botao-filtro');

    // Adiciona evento de clique em cada botão
    botoesFiltro.forEach(function (botao) {
        botao.addEventListener('click', function () {
            // Captura a categoria escolhida (atributo data-filtro)
            const categoria = this.getAttribute('data-filtro');

            // Atualiza qual botão está ativo (visualmente)
            botoesFiltro.forEach(function (b) {
                b.classList.remove('ativo');
            });
            this.classList.add('ativo');

            // Conta quantos projetos foram exibidos
            let exibidos = 0;

            // Percorre todos os projetos e mostra/esconde conforme a categoria
            projetos.forEach(function (projeto) {
                const projetoCategoria = projeto.getAttribute('data-categoria');

                if (categoria === 'todos' || projetoCategoria === categoria) {
                    projeto.style.display = 'block';
                    exibidos++;
                } else {
                    projeto.style.display = 'none';
                }
            });

            // Exibe mensagem "nenhum projeto" caso o filtro não tenha resultados
            if (mensagemVazia) {
                mensagemVazia.style.display = (exibidos === 0) ? 'block' : 'none';
            }
        });
    });
}
