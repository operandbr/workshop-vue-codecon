<template functional>
  <div :class="['message mb-2', {'from-me': props.currentUser && props.message.user.id === props.currentUser.id}]" :key="data.key || _uid">
    <div class="message-avatar">
      <avatar :name="props.message.user.name" :size="24"/>
    </div>
    <div class="message-text border rounded d-flex flex-column mx-1 px-2 py-1">
      <small class="font-italic">
        <span class="font-weight-bold">{{ props.message.user.name }}</span>
        {{ props.message.timestamp | timeAgo }}:
      </small>
      <pre class="m-0">{{ props.message.content }}</pre>
    </div>
  </div>
</template>

<style lang="scss">
.message {
  display: flex;
  flex-direction: row;

  .message-text {
    max-width: 70%;
  }

  .message-avatar {
    min-width: 34px;
  }

  &.from-me {
    flex-direction: row-reverse;
  }
}
</style>
