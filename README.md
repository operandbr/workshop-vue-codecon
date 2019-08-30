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