# workshop-vue-codecon

## **STEP 0** - *Criação do projeto*

Durante o projeto irei utilizar o Visual Studio Code (vscode) Ferramenta para edição de códigos fonte desenvolvida pela Microsoft. 

Sinta-se livre para utilizar o editor de sua preferência.

Caso queira utilizar o vscode
```
https://code.visualstudio.com/
```

Para uma melhor experiência com o projeto é recomendada a instalação de algumas extensões, são elas:
* **Vetur** (Dá suporte aos arquivos .vue)
* **EditorConfig for VS Code** (ajuda a manter o padrão de código com base no arquivo .editorConfig do projeto)
* **ESLint** (Mostra no editor erros e possíveis correções sugeridas pelo linter de acordo com as configurações do projeto)

## Instalar o nodejs

### Ubuntu / Debian
```
sudo apt install nodejs
```

### Fedora
```
sudo dnf install nodejs
```

### Windows / Mac OS
Baixe o arquivo no site oficial e execute o instalador
```
https://nodejs.org/
```

### Para verificar a versão digite
```
nodejs -v
```

## Instalar o Vue Cli
```
sudo npm install -g @vue/cli
```

### Para verificar a versão digite
```
vue --version
```

## Criar o projeto utilizando o Vue Cli
Acesse a pasta onde o projeto ficará armazenado

`Obs: (O Vue Cli irá criar uma pasta com o nome do projeto portanto não é necessário criar esta pasta)`

Em seguida digite o comando abaixo substituindo project-name pelo nome do seu projeto
```
vue create project-name
```

* Escolha a opção de configuração manual em seguida tecle enter
* Mantenha selecionadas as opções `Babel` e `Linter / Formatter`
* Marque as opções `Router` e `Vuex` e `CSS Pre-processors` utilizando as setas e a barra de espaço em seguida tecle enter
* History mode: Y
* Sass/SCSS (with dart-sass)
* EsLint + Standard  Config
* Lint on save
* In dedicated config files
* Save config: N


## Abra a pasta do projeto no editor de sua preferência

### No caso de estar usando vscode você pode usar o terminal embutido no editor para rodar a aplicação. Clique no menu Terminal -> New Terminal, e no terminal que irá se abrir na parte inferior digite o comando abaixo. Caso seu Editor não possua terminal integrado execute o comando em outro terminal.
```
npm run serve
```

### Scripts disponíveis com o projeto criado
### `serve`: Inicia um novo servidor de desenvolvimento para o projeto com `hot reload` já configurado.

### `build`: Gera um pacote pronto para ser publicado da sua aplicação, por padrão dentro da pasta `dist/`

### `lint`: Verifica erros de sintaxe e padrões de código definidos para o projeto.

---
## **STEP 1** - *Limpar projeto, criar novas views*

Ao criar o projeto com o `Vue Cli` são criados alguns arquivos e códigos de exemplo, vamos remover os mesmos e criar os nossos.

1) No arquivo `App.vue` vamos manter apenas:
```html
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```

> Observe que ao salvar o arquivo a aplicação foi re-compilada e o browser onde a aplicação foi atualizado! Este é o `hot-reload` mencionado anteriormente.

2) Dentro do arquivo router.js remova o `import` da view `Home` e as rotas já cadastradas no Array `routes`, ficando desta maneira:

```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: []
})
```

3) Na pasta views remova os arquivos `About.vue` e `Home.vue`
4) Na pasta components remova o arquivo `HelloWorld.vue`
5) Na pasta assets remove o arquivo `logo.png`

## Tudo limpo!! Vamos começar :D

### Nosso projeto irá contar com três views principais:

* `Login.vue`
* `Register.vue`
* `Chat.vue`

## Então vamos criar estes 3 arquivos na pasta views.

No `Vue` costumamos trabalhar com `single file components` isso significa que tanto o template `html` quanto o código `JS` e o `CSS` deste componente ficam num único arquivo.

```
Vamos criar um `código base` nos arquivos que acabamos de criar, copie o código abaixo cole nos componentes SUBSTITUINDO ComponentName pelo nome do seu componente
```

```html
<template>
  <!-- Aqui vai todo o template -->
  <div>
    ComponentName
  </div>
</template>

<script>
// Aqui vai todo código JS do componente
export default {
  name: 'ComponentName'
}
</script>

<style>
/* Aqui vai todo o CSS do componente */
</style>
```

## Ok, componentes criados!! Vamos colocar eles na tela!

No arquivo `router.js` vamos criar a rota para cada uma das views, especificando qual componente deve ser carregado em cada uma delas.

Após o `import` do `vue-router` adicione:
```javascript
// Aqui vamos carregar nossos componentes, importando eles desta maneira serão criados arquivos separados para cada um dos componentes e estes só serão carregados após a rota ser acessada.
const Login = () => import('@/views/Login' /* webpackChunkName: "login" */)
const Register = () => import('@/views/Register' /* webpackChunkName: "register" */)
const Chat = () => import('@/views/Chat' /* webpackChunkName: "chat" */)
```

E substitua o array `routes` por:
```javascript
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'chat',
      path: '/',
      component: Chat
    },
    // Ao definirmos uma rota com path * significa que tudo que não coincidir com uma das rotas já definidas irá utilizar esta rota. Útil para construção de páginas de erro 404 por exemplo. No nosso caso iremos redirecionar para o chat.
    {
      path: '*',
      redirect: '/'
    }
  ]
```

## Feito isso já conseguiremos visualizar nossos componentes acessando suas rotas

---
---
## **STEP 2** - *Instalação bootstrap, criação layout*

