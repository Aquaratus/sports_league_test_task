<template>
  <div class="content">
    <h1 class="header--main">Enter chat</h1>
    <form-component
      :inputs.sync="inputFields"
      :disable-save-btn="disableSaveBtn"
      :onSave="onLogIn"
      @update:form-data="updateLoginFieldValue"
    >
    </form-component>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
import constants from '@/store/constants';
import FormComponent from '@/components/FormComponent.vue';

export default {
  name: 'LogIn',
  components: {
    FormComponent,
  },
  data() {
    return {
      inputFields: [
        {
          name: constants.INPUT_NAME_USER_NAME,
          value: '',
          type: 'text',
          placeholder: 'Your name...',
          description: 'Any symbols except only spaces, no spaces at the beggining and the end, 30 symbols max',
        },
        {
          name: 'avatarLink',
          value: '',
          type: 'text',
          placeholder: 'Link to your avatar image...',
        },
      ],
    };
  },
  computed: {
    disableSaveBtn() {
      return !!this.inputFields.find((inputField) => !inputField.value.trim());
    },
  },
  methods: {
    ...mapActions([
      constants.UPDATE_USER,
    ]),
    onLogIn() {
      const newData = {
        name: this.inputFields[0].value.trim(),
        avatarLink: this.inputFields[1].value.trim(),
      };

      this[constants.UPDATE_USER](newData)
        .then(() => {
          this.$router.push('chat');
        })
        .catch((err) => console.error(err));
    },
    updateLoginFieldValue({ index, name, value }) {
      let inputFieldObj = this.inputFields[index];

      if (inputFieldObj.name === name) {
        inputFieldObj.value = value;
      } else {
        inputFieldObj = this.inputFields.find((inputField) => inputField === name);
        if (inputFieldObj) {
          inputFieldObj.value = value;
        } else {
          console.error(`Field '${name}' not found!`);
        }
      }
    },
  },
};
</script>
