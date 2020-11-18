<template>
  <div class="content content--chat">
    <chat-component
      :user="loggedUser"
      :interlocutor="mockUser"
      :users="users"
      :key="loggedUser.id"
    ></chat-component>
    <div class="divider"></div>
    <chat-component
      :user="mockUser"
      :interlocutor="loggedUser"
      :users="users"
      :key="mockUser.id"
    ></chat-component>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import constants from '@/store/constants';
import ChatComponent from '@/components/ChatComponent.vue';

export default {
  name: 'Chat',
  components: {
    ChatComponent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      constants.GET_USERS,
    ]),
    users() {
      return this[constants.GET_USERS];
    },
    loggedUser() {
      return this.users[1];
    },
    mockUser() {
      return this.users[0];
    },
  },
};
</script>
