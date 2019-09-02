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
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Seu nome"
                  v-model.trim="name"
                >
              </div>
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
                >
              </div>
              <div class="form-group">
                <label for="password-confirm">Confirmação de Senha</label>
                <input
                  type="password"
                  class="form-control"
                  id="password-confirm"
                  placeholder="Confirmação de senha"
                  v-model.trim="passwordConfirm"
                  @keyup.enter="register"
                >
              </div>
              <button
                type="button"
                class="btn btn-orange btn-block"
                :disabled="isSaving"
                @click="register"
              >Cadastrar</button>
            </form>
          </div>
        </div>
        <div class="mt-2 alert alert-danger" v-if="errors.length">
          <div v-for="(error, index) in errors" :key="`error-${index}`"> * {{error}} </div>
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
  name: 'Register',
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
}
</script>
