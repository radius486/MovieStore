/* eslint-disable */
import { defineStore } from 'pinia';
import axios from 'axios';
import { mapKeys, camelCase, orderBy } from 'lodash';
import { Movie } from '@/types';
import { BASE_PATH, API_KEY } from '@/constants';

export const useMoviesStore = defineStore('movies', {
  state: () => {
    return {
      featuredMovies: [] as Movie[],
      newMovies: [] as Movie[],
    }
  },
  getters: {
    getFeaturedMovies(state) {
      return state.featuredMovies;
    },

    getNewMovies(state) {
      return state.newMovies;
    },
  },
  actions: {
    async fetchFeatured(): Promise<void> {
      const url = `${BASE_PATH}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

      try {
        const { data } = await axios.get(url);
        this.featuredMovies = data.results.map(
          (result: Record<string, unknown>) => mapKeys(
            result, (value, key: string) => camelCase(key),
          ),
        );
      } catch (error) {
        console.error(error);
      }
    },

    resetFeatured(): void {
      this.featuredMovies = [];
    },

    async fetchNewMovies(): Promise<void> {
      const url = `${BASE_PATH}/popular?api_key=${API_KEY}&language=en-US&page=1`;

      try {
        const { data } = await axios.get(url);
        this.newMovies = data.results.map(
          (result: Record<string, unknown>) => mapKeys(
            result, (value, key: string) => camelCase(key),
          ),
        );
      } catch (error) {
        console.error(error);
      }
    },

    resetNewReleases(): void {
      this.newMovies = [];
    },
  },
})
