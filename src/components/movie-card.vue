<template>
  <div class="movie-card">
    <div class="movie-card__header">
      <span class="movie-card__rating" :class="raitingClass">{{ movie.voteAverage }}</span>
    </div>
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

  get raitingClass(): string {
    return this.movie.voteAverage >= 7 ? 'high' : '';
  }
}
</script>

<style scoped lang="scss">
  .movie-card {
    width: 200px;
    height: 320px;
    border: 1px solid #595555;
    box-sizing: border-box;
    position: relative;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    &__rating {
      color: #fff;
      background-color: #667;
      border-radius: 5px;
      padding: 0px 5px;
      font-size: 14px;
      line-height: 1;
      height: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding-top: 2px;

      &.high {
        background-color: #3bb33b;
      }
    }

    &__image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      display: block;
    }

    &__title {
      color: #2c3e50;
      font-size: 16px;
      margin: 0;
      padding: 0 10px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
