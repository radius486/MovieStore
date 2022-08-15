/* eslint-disable */
import { defineStore } from 'pinia';
import { Movie } from '@/types';

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      shoppingCart: [] as Partial<Movie>[],
    }
  },
  getters: {
    getShoppingCart(state) {
      return state.shoppingCart;
    },
  },
  actions: {
    addToCart(movie: Partial<Movie>) {
      if (!this.shoppingCart.find((item) => item.id === movie.id)) {
        this.shoppingCart.push(movie);
      } else {
        this.shoppingCart = this.shoppingCart.filter((item) => item.id !== movie.id);
      }
    },
  },
})