Para o nosso projeto vamos utilizar o [Bootstrap 4](https://getbootstrap.com/) para facilitar o processo de criação do layout. Utilizaremos também os ícones do material.

Na pasta do projeto digite:
```
npm i bootstrap-css-only --save
```

No arquivo `main.js` adicione o import do arquivo do bootstrap abaixo dos imports já existentes
```
import 'bootstrap-css-only/css/bootstrap.min.css'
```

### Ok, Bootstrap instalado com sucesso vamos aos ícones

No arquivo `public/index.html` logo abaixo de:
```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```
Adicione a tag para o css dos ícones.
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
> O arquivo `index.html` na pasta `public` é o arquivo onde todo os nossos códigos serão renderizados

### Agora vamos ao layout!

`App.vue` : Logo abaixo do template vamos adiconar este bloco de estilo
```html
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Satisfy|Source+Code+Pro&display=swap');

html, body, #app {
  height: 100%;
}

* {
  font-family: 'Open Sans', sans-serif;
}

pre {
  font-family: 'Source Code Pro', monospace !important;
}

$orange: #fe8e2a;

.form-control:focus {
    border-color: $orange !important;
    box-shadow: 0 0 0 0.2rem rgba($orange, .25) !important;
}

.btn.focus, .btn:focus {
    box-shadow: 0 0 0 0.2rem rgba($orange, .25) !important;
}

.text-cursive {
  font-family: 'Satisfy', cursive;
}

.text-30 {
  font-size: 30px;
}

.btn-link {
  color: $orange !important;
}

.btn-orange {
  background-color: $orange !important;
  color: #fff !important;
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar:horizontal {
    height: 12px;
}

::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: rgba(#f5f5f5, .5);
    border-radius: 12px;
}

::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: rgba(#ccc, .5);
    &:hover {
        background-color: rgba(#ccc, .9);
    }
}
</style>
```

## Nos arquivos `Login.vue Register.vue Chat.vue` a seguir estão o layout estático da aplicação

`Login.vue`
```html
<template>
  <div class="d-flex flex-column justify-content-center align-items-center h-100 bg-light">
    <div class="row w-100">
      <div class="col col-sm-12 col-md-4 offset-md-4">
        <div class="col text-center text-cursive text-30 pb-2">
          WorkshopVue
        </div>
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="email">Endereço de email</label>
                <input type="email" id="email" class="form-control" placeholder="Seu email">
              </div>
              <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" id="password" class="form-control" placeholder="Senha">
              </div>
              <button type="button" class="btn btn-orange btn-block" >Acessar</button>
            </form>
          </div>
        </div>
        <div class="mt-2 text-center">
        <!-- router-link componente para navegação entre as rotas do vue-router -->
          Não possui uma conta? <router-link to="/register">Cadastre-se aqui</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
```

`Register.vue`
```html
<template>
  <div class="d-flex flex-column justify-content-center align-items-center h-100 bg-light">
    <div class="row w-100">
      <div class="col col-sm-12 col-md-4 offset-md-4">
        <div class="col text-center text-cursive text-30 pb-2">
          WorkshopVue
        </div>
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" id="name" class="form-control" placeholder="Seu nome">
              </div>
              <div class="form-group">
                <label for="email">Endereço de email</label>
                <input type="email" id="email" class="form-control" placeholder="Seu email">
              </div>
              <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" id="password" class="form-control" placeholder="Senha">
              </div>
              <div class="form-group">
                <label for="password-confirm">Confirmação de Senha</label>
                <input type="password" class="form-control" id="password-confirm" placeholder="Confirmação de senha">
              </div>
              <button type="button" class="btn btn-orange btn-block" >Cadastrar</button>
            </form>
          </div>
        </div>
        <div class="mt-2 text-center">
          Já possui uma conta? <router-link to="/login">Faça login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>
```

`Chat.vue`
```html
<template>
  <div class="container-fluid h-100 p-0 d-flex">
    <!-- Sidebar -->
    <div class="w-25 sidebar">
      <!-- Current User -->
      <div class="current-user bg-light d-flex align-items-center flex-nowrap p-2">
      </div>

      <!-- Channels List -->
      <div class="channels-list bg-light p-2">
      </div>
    </div>

    <!-- Channel Area -->
    <div class="d-flex flex-column w-75">
      <!-- Channel Header -->
      <div class="channel-header bg-light p-2 d-flex align-items-center">
      </div>
      <!-- Channel Messages -->
      <div class="channel-messages flex-grow-1 p-2" ref="channelMessages">
      </div>
      <!-- Message Form -->
      <div style="height: 50px;" class="message-form border-top d-flex align-items-center">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat'
}
</script>

<style lang="scss">
$border-color: #c2c6ca;
.sidebar {
  border-right: 1px solid $border-color;
}

.current-user {
  height: 75px;
  font-size: 1.25rem;
  border-bottom: 1px solid $border-color;
}

.channels-list {
  height: calc(100% - 75px);
  overflow-y: auto;
}

.channel-header {
  height: 75px;
  font-size: 1.25rem;
  border-bottom: 1px solid $border-color;
}

.channel-messages {
  height: calc(100% - 125px);
  overflow-y: auto;
}

.fade-enter-active {
    animation: fade-in 300ms ease-out forwards;
}

.fade-leave-active {
    animation: fade-out 300ms ease-out forwards;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fade-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
```
---
## **STEP 3** - *Criação dos componentes*

Apenas para demonstração iremos criar alguns dados de exemplo para nossa aplicação.

No arquivo `Chat.vue` substitua o bloco de script pelo bloco abaixo:
```html
<script>
export default {
  name: 'Chat',
  data () {
    return {
    // Usuário logado (apenas temporariamente até realizarmos o login utilizando firebase)
      currentUser: {
        id: 1,
        displayName: 'Eduardo Schröder'
      },
      messages: []
    }
  },
  // Lifecycle Hook created... (https://vuejs.org/v2/api/#Options-Lifecycle-Hooks)
  created () {
    for (let i = 1; i <= 50; i++) {
      this.messages.push({
        id: i,
        content: `Mensage de teste ${i}`,
        timestamp: Date.now(),
        user: {
          id: 1,
          name: 'Eduardo Schröder'
        }
      })
    }
  }
}
</script>
```
Nesta etapa iremos criar os nossos componentes.

Todos os componentes criados nesse passo ficarão dentro de `@/components/`
> `@` é um alias para a pasta src do projeto

Vamos começar pelo componente do avatar do usuário:

`Avatar.vue`
```html
<template functional>
  <img
    class="user-avatar img-thumbnail rounded-circle"
    :src="`https://ui-avatars.com/api/?size=${props.size || 48}&name=${props.name || 'User Name'}&background=fe8e2a&color=fff`"
  >
</template>

<style lang="scss">
.user-avatar {
  flex-shrink: 0;
}
</style>
```

### Componentes Funcionais

```
O nosso componente de avatar é um componente bastante simples, em casos como esse podemos marcar eles como funcionais, o que significa que eles são stateless (sem estado), ou seja sem data e são instanceless, ou seja sem o contexto this.

Como os componentes funcionais são apenas funções eles são muito mais leves para renderizar e esta é a grande vantagem em utilizá-los. Principalmente se ele for utilizado em listas.
```

### Componente criado, vamos registrá-lo.

Podemos registrar os nossos componentes de modo que possuam escopo global (você terá acesso ao componente em todos os componentes da sua aplicação), ou local (ele só ficará disponível dentro do componente onde foi instanciado).

Para este exemplo vamos instanciar este componente como global e os demais como local.

No arquivo `main.js` adicione o import do componente de Avatar na lista de imports.

```javascript
import Avatar from '@/components/Avatar' // Importação do componente
```

Depois da lista de imports adicione a linha para registrar o componente
```javascript
Vue.component('Avatar', Avatar) // Registrando o componente de maneira global
```

### Componente registrado vamos utilizá-lo!!

`Chat.vue`: dentro da div com a classe `current-user` adicione o conteúdo
```html
<avatar :name="currentUser.displayName"/> <!-- Utilização do componente -->
<div class="ml-2 text-truncate">{{currentUser.displayName}}</div> <!-- Nome do Usuário logado -->
<button class="btn btn-sm btn-link ml-auto"><i class="material-icons">exit_to_app</i></button> <!-- Botão para sair do chat -->
```

`AddChannel.vue`: Componente para adicionar canais
```html
<template>
  <div>
    <div class="text-center">
      Canais
      <button title="Adicionar Canal" class="btn btn-sm btn-link toggle-add-button" @click="toggleAddChannel"><i class="material-icons">add_circle_outline</i></button>
    </div>
    <transition name="fade">
      <div v-if="isAdding" class="d-flex p-1 mb-1 border rounded add-channel-container">
        #<input
          maxlength="32"
          type="text"
          class="new-channel ml-1"
          ref="addChannelInput"
        />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      isAdding: false
    }
  },
  methods: {
    toggleAddChannel () {
      this.isAdding = !this.isAdding

      if (!this.isAdding) return
      // Seta o foco no input
      this.$nextTick(() => {
        this.$refs.addChannelInput.focus()
      })
    }
  }
}
</script>

