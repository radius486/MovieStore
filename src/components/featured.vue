<template>
  <div id="featured" class="featured">
      <div class="featured__container">
        <movie-card
          class="featured-item"
          v-for="(movie, index) in featuredMovies"
          :movie="movie"
          :key="`featured-item-${index}`">
        </movie-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import { mapKeys, camelCase } from 'lodash';
import { Movie } from '@/types';
import MovieCard from '@/components/movie-card.vue';
import { BASE_PATH, API_KEY } from '@/constants';

@Options({
  name: 'Featured',
  components: {
    MovieCard,
  },
})
export default class Topbar extends Vue {
  featuredMovies: Movie[] = [];

  snakeToCamel(str: string): string {
    // eslint-disable-next-line
    console.log(this);
    return str.toLowerCase()
      .replace(/([-_][a-z])/g, (group) => group
        .toUpperCase()
        .replace('-', '')
        .replace('_', ''));
  }

  async fetchFeatured(): Promise<void> {
    const url = `${BASE_PATH}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    const { data } = await axios.get(url);
    // eslint-disable-next-line
    this.featuredMovies = data.results.map((result: any) => mapKeys(result, (value: any, key: string) => camelCase(key)));
  }

  created(): void {
    this.fetchFeatured();
  }
}
</script>

<style scoped lang="scss">
  .featured {
    background-color: #fff;
    border-bottom: 2px solid #595555;
    padding: 40px;

    &__container {
        display: grid;
        grid-auto-flow: row;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
        justify-content: center;
    }
  }
</style>
