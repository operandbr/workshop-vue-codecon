import Vue from 'vue'
import Router from 'vue-router'

// Aqui vamos carregar nossos componentes, importando eles desta maneira serão criados arquivos separados para cada um dos componentes e estes só serão carregados após a rota ser acessada.
const Login = () => import('@/views/Login' /* webpackChunkName: "login" */)
const Register = () => import('@/views/Register' /* webpackChunkName: "register" */)
const Chat = () => import('@/views/Chat' /* webpackChunkName: "chat" */)
Vue.use(Router)

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
