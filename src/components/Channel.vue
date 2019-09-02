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