<style lang="scss">
.new-channel {
  border: 0;
  outline: none;
  width: 100%;
  background-color: transparent;
}

.add-channel-container {
  border-color: #fe8e2a !important;
}

.toggle-add-button:focus {
  box-shadow: none !important;
}
</style>
```

### Vamos registrálo localmente em `views/Chat.vue`
Logo após a abetura da tag `script` adicione o import do componente
```javascript
import AddChannel from '@/components/AddChannel'
```

E adicione uma chave `components` no objeto do componente
```javascript
components: {
  AddChannel
},
```

### Agora vamos adicioná-lo ao template no mesmo arquivo
Dentro da div com a classe `channels-list` adicione a tag
```html
<add-channel/>
```

`Channel.vue`: Componente para a lista de canais
```html
<template functional>
  <div class="d-flex channel rounded p-1 mb-1">
    <div class="w-100">#{{props.name}}</div>
    <button
      title="Arquivar"
      type="button"
      class="ml-auto d-flex align-items-center btn btn-link btn-sm p-0"
    >
      <i class="material-icons">archive</i>
    </button>
  </div>
</template>

<style lang="scss">
$border-color: #c2c6ca;
.channel {
  border: 1px solid $border-color;
  align-items: center;
  cursor: pointer;

  &.is-active {
    background-color: #fff;
    border-color: #fe8e2a;
  }

  &:not(.is-active):hover {
    background-color: #f1f1f1;
  }
}
</style>
```

### Vamos registrá-lo do mesmo modo que o anterior

Adicione o `import` na lista
```js
import Channel from '@/components/Channel'
```

E adicione a declaração do componente
```javascript
components: {
  AddChannel,
  Channel
},
```

Logo abaixo da tag `add-channel` adicione:
```html
<channel v-for="i in 20" :key="`channel-${i}`" :name="`channel-${i}`"/>
```
`Loader.vue`: Loader para exibir enquanto estiver carregando as mensagens
```html
<template functional>
  <div class="text-center">
    <div class="lds-ellipsis">
      <div v-for="i in 4" :key="`loader-div-${i}`"/>
    </div>
  </div>
</template>

<style lang="scss">

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #ccc;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    &:nth-child(1) {
      left: 6px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    &:nth-child(2) {
      left: 6px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(3) {
      left: 26px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(4) {
      left: 45px;
      animation: lds-ellipsis3 0.6s infinite;
    }
  }
}
</style>
```

Adicione o `import` na lista
```js
import Loader from '@/components/Loader'
```

E adicione a declaração do componente
```javascript
components: {
  AddChannel,
  Channel,
  Loader
},
```

Vamos adicionar dentro da div com a classe `channel-messages` a tag
```html
<loader />
```

`Message.vue`: Componente para a lista de mensagens do canal ativo
```html
<template functional>
  <div :class="['message mb-2', {'from-me': props.currentUser && props.message.user.id === props.currentUser.id}]" :key="data.key || _uid">
    <div class="message-avatar">
      <avatar :name="props.message.user.name" :size="24"/>
    </div>
    <div class="message-text border rounded d-flex flex-column mx-1 px-2 py-1">
      <small class="font-italic">
        <span class="font-weight-bold">{{ props.message.user.name }}</span>
        {{ props.message.timestamp }}:
      </small>
      <pre class="m-0">{{ props.message.content }}</pre>
    </div>
  </div>
