# Aplicativo Pizzaria Fidelis

Bem-vindo ao aplicativo Pizzaria Fidelis! Este é um sistema abrangente para gerenciamento de pedidos e cadastro de mesas e produtos em uma pizzaria.
O aplicativo foi desenvolvido com tecnologias modernas e foi dividido em componentes backend e frontend.

## Funcionalidades Principais

- Cadastro e gerenciamento de mesas para facilitar o acompanhamento dos pedidos de cada cliente.
- Catálogo completo de produtos da pizzaria, permitindo adicionar, editar e excluir itens do cardápio.
- Sistema de pedidos intuitivo que permite aos funcionários registrar pedidos e acompanhar o status em tempo real.
- Integração com banco de dados PostgreSQL para garantir a persistência dos dados.
- Desenvolvido com Node.js e Prisma no backend, e React, Next.js e TypeScript no frontend.

## Tecnologias Utilizadas

### Backend

- **Node.js:** O backend é construído usando Node.js, permitindo um ambiente assíncrono e escalável para gerenciar as solicitações.
- **Prisma:** Prisma é a camada de acesso ao banco de dados, oferecendo uma maneira elegante e segura de interagir com o PostgreSQL.
- **PostgreSQL:** O banco de dados relacional é usado para armazenar as informações sobre mesas, produtos e pedidos.
- **TypeScript:** TypeScript é usado para adicionar tipagem estática ao JavaScript, garantindo um código mais confiável e autodocumentado.

### Frontend

- **React:** A biblioteca React é usada para criar uma interface de usuário dinâmica e interativa.
- **Next.js:** O aplicativo é construído com Next.js, aproveitando sua renderização do lado do servidor e roteamento eficiente.
- **TypeScript:** TypeScript é usado para adicionar tipagem estática ao JavaScript, garantindo um código mais confiável e autodocumentado.

### Mobile (React Native)

- **React Native:** A versão móvel do aplicativo é construída com React Native, permitindo criar aplicativos nativos para iOS e Android com uma base de código compartilhada.
- **Expo:** A plataforma Expo é utilizada para agilizar o desenvolvimento e facilitar a implantação dos aplicativos móveis.

## Como Iniciar

1. Certifique-se de ter o Node.js e o npm instalados.
2. Clone este repositório e navegue para o diretório raiz.
3. Instale as dependências do backend executando `npm install` no diretório `/backend`.
4. Configure suas variáveis de ambiente no arquivo `.env` no diretório `/backend`.
5. Execute as migrações do Prisma para criar as tabelas do banco de dados: `npx prisma migrate dev`.
6. Inicie o servidor backend com `npm run dev` no diretório `/backend`.
7. Navegue para o diretório `/frontend` e instale as dependências com `npm install`.
8. Inicie o servidor frontend com `npm run dev` no diretório `/frontend`.


Este aplicativo é uma ferramenta poderosa para pizzarias que desejam simplificar o gerenciamento de pedidos e proporcionar uma experiência aprimorada aos clientes.
Fique à vontade para explorar, personalizar e contribuir com este repositório para torná-lo ainda melhor!

Desenvolvido por Davi Fidelis https://www.linkedin.com/in/davi-fidelis/

---



