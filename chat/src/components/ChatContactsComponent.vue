<template>
  <div class="chat__contacts">
    <ul class="chat__contacts-list">
      <template v-for="contact in contacts">
        <li
          :class="[
            'chat__contacts-list-item',
            {'chat__contacts-list-item--selected': +interlocutorId === +contact.id}]
          "
          @click="$emit(
            'change-chat-interlocutor',
            { id: contact.id })" :key="contact.id"
          >{{`${+contact.id === +contacts[0].id ? 'You: ' : ''}${contact.name}`}}</li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ChatContactsComponent',
  props: {
    contacts: Array,
    interlocutorId: String,
  },
};
</script>

<style lang="less"></style>
