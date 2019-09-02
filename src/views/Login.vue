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
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Seu email"
                  v-model.trim="email"
                >
              </div>
              <div class="form-group">
                <label for="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Senha"
                  v-model.trim="password"
                  @keyup.enter="login"
                >
              </div>
              <button
                type="button"
                class="btn btn-orange btn-block"
                :disabled="isLoading"
                @click="login"
              >Acessar</button>
            </form>
          </div>
        </div>
        <div class="mt-2 alert alert-danger" v-if="errors.length">
          <div v-for="(error, index) in errors" :key="`error-${index}`"> {{error}}</div>
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
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      errors: [],
      isLoading: false
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
}
</script>
