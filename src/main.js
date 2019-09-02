import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Avatar from '@/components/Avatar' // Importação do componente
import 'bootstrap-css-only/css/bootstrap.min.css'
import moment from 'moment'

moment.locale('pt-br')
Vue.filter('timeAgo', (date) => {
  if (date && 'seconds' in date) {
    return moment.unix(date.seconds).fromNow()
  }
})

import firebase from 'firebase' // Importa o firebase instalado com npm
import config from './config' // Importa o objeto de configuração

firebase.initializeApp(config) // Inicializa o firebase com a configuração definida no arquivo
window.firebase = firebase

Vue.component('Avatar', Avatar) // Registrando o componente de maneira global
Vue.config.productionTip = false

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
