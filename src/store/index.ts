import { createStore } from 'vuex';
import { Movie } from '@/types';

export default createStore({
  state: {
    shoppingCart: [] as Partial<Movie>[],
  },
  mutations: {
    ADD_TO_CART(state, movie) {
      state.shoppingCart.push(movie);
    },
    REMOVE_FROM_CART(state, movie) {
      state.shoppingCart = state.shoppingCart.filter((item) => item.id !== movie.id);
    },
  },
  actions: {
    addToCart({ commit, state }, movie) {
      if (!state.shoppingCart.find((item) => item.id === movie.id)) {
        commit('ADD_TO_CART', movie);
      } else {
        commit('REMOVE_FROM_CART', movie);
      }
    },
  },
  getters: {
    getShoppingCart(state) {
      return state.shoppingCart;
    },
  },
  modules: {
  },
});
