# advanced-todo-list

Projeto web Meteor + React para gerenciamento de tarefas. A aplicação permite criar, editar, remover e marcar itens como concluídos em uma lista de tarefas, com sincronização em tempo real e interface moderna.

## Estrutura do diretório

- `client/`
    - código específico do cliente
    - arquivos de entrada do Meteor para a interface
- `imports/`
    - `api/`
        - definições de coleções Mongo
        - métodos e publicações
    - `ui/`
        - componentes React
        - páginas e layouts
- `public/`
    - assets estáticos (imagens, ícones, etc.)
- `server/`
    - código do lado servidor
    - publicações, métodos e inicialização do Meteor
- `package.json`
    - dependências do projeto
- `README.md`
    - documentação do projeto

## Funcionalidades

- Criação de tarefas
- Edição de tarefas
- Exclusão de tarefas
- Marcação de tarefas como concluídas
- Sincronização em tempo real entre usuários
- Interface React com Meteor
- Possível suporte a autenticação de usuário
- Organização dos componentes em `imports/ui`

## Tutorial de execução em outra máquina

1. Instale o Meteor no sistema:
     - Linux/macOS: `curl https://install.meteor.com/ | sh`
     - Windows: baixe o instalador em https://www.meteor.com/install

2. Clone o repositório ou copie o projeto:
     - `git clone <url-do-repositorio>`
     - `cd advanced-todo-list`

3. Instale dependências:
     - `meteor npm install`

4. Execute a aplicação:
     - `meteor run`

5. Abra no navegador:
     - `http://localhost:3000`

Se precisar reiniciar o banco de dados local, use:
- `meteor reset`

Isso deve permitir que outra máquina execute o projeto Meteor + React sem dificuldades.