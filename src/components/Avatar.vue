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
