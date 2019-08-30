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