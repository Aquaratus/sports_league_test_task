<template>
  <div :class="['chat-msg', {'chat-msg--right': right}]">
    <img
      class="chat-msg__image"
      :src="avatarLink"
      :alt="message.authorName">
    <div :class="['chat-msg__message', {'chat-msg__message--author': right}]">
      <h3 class="chat-msg__message-header">{{message.authorName}}</h3>
      <p class="chat-msg__message-text">{{message.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessageComponent',
  props: {
    message: Object,
    avatarLink: String,
    right: Boolean,
  },
};
</script>

<style lang="less"></style>
