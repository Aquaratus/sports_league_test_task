<template>
  <div :class="['form', {'form--chat': chatMode}]">
    <template v-for="(input, index) in inputs">
      <div :class="[
        'form__input-wrapper',
        {'form__input-wrapper--horizontal': chatMode}
      ]" :key="input.name">
        <input
          :class="['input', 'input--text', 'form__input', inputsClass || '']"
          :type="input.type"
          :name="input.name"
          @input="$emit(
            'update:form-data',
            { index, name: input.name, value: $event.target.value }
          )"
          @keyup.enter="onSubmit"
          :placeholder="input.placeholder"
          :ref="inputsRefName"
          :maxlength="!chatMode && input.name === constants.INPUT_NAME_USER_NAME ? 30 : ''"
        >
        <button
          v-if="chatMode"
          v-html="submitButtonText || 'Save'"
          class="btn form__btn form__btn--submit"
          @click="onSubmit" :disabled='disableSaveBtn'
        ></button>
        <p
          class="form__input-description"
          v-if="input.description"
        >&#x2191; {{ input.description }}</p>
      </div>
    </template>
    <button
      v-if="!chatMode"
      class="btn form__btn form__btn--submit"
      @click="onSubmit" :disabled='disableSaveBtn'
    >Save</button>
  </div>
</template>

<script>
import constants from '@/store/constants';

export default {
  name: 'FormComponent',
  props: {
    inputs: Array,
    disableSaveBtn: Boolean,
    onSave: Function,
    submitButtonText: String,
    inputsClass: String,
    chatMode: Boolean,
  },
  data() {
    return {
      inputsRefName: 'formInputs',
      constants,
    };
  },
  methods: {
    onSubmit() {
      this.onSave();
      this.$refs[this.inputsRefName].forEach((inputEl) => {
        // eslint-disable-next-line no-param-reassign
        inputEl.value = '';
      });
    },
  },
};
</script>
