import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: false,
    userInitials: '',
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
      localStorage.setItem('isLoggedIn', JSON.stringify(value));
    },
    setUserInitials(state, initials) {
      state.userInitials = initials;
      localStorage.setItem('userInitials', JSON.stringify(initials));
    },
    initializeState(state) {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserInitials = localStorage.getItem('userInitials');
  
        state.isLoggedIn = storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
        state.userInitials = storedUserInitials ? JSON.parse(storedUserInitials) : '';
      },
  },
  actions: {
    // Action to be called on application start to initialize the state
    initializeState({ commit }) {
      commit('initializeState');
    },
  },
});

store.dispatch('initializeState');

export default store;