# eRural Play

Sistema para compartilhamento de vídeos desenvolvido em VueJS.

O usuário, após um pequeno cadastro, pode criar uma sala adicionando um vídeo do Youtube. O vídeo é sincronizado entre os usuários. Qualquer usuário pode assumir o controle do vídeo para pausar, adiantar ou retroceder o vídeo. O sistema também possui um chat que no momento apenas as últimas 50 mensagens do chat ficam disponíveis para visualização. A Aplicação também possui uma contagem de usuários online nas salas.

#### Link da aplicação: 
https://eruralplay.netlify.app

### Principais Tecnologias Utilizadas

* [Vue.js](https://vuejs.org/)
* [Bootstrap Vue](https://bootstrap-vue.org/)
* [Socket.io](https://socket.io/)
* [MongoDB](https://www.mongodb.com/try/download/community)

### Início

Para executar o projeto será necessário instalar os seguintes programas:

* [Visual Studio Code](https://code.visualstudio.com/) (recomendado)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/try/download/community)

Para iniciar é necessário clonar o projeto do GitHub num diretório de sua preferência através do terminal:

```shell
git clone https://github.com/eurobsonrosa/eruralplay.git
```

#### Instalação das Dependências

Abra o terminal na pasta do projeto e entre entre em cada uma das pastas para instalar as dependências executando os comandos abaixo:

```shell
$ cd frontend
$ npm install

$ cd ../backend
$ npm install
```
#### Variáveis de Ambiente

Para o correto funcionamento do projeto crie um arquivo .env usando como base o arquivo .env.example que está em cadas uma das pastas e preencha todos os dados. (os campos VUE_APP_SOCKET_ENDPOINT e VUE_APP_BASE_API_URL utilizam a mesma URL no momento.)

#### Start na Aplicação

Para rodar o servidor execute pelo terminal o comando dentro da pasta backend:

```shell
$ npm start
```

Esse comando irá iniciar a aplicação através da porta que você informar no .env Ex.: PORT=3000 você acessará o servidor pela URL [http://localhost:3000](http://localhost:3000)

Para dar start no frontend execute pelo terminal o comando dentro da pasta frontend:

```shell
$ npm run serve
```

Esse comando irá iniciar a aplicação através da porta padrão 8080 que você acessará pela URL [http://localhost:8080](http://localhost:8080). Caso está porta não esteja disponível a URL da porta irá aperecer no terminal.


### Deploy e Publicação

Para Deploy do Backend foi utilizado o [Railway](https://railway.app/).
Para Deploy do Frontend foi utilizado o [Netlify](https://app.netlify.com/).


## Próximos Recursos

- [ ] Upload de Vídeos
- [ ] URL de vídeos de outras plataformas


### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
