import Vue from 'vue';
import Vuex from 'vuex';
import constants from './constants';

Vue.use(Vuex);

const store = {
  state: {
    idCounter: 1,
    users: {
      0: {
        name: 'Иван Иванов',
        avatarLink: constants.DEFAULT_AVATAR_LINK,
        contacts: [0, 1],
      },
      1: {
        name: constants.STANDART_USER_NAME,
        avatarLink: constants.DEFAULT_AVATAR_LINK,
        contacts: [1, 0],
      },
    },
    messages: [
      {
        interlocutors: [0, 0],
        dialog: [],
      },
      {
        interlocutors: [1, 1],
        dialog: [],
      },
      {
        interlocutors: [0, 1],
        dialog: [],
      },
    ],
  },
  getters: {
    [constants.GET_USERS](state) {
      return Object.entries(state.users).map((user) => {
        const result = {
          id: user[0],
          ...user[1],
        };

        return result;
      });
    },
    [constants.GET_CONTACTS]: (state) => (id) => state.users[id].contacts.map((contactId) => ({
      id: contactId,
      name: state.users[contactId].name,
    })),
    [constants.GET_MESSAGES]: (state) => ({ authorId, interlocutorId }) => {
      const result = state.messages.find((dialog) => {
        const condition = dialog.interlocutors.includes(+authorId)
          && dialog.interlocutors.includes(+interlocutorId);

        return condition;
      }).dialog;

      return result;
    },
  },
  mutations: {
    [constants.UPDATE_USER](state, newData) {
      const updatedUser = { ...newData, contacts: [0] };

      updatedUser.contacts.unshift(state.idCounter);
      state.users[state.idCounter] = updatedUser;
    },
    [constants.ADD_MESSAGE](state, { interlocutors, message }) {
      const targetDialog = state.messages.find((dialog) => {
        const diff = interlocutors.filter((id) => {
          const result = !dialog.interlocutors.includes(+id);

          return result;
        });

        return !diff.length;
      });

      targetDialog.dialog.push(message);
    },
  },
  actions: {
    [constants.UPDATE_USER]({ commit }, newData) {
      commit(constants.UPDATE_USER, newData);
    },
    [constants.ADD_MESSAGE]({ commit }, newMsg) {
      commit(constants.ADD_MESSAGE, newMsg);
    },
  },
};

export default new Vuex.Store({
  ...store,
  modules: {
  },
});
