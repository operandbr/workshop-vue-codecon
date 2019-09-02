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
        v-model.trim="name"
        @keyup.enter="addChannel"
        @keyup.esc="toggleAddChannel"
        @keydown.space.prevent
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
    },
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
