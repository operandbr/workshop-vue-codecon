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