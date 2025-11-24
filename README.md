🃏 Projeto Black Jack - Jogo de Cartas no Terminal

Este projeto é uma implementação do clássico jogo de cartas Black Jack (ou 21) jogado diretamente no terminal. O jogador pode optar por pedir mais cartas ("hit") ou parar ("stand").

✨ Recursos e Tecnologias

Este projeto foi construído com foco em boas práticas de desenvolvimento e arquitetura de software, utilizando as seguintes tecnologias e conceitos:

    Linguagem: TypeScript

    Ambiente de Execução: Node.js

    Interação com Usuário: prompt-sync (para leitura de entradas do jogador via terminal)

    Arquitetura: Model-View-Controller (MVC)

    Paradigma: Programação Orientada a Objetos (POO)

    Padrões de Design:

        Injeção de Dependência (DI)

        Domain-Driven Design (DDD)

🏗️ Arquitetura

O projeto segue a arquitetura MVC combinada com princípios de DDD e POO.

    Domain-Driven Design (DDD): O coração do projeto é o domínio do jogo Black Jack, onde as regras de negócio (cálculo de pontuação, lógica de "hit" e "stand", distribuição de cartas) são estritamente definidas e isoladas.

    Model-View-Controller (MVC):

        Model: Contém a lógica de domínio (DDD). Classes como Baralho, Mão, Jogador e RegrasDoJogo representam o estado e o comportamento do jogo.

        View: Responsável por exibir o estado do jogo e as opções ao jogador no terminal.

        Controller: Lida com a entrada do jogador (prompt-sync) e coordena as interações entre o Model e a View.

    Injeção de Dependência (DI): Utilizada para desacoplar componentes, tornando o código mais flexível e testável (ex: a View pode ser injetada no Controller).

🚀 Como Rodar o Projeto

Pré-requisitos

Você precisa ter o Node.js instalado na sua máquina.

Clone o repositório:

    git clone https://github.com/killuaxhunterx/BlackJackTypeScript
    cd [NOME_DO_DIRETORIO]

Instale as dependências:

    npm install typescript
    npm install typescript --save-dev
    npx tsc init

Compile o TypeScript:

    npm run build

Isso criará os arquivos JavaScript compilados na pasta de destino (ex: dist/).

Execute o jogo:

    npm run build


🕹️ Como Jogar

O jogo é interativo via terminal.

    Ao iniciar, você e o Dealer receberão as cartas iniciais.

    Você verá a pontuação da sua mão e a primeira carta da Croupier.

    O jogo irá perguntar: "Deseja Pedir(hit) outra carta ou Parar(stand)?"

    Digite hit (Pedir) para receber outra carta.

    Digite stand (Parar) para manter sua mão atual.

    O jogo continuará até que você pare ou ultrapasse 21 pontos ("bust").
