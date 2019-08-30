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