</template>

<style lang="scss">
.message {
  display: flex;
  flex-direction: row;

  .message-text {
    max-width: 70%;
  }

  .message-avatar {
    min-width: 34px;
  }

  &.from-me {
    flex-direction: row-reverse;
  }
}
</style>
```

### Vamos registrá-lo do mesmo modo que o anterior

Adicione o `import` na lista
```js
import Message from '@/components/Message'
```

E adicione a declaração do componente
```javascript
components: {
  AddChannel,
  Channel,
  Loader,
  Message
},
```

Adicione o código a seguir abaixo da tag `loader`
```html
<message v-for="message in messages" :message="message" :key="`message-${message.id}`" :current-user="currentUser"/>
```

`MessageForm.vue`: Componente para enviar as mensagens
```html
<template>
  <div class="message-form d-flex align-items-center bg-light">
    <textarea placeholder="Digite aqui sua mensagem" class="bg-light" ref="textarea"/>
    <button class="btn btn-sm btn-orange border-left">
      <i class="material-icons">message</i>
    </button>
  </div>
</template>

<style lang="scss">
.message-form {
  background-color: #fff;
  border-top: 1px solid #c2c6ca;
  height: 50px;

  textarea {
    padding: 0.70rem 1rem;
    height: 46px;
    width: calc(100% - 50px) ;
    border: 0;
    resize: none;
    border-radius: 0;

    &::placeholder {
      font-style: italic;
      font-size: 15px;
    }

    &:focus {
      outline: none;
    }
  }

  button {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;

    &:focus {
      box-shadow: none !important;
    }
  }
}
</style>
```

Adicione o `import` na lista
```javascript
import MessageForm from '@/components/MessageForm'
```

E adicione a declaração do componente
```javascript
components: {
  AddChannel,
  Channel,
  Loader,
  Message,
  MessageForm
},
```

SUBSTITUA a div com a classe `message-form` pelo seu componente
```html
<message-form />
```
---
## **STEP 4** - *Configuração do Firebase*

Nesta etapa vamos criar o nosso projeto no firebase, configurar a aplicação e criar a autenticação com o firebase.

Para começar vamos acessar o [firebase console](https://console.firebase.google.com/)
`https://console.firebase.google.com/`

Se ainda não possuir acesso crie uma conta com sua conta do google, o firebase possui um plano gratuito que é mais do que suficiente para nossos testes.

Ok, com a conta criada:
 * clique em Adicionar projeto.
 * Insira o nome do seu projeto e clique em Continuar
 * Neste segundo passo sobre o Google Analytics escolha "Agora não" e clique em criar projeto.

Após alguns segundos seu projeto será criado.

### Vamos habilitar a autenticação
Clique em continuar e na barra no lado esquerdo clique em **Authentication**, em seguida clique em **Configurar método de login**, na lista que irá abrir passe o mouse por cima da opção `Email/Senha` e clique no ícone em formato de lápis para editar. Ative o primeiro item e clique em Salvar. 

Isso nos permitirá utilizar os métodos do firebase para registro de novos usuários e login.

### Agora vamos criar o banco de dados da nossa aplicação.
Na barra lateral clique em Database, a primeira opção disponível deve ser o Cloud Firestore, clique em **Criar banco de dados**, na janela que irá abrir deixe a opção selecionada, clique em **Próxima**, e na próxima tela em **Concluído**.


Na tela que irá abrir clique na aba Regras, nesta tela estão as regras de acesso ao banco de dados.
Substitua o texto exibido pelo texto abaixo e clique em Publicar
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```
Esta configuração tornará o banco de dados visível apenas para usuários logados!

### Canal padrão do chat

Para nosso exemplo teremos um canal padrão chamado **todos**, vamos criá-lo no firebase
volte na aba **Dados** e clique em **Iniciar Coleção**

Código da coleção:
```
channels
```

Clique em `Próxima` e preencha com os dados abaixo depois clique em **Salvar**
* Código do documento: todos
 * Campos:

| Campo     | Tipo      | Valor      |
|-----------|-----------|------------|
| archived  | boolean   | false      |
| createdAt | timestamp | Data Atual |
| name      | string    | todos      |

### Agora vamos adicionar o firebase na nossa aplicação

Na pasta do projeto digite:
```
npm install --save firebase
```

Agora no nosso projeto do firebase vamos criar um `app` e pegar as configurações de acesso ao projeto, clicando em `Project Overview`, em seguida no ícone para criar um novo projeto `Web`, escolha o nome do app e clique em `Adicionar`.

Dentro da pasta `src` crie uma pasta `config` que irá conter a configuração do firebase, nela crie um arquivo chamado `index.js` com o conteúdo abaixo porém o valor de cada uma das chaves é o valor que consta no objeto `firebaseConfig` que está sendo exibido na tela de criação do projeto.
```
export default {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
}
```

Feito isto vamos alterar o arquivo `main.js` para conectar ao firebase e verificar se o usuário está logado.

Adicione no fim da lista dos imports do `main.js`:
```javascript
import firebase from 'firebase' // Importa o firebase instalado com npm
import config from './config' // Importa o objeto de configuração

