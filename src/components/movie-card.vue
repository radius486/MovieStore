<template>
  <div class="movie-card">
    <img class="movie-card__image" :src="imageUrl" alt="movie.originalTitle">
    <h3 class="movie-card__title">
      {{ movie.title }}
    </h3>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Movie } from '@/types';
import { IMAGES_PATH } from '@/constants';

@Options({
  name: 'MovieCard',
  props: {
    movie: Object,
  },
})
export default class MovieCard extends Vue {
  movie!: Movie;

  get imageUrl(): string {
    return `${IMAGES_PATH}/${this.movie.backdropPath}`;
  }
}
</script>

<style scoped lang="scss">
  .movie-card {
    width: 200px;
    height: 300px;
    border: 1px solid #595555;
    padding: 20px;
    box-sizing: border-box;

    &__image {
      width: 120px;
      height: 183px;
    }
  }
</style>
