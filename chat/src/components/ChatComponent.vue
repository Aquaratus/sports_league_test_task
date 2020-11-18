<template>
  <div class="chat">
    <chat-contacts-component
      :contacts="userContacts"
      :interlocutorId="currentInterlocutor.id"
      @change-chat-interlocutor="onChangeInterlocutor"
    ></chat-contacts-component>
    <div class="chat__messages" :ref="messagesContainerRef">
      <div class="chat__messages-header">{{`Chat with ${currentInterlocutor.name}`}}</div>
      <template v-for="(message, index) in messages">
        <chat-message-component
          :message="message"
          :avatarLink="+message.authorId === +user.id
            ? user.avatarLink : currentInterlocutor.avatarLink"
          :right="!!(+message.authorId === +user.id)"
          :key="index"
        ></chat-message-component>
      </template>
      <form-component
        :inputs="msgInputField"
        :onSave="onSend"
        :submitButtonText="mobileWidth ? '&#10003;' : 'Send'"
        :inputs-class="'input--chat'"
        :chatMode="true"
        @update:form-data="updateMsgInputFieldValue"
      ></form-component>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import constants from '@/store/constants';
import FormComponent from '@/components/FormComponent.vue';
import ChatContactsComponent from '@/components/ChatContactsComponent.vue';
import ChatMessageComponent from '@/components/ChatMessageComponent.vue';

export default {
  name: 'ChatComponent',
  components: {
    ChatContactsComponent,
    ChatMessageComponent,
    FormComponent,
  },
  props: {
    user: Object,
    interlocutor: Object,
    users: Array,
  },
  data() {
    return {
      msgInputField: [
        {
          name: 'message',
          value: '',
          type: 'text',
          placeholder: 'Enter your message...',
        },
      ],
      currentInterlocutor: { ...this.interlocutor },
      messagesContainerRef: 'messagesContainer',
    };
  },
  computed: {
    ...mapGetters([
      constants.GET_CONTACTS,
      constants.GET_MESSAGES,
    ]),
    userContacts() {
      return this[constants.GET_CONTACTS](+this.user.id);
    },
    messages() {
      return this[constants.GET_MESSAGES]({
        authorId: this.user.id,
        interlocutorId: this.currentInterlocutor.id,
      });
    },
    mobileWidth() {
      return window.innerWidth < constants.MOBILE_MAX_WIDTH;
    },
  },
  updated() {
    this.scrollMessagesToBottom();
  },
  methods: {
    ...mapActions([
      constants.ADD_MESSAGE,
    ]),
    onSend() {
      const { value } = this.msgInputField[0];
      if (value) {
        const interlocutors = [this.user.id, this.currentInterlocutor.id];
        const message = {
          authorId: +this.user.id,
          authorName: this.user.name,
          text: value,
        };

        this[constants.ADD_MESSAGE]({ interlocutors, message })
          .then(() => {
            this.msgInputField[0].value = '';
          })
          .catch((err) => console.error(err));
      }
    },
    updateMsgInputFieldValue({ value }) {
      this.msgInputField[0].value = value;
    },
    onChangeInterlocutor({ id }) {
      this.currentInterlocutor = { ...this.users.find((user) => +user.id === +id) };
    },
    scrollMessagesToBottom() {
      this.$refs[this.messagesContainerRef].scrollTop = this
        .$refs[this.messagesContainerRef].scrollHeight;
    },
  },
};
</script>

<style lang="less"></style>