firebase.initializeApp(config) // Inicializa o firebase com a configuração definida no arquivo
window.firebase = firebase
```

Ainda no `main.js` vamos adicionar um listener para quando o usuário fazer login / logout 
```javascript
firebase.auth().onAuthStateChanged(user => { // Verifica se o Usuário está logado
  store.dispatch('setCurrentUser', user) // Adiciona o usuário logado na store
  /* eslint-disable no-new */
  // Renderiza a aplicação
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
```

### Vamos atualizar nossa store para armazenar os dados do usuário logado
`store.js`
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // Estado da aplicação contém os dados que podem ser facilmente acessados por todos os componentes
  state: {
    currentUser: null
  },
  // Servem para retornar / filtrar os dados armazenados no state
  getters: {
    currentUser: (state) => state.currentUser
  },
  // Servem para armazenar / alterar dados na store as mutations devem ser síncronas
  // Recebem como primeiro parâmetro o state e por segundo o payload enviado pela action
  mutations: {
    SET_CURRENT_USER: (state, user) => (state.currentUser = user)
  },
  // As actions são semelhantes às mutações, as diferenças são as seguintes:
  // Em vez de mudar o estado, as actions confirmam (ou fazem commit de) mutações.
  // As actions podem conter operações assíncronas arbitrárias.
  actions: {
    setCurrentUser: ({ commit }, user) => commit('SET_CURRENT_USER', user)
  }
})
```

### Vamos alterar também o `router.js` para validar se o usuário está logado antes de acessar a rota
```javascript
// Redireciona o usuário para o chat caso o usuário já esteja logado
const redirectToChat = (to, from, next) => window.firebase.auth().currentUser ? next('/') : next()
// Redireciona o usuário para o login se o usuário não estiver logado
const redirectToLogin = (to, from, next) => !window.firebase.auth().currentUser ? next('/login') : next()

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login,
      beforeEnter: redirectToChat
    },
    {
      name: 'register',
      path: '/register',
      component: Register,
      beforeEnter: redirectToChat
    },
    {
      name: 'chat',
      path: '/',
      component: Chat,
      beforeEnter: redirectToLogin
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
```

### Agora vamos fazer o formulário de registro de novo usuário funcionar

1) Vamos adicionar ao script as váriaveis reativas que iremos utilizar
`Register.vue`
```javascript
  data () {
    return {
      // Variáveis para armazenar os dados do formulário
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      // Variável para armazenar possíveis erros
      errors: [],
      // Variável booleana para saber quando o formulário está sendo salvo
      isSaving: false,
      // Referência para a coleção de usuários salva no firebase
      usersRef: window.firebase.firestore().collection('users')
    }
  },
```
2) Adicionar os métodos para fazer o registro do usuário
```javascript
  methods: {
    isFormValid () {
      // Verificação se os dados estão preenchidos
      const hasEmptyFields = ['name', 'email', 'password', 'passwordConfirm'].some(field => this[field].length === 0)
      if (hasEmptyFields) {
        this.errors.push('Todos os campos são obrigatórios')
        return false
      }

      // Verificação se a senha bate com a confirmação de senha
      if (this.password !== this.passwordConfirm) {
        this.errors.push('Senha e confirmação são diferentes')
        return false
      }

      return true
    },
    register () {
      // Limpa o array de erros para evitar registros duplicados
      this.errors = []
      // Verifica se está salvando e se o formulário é valido
      if (this.isSaving || !this.isFormValid()) return
      // Define que o formulário está sendo salvo para evitar envio em duplicidade
      this.isSaving = true
      // Utiliza o método fornecido pelo firebase para criação de um usuário a partir de e-mail e senha
      window.firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(({ user }) => {
          // Atualiza o nome do usuário salvo com o nome digitado no formulário de registro
          user
            .updateProfile({
              displayName: this.name
            })
            .then(() => {
              // Salva ele no banco de dados do firestore
              this.usersRef.doc(user.uid)
                .set({
                  id: user.uid,
                  email: user.email,
                  name: user.displayName
                })
                .then(() => {
                  this.$store.dispatch('setCurrentUser', user)
                  this.$router.push('/')
                })
            })
            .catch(error => {
              this.errors.push(error.message)
            })
            .finally(() => (this.isSaving = false))
        })
        .catch(error => {
          this.errors.push(error.message)
        })
        .finally(() => (this.isSaving = false))
    }
  }
```
3) Adicionar v-model no input do nome do usuário
> `v-model` é uma diretiva do view que nos fornece o chamado `two way data-binding` isso quer dizer que tudo que o usuário digitar no campo será armazenado na variável vinculada e o que for alterado na variável via código será refletido no campo!
```html
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Seu nome"
                  v-model.trim="name"
                >
```
4) Adicionar v-model no input do email
```html
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Seu email"
                  v-model.trim="email"
                >
```
5) Adicionar v-model no input da senha
```html
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Senha"
                  v-model.trim="password"
                >
```
6) Adicionar v-model no input da confirmação de senha.
E adicionar o listener para o evento keyup usando o modificador `enter` para executar o método de registro ao teclar enter.
```html
                <input
                  type="password"
                  class="form-control"
                  id="password-confirm"
                  placeholder="Confirmação de senha"
                  v-model.trim="passwordConfirm"
                  @keyup.enter="register"
                >
```
7) Adicionar listener para o evento click do botão. E alterar o atributo `disabled` enquanto estiver salvando.
```html
              <button
                type="button"
                class="btn btn-orange btn-block"
                :disabled="isSaving"
                @click="register"
              >Cadastrar</button>
```
8) Adicionar a exibição dos erros antes da div que possui o link para o login
> A diretiva v-if serve para adicionar ou remover elementos do DOM baseado no booleano fornecido
```html
        <div class="mt-2 alert alert-danger" v-if="errors.length">
          <div v-for="(error, index) in errors" :key="`error-${index}`"> * {{error}} </div>
        </div>
```

## Cadastro Realizado!! Usuário Logado no chat!

Vamos alterar agora o arquivo `Chat.vue` para buscar o usuário armazenado na store removendo do objeto data a propriedade `currentUser` e adicionando um bloco de computeds abaixo do data.

```javascript
  data () {
    return {
      messages: []
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    }
  },
```

Ainda no arquivo `Chat.vue` vamos adicionar um método para o logout abaixo do bloco `computed`

```javascript
  methods: {
    logout () {
      window.firebase.auth().signOut()
        .then(() => {
          this.$store.dispatch('setCurrentUser', null)
          this.$router.push('/login')
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  },
```

Adicionar um listener para o evento `click` no **botão de sair**

```html
<button class="btn btn-sm btn-link ml-auto" @click="logout"><i class="material-icons">exit_to_app</i></button>
```

E uma verificação para o usuário logado na div principal do chat
```html
<div class="container-fluid h-100 p-0 d-flex" v-if="currentUser">
```

## Clique no botão de sair para fazer o logout!

### Agora que já efetuamos o cadastro e o logout precisamos fazer o Login! Para podermos acessar novamente a aplicação :D

`Login.vue`
1) Vamos começar adicionando as variáveis para o formulário e os métodos para o login
```javascript
  data () {
    return {
      email: '',
      password: '',
      errors: [],
      isLoading: false,
    }
  },
  methods: {
    login () {
      this.errors = []
      if (this.isLoading || !this.isFormValid()) return
      this.isLoading = true
      window.firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.dispatch('setCurrentUser', user)
          this.$router.push('/')
        })
        .catch(error => {
          this.errors.push(error.message)
          this.isLoading = false
        })
    },
    isFormValid () {
      if (!this.email.length || !this.password.length) {
        this.errors.push('Todos os campos são obrigatórios')
        return false
      }
      return true
    }
  }
```
2) Adicionar v-model no campo de e-mail
```html
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Seu email"
                  v-model.trim="email"
                >
```
3) Adicionar v-model e listener no evento keyup novamente utilizando o modifier `enter` para executar o método de login ao teclar enter
```html
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Senha"
                  v-model.trim="password"
                  @keyup.enter="login"
                >
```
4) Adicionar listener para o evento click e executar o método de login e desabilitar enquanto está carregando
```html
              <button
                type="button"
                class="btn btn-orange btn-block"
                :disabled="isLoading"
                @click="login"
              >Acessar</button>
```
5) Adicionar a exibição das mensagens de erro
```html
        <div class="mt-2 alert alert-danger" v-if="errors.length">
          <div v-for="(error, index) in errors" :key="`error-${index}`"> {{error}}</div>
        </div>
```

### Ok, Registro, logout e login criados utilizando o Firebase!!

## **STEP 5** - *Criação dos canais*

Vamos alterar o `AddChannel.vue` para adicionar os canais no firebase

* Vamos adicionar o `v-model` para atualizar a variável com o nome
* Um listener @keyup.enter
* Um listener @keyup.esc
* Um listener para o keyup.space adicionando um terceiro modificador chamado prevent que irá executar o método preventDefault() do evento disparado evitando assim que o espaço seja inserido no campo
```html
      #<input
        maxlength="32"
        type="text"
        class="new-channel ml-1"
        ref="addChannelInput"
        v-model.trim="name"
        @keyup.enter="addChannel"
        @keyup.esc="toggleAddChannel"
        @keydown.space.prevent
      />
```

Vamos adicionar o método `addChannel` no bloco de métodos
```javascript
    addChannel () {
      if (!this.name || this.name === 'todos') return
      window.firebase.firestore().collection('channels').doc(this.name)
        .set({
          name: this.name,
          archived: false,
          createdAt: window.firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          this.name = ''
          this.isAdding = false
        })
        .catch(error => console.error(error))
    }
```

### Feito isto os canais estão sendo armazenados no firebase, agora precisamos listar eles na aplicação

Vamos alterar o arquivo abaixo para listar os canais armazenados no firebase

`Chat.vue`
```html
<template>
  <div class="container-fluid h-100 p-0 d-flex" v-if="currentUser">
    <!-- Sidebar -->
    <div class="w-25 sidebar">
      <!-- Current User -->
      <div class="current-user bg-light d-flex align-items-center flex-nowrap p-2">
        <avatar :name="currentUser.displayName"/>
        <div class="ml-2 text-truncate">{{currentUser.displayName}}</div>
        <button class="btn btn-sm btn-link ml-auto" @click="logout"><i class="material-icons">exit_to_app</i></button>
      </div>

      <div class="channels-list bg-light p-2">
        <add-channel/>
        <!-- Lista de canais -->
        <channel
          v-for="(channel, index) in channels"
          :key="`channel-${index}`"
          :name="channel"
        />
      </div>
    </div>

    <div class="d-flex flex-column w-75">
      <div class="channel-header bg-light p-2 d-flex align-items-center">
        #todos
      </div>
      <div class="channel-messages flex-grow-1 p-2" ref="channelMessages">
        <loader/>
      </div>
      <message-form />
    </div>
  </div>
</template>

<script>
import AddChannel from '@/components/AddChannel'
import Channel from '@/components/Channel'
import Loader from '@/components/Loader'
import MessageForm from '@/components/MessageForm'

export default {
  name: 'Chat',
  components: {
    AddChannel,
    Channel,
    Loader,
    MessageForm
  },
  data () {
    // 1) Criação das variáveis para os canais
    return {
      channelsListRef: window.firebase.firestore().collection('channels'),
      channelListener: () => {},
      channels: []
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    logout () {
      window.firebase.auth().signOut()
        .then(() => {
          // Remove o listener antes de fazer logout
          this.channelListener()
          this.$store.dispatch('setCurrentUser', null)
          this.$router.push('/login')
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  },
  created () {
    // Define o um listener para quando os canais forem alterados atualize os canais da aplicação
    this.channelListener = this.channelsListRef
      .where('archived', '==', false)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        this.channels = querySnapshot.docs.map(doc => doc.id)
      })
  }
}
</script>

<style lang="scss">
$border-color: #c2c6ca;
.sidebar {
  border-right: 1px solid $border-color;
}

.current-user {
  height: 75px;
  font-size: 1.25rem;
  border-bottom: 1px solid $border-color;
}

.channels-list {
  height: calc(100% - 75px);
  overflow-y: auto;
}

.channel-header {
  height: 75px;
  font-size: 1.25rem;
  border-bottom: 1px solid $border-color;
}

.channel-messages {
  height: calc(100% - 125px);
  overflow-y: auto;
}

.fade-enter-active {
    animation: fade-in 300ms ease-out forwards;
}

.fade-leave-active {
    animation: fade-out 300ms ease-out forwards;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fade-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
```

Um erro irá aparecer no console clique no link que levará ao seu projeto do firebase e irá abrir uma tela para criação de um índice. clique em Criar Índice.
Após alguns minutos seu índice será criado. esse índice é necessário para aplicar o filtro dos canais arquivados que adicionamos no trecho de código abaixo:
```js
this.channelListener = this.channelsListRef
  .where('archived', '==', false)
  .orderBy('createdAt', 'desc')
  .onSnapshot((querySnapshot) => {
    this.channels = querySnapshot.docs.map(doc => doc.id)
  })
```

Agora vamos atualizar o componente de canais para:
1) emitir os eventos para trocar de canal e arquivar o canal
2) aplicar a classe is-active quando necessário

`Channel.vue`
```html
<template functional>
  <!-- Adicionada verificação para adicionar classe -->
  <div class="d-flex channel rounded p-1 mb-1" :class="{'is-active': props.isActive}">
    <!-- no evento click emite o evento activate -->
    <div class="w-100" @click="listeners.activate(props.name)">#{{props.name}}</div>
    <!-- Se o canal não for o todos aparece o botão -->
    <!-- Ao clicar no botão emite um evento archive -->
    <button
      v-if="props.name !== 'todos'"
      @click="listeners.archive(props.name)"
      title="Arquivar"
      type="button"
      class="ml-auto d-flex align-items-center btn btn-link btn-sm p-0"
    >
      <i class="material-icons">archive</i>
    </button>
  </div>
</template>

<style lang="scss">
$border-color: #c2c6ca;
.channel {
  border: 1px solid $border-color;
  align-items: center;
  cursor: pointer;

  &.is-active {
    background-color: #fff;
    border-color: #fe8e2a;
  }

  &:not(.is-active):hover {
    background-color: #f1f1f1;
  }
}
</style>
```

Na Store vamos adicionar as actions, mutations e getters referente ao canal
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    currentChannel: null
  },
  getters: {
    currentUser: (state) => state.currentUser,
    currentChannel: (state) => state.currentChannel
  },
  mutations: {
    SET_CURRENT_USER: (state, user) => (state.currentUser = user),
    SET_CURRENT_CHANNEL: (state, channel) => (state.currentChannel = channel)
  },
  actions: {
    setCurrentUser: ({ commit }, user) => commit('SET_CURRENT_USER', user),
    setCurrentChannel: ({ commit }, channel) => commit('SET_CURRENT_CHANNEL', channel)
  }
})
```
### Agora vamos alterar o `Chat.vue` para executar as ações de arquivar e definir o canal ativo

`Chat.vue`
```html
<template>
  <div class="container-fluid h-100 p-0 d-flex" v-if="currentUser">
    <!-- Sidebar -->
    <div class="w-25 sidebar">
      <!-- Current User -->
      <div class="current-user bg-light d-flex align-items-center flex-nowrap p-2">
        <avatar :name="currentUser.displayName"/>
        <div class="ml-2 text-truncate">{{currentUser.displayName}}</div>
        <button class="btn btn-sm btn-link ml-auto" @click="logout"><i class="material-icons">exit_to_app</i></button>
      </div>

      <div class="channels-list bg-light p-2">
        <add-channel/>
        <!-- adicionada prop is-active -->
        <!-- adicionados listeners activate e archive -->
        <channel
          v-for="(channel, index) in channels"
          :key="`channel-${index}`"
          :name="channel"
          :is-active="channel === currentChannel"
          @activate="setActiveChannel"
          @archive="archiveChannel"
        />
      </div>
    </div>

    <div class="d-flex flex-column w-75">
      <div class="channel-header bg-light p-2 d-flex align-items-center">
        <!-- Adicionado nome do canal ativo -->
        #{{ currentChannel }}
      </div>
      <div class="channel-messages flex-grow-1 p-2" ref="channelMessages">
        <loader/>
      </div>
      <!-- Adicionada referencia para o componente de formulario de nova mensagem -->
      <message-form ref="messageForm"/>
    </div>
  </div>
</template>

<script>
import AddChannel from '@/components/AddChannel'
import Channel from '@/components/Channel'
import Loader from '@/components/Loader'
import MessageForm from '@/components/MessageForm'

export default {
  name: 'Chat',
  components: {
    AddChannel,
    Channel,
    Loader,
    MessageForm
  },
  data () {
    return {
      channelsListRef: window.firebase.firestore().collection('channels'),
      channels: [],
      channelListener: () => {}
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    },
    currentChannel () {
      return this.$store.getters.currentChannel
    }
  },
  methods: {
    logout () {
      window.firebase.auth().signOut()
        .then(() => {
          this.channelListener()
          this.$store.dispatch('setCurrentUser', null)
          this.$router.push('/login')
        })
        .catch(error => {
          console.error(error.message)
        })
    },
    // Método para definir o canal atual na store
    setActiveChannel (channelName) {
      this.$store.dispatch('setCurrentChannel', channelName)
      this.$nextTick(() => {
        this.$refs.messageForm.$el.querySelector('textarea').focus()
      })
    },
    // Método para arquivar o canal no firebase
    archiveChannel (channelName) {
      if (this.currentChannel === channelName) {
        this.setActiveChannel('todos')
      }

      window.firebase.firestore()
        .collection('channels')
        .doc(channelName)
        .set({ archived: true }, { merge: true })
    }
  },
  created () {
    this.channelListener = this.channelsListRef
      .where('archived', '==', false)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        this.channels = querySnapshot.docs.map(doc => doc.id)
      })
    // Seta o canal todos ao acessar a aplicação
    this.setActiveChannel('todos')
  }
}
</script>

<style lang="scss">
$border-color: #c2c6ca;
.sidebar {
  border-right: 1px solid $border-color;
}

.current-user {
  height: 75px;
  font-size: 1.25rem;
  border-bottom: 1px solid $border-color;
}

.channels-list {
  height: calc(100% - 75px);
  overflow-y: auto;
}

.channel-header {
  height: 75px;
  font-size: 1.25rem;
  border-bottom: 1px solid $border-color;
}

.channel-messages {
  height: calc(100% - 125px);
  overflow-y: auto;
}

.fade-enter-active {
    animation: fade-in 300ms ease-out forwards;
}

.fade-leave-active {
    animation: fade-out 300ms ease-out forwards;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fade-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
```
---

## **STEP 6** - *Criação e listagem das mensagens*

Vamos atualizar o nosso `MessageForm.vue`
```html
<template>
  <div class="message-form d-flex align-items-center bg-light">
    <!-- Adicionado v-model -->
    <!-- Adicionado listener usando modificador prevent para evitar que quebre a linha -->
    <!-- Adicionada referência no textarea para permitir setar o foco novamente no campo -->
    <textarea
      placeholder="Digite aqui sua mensagem"
      class="bg-light"
      v-model.trim="message"
      @keydown.enter.prevent="sendMessage"
      ref="textarea"
    />
    <!-- Listener para enviar mensagem -->
    <button @click="sendMessage" class="btn btn-sm btn-orange border-left">
      <i class="material-icons">message</i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MessageForm',
  data () {
    return {
      message: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    },
    currentChannel () {
      return this.$store.getters.currentChannel
    }
  },
  methods: {
    // Método para enviar mensagem
    sendMessage () {
      if (!this.message) return
      window.firebase.firestore()
        .collection('messages')
        .doc(this.currentChannel)
        .collection('messages')
        .add({
          content: this.message,
          timestamp: window.firebase.firestore.FieldValue.serverTimestamp(),
          user: {
            name: this.currentUser.displayName,
            id: this.currentUser.uid
          }
        })
        .then(() => {
          this.message = ''
          this.$nextTick(() => {
            // Seta o foco no campo
            this.$refs.textarea.focus()
          })
        })
    }
  }
}
</script>

<style lang="scss">
.message-form {
  background-color: #fff;
  border-top: 1px solid #c2c6ca;
  height: 50px;

  textarea {
    padding: 0.70rem 1rem;
    height: 46px;
    width: calc(100% - 50px) ;
    border: 0;
    resize: none;
    border-radius: 0;

    &::placeholder {
      font-style: italic;
      font-size: 15px;
    }

    &:focus {
      outline: none;
    }
  }

  button {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;

    &:focus {
      box-shadow: none !important;
    }
  }
}
</style>
```

No arquivo `Chat.vue` nós vamos:

Adicionar uma referência na div onde são listadas as mensagens
```html
<div class="channel-messages flex-grow-1 p-2" ref="channelMessages">
```

Adicionar 3 propriedades novas ao objeto data
```
loadingMessages: false,
messages: [],
messageListener: () => {}
```

Criar o método para carregar as mensagens do canal
```javascript
    loadMessages () {
      if (!this.currentChannel) return
      this.loadingMessages = true
      this.messageListener = window.firebase.firestore()
        .collection('messages')
        .doc(this.currentChannel)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((querySnapshot) => {
          this.messages = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          this.loadingMessages = false
          this.$nextTick(() => {
            const animationDuration = 300
            setTimeout(() => {
              this.$refs.channelMessages.scrollTop = this.$refs.channelMessages.scrollHeight
            }, animationDuration)
          })
        })
    }
```

Adicionar um watch na propriedade currentChannel
```javascript
  watch: {
    currentChannel: {
      handler (currentChannel) {
        // Encerra conexão com o listener das mensagens do canal anterior
        this.messageListener()
        // Carrega as novas mensagens
        this.loadMessages()
      },
      immediate: true
    }
  }
```

Vamos adicionar novamente as mensagens à aplicação
```html
      <div class="channel-messages flex-grow-1 p-2" ref="channelMessages">
        <transition name="fade" mode="out-in">
          <transition-group name="fade" v-if="messages.length">
            <message
              v-for="message in messages"
              :message="message"
              :key="`message-${message.id}`"
              :current-user="currentUser"
            />
          </transition-group>
          <div key="no-records" v-else-if="!loadingMessages" class="alert alert-secondary font-italic">Nenhuma mensagem cadastrada até o momento</div>
          <div key="loading-records" class="text-center" v-else>
            <loader/>
          </div>
        </transition>
      </div>
```
Adicione novamente o import do componente
```js
import Message from '@/components/Message'
```
E a referência para ele
```js
  components: {
    AddChannel,
    Channel,
    Loader,
    MessageForm,
    Message
  },
```
## Feito isso as mensagens já podem ser enviadas e já estarão sendo listadas conforme o canal!! :D

Agora para melhorar a visualização vamos criar um filtro para formatação da data de criação das mensagens.

Vamos utilizar uma biblioteca chamada moment para isso.

na pasta do projeto digite:
```
npm i --save moment
```

no arquivo `main.js` importe a biblioteca
```javascript
import moment from 'moment'
```

e crie um filtro
```javascript
moment.locale('pt-br')
Vue.filter('timeAgo', (date) => {
  if (date && 'seconds' in date) {
    return moment.unix(date.seconds).fromNow()
  }
})
```

Por fim no arquivo `Message.vue` altere a linha onde é exibido o timestamp para aplicar o filtro
```
{{ props.message.timestamp | timeAgo }}:
```
---

