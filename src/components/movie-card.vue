<template>
  <div class="movie-card">
    <div class="movie-card__header">
      <div>
        <span class="movie-card__rating" :class="raitingClass">{{ movie.voteAverage }}</span>
        <span class="movie-card__voute-count">
          <span class="material-icons star"></span>
          {{ movie.voteCount }}
        </span>
      </div>
      <span class="movie-card__popularity">
        <span class="material-icons thumb-up">
          thumb_up
        </span>
        {{ movie.popularity }}
      </span>
    </div>
    <img class="movie-card__image" :src="imageUrl" :alt="movie.originalTitle">
    <div class="movie-card__info">
      <span class="movie-card__date">{{ movie.releaseDate }}</span>
      <button class="movie-card__add-to-cart">
        <span class="material-icons">
          add_shopping_cart
        </span>
      </button>
    </div>
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
    position: relative;
    background-color: #bdd6d6;

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

    &__voute-count {
      font-size: 12px;
      color: #fff;
      margin-left: 2px;
      background: rgba(0, 0, 0, 0.4);
      line-height: 1.5;
      border-radius: 2px;
      padding: 0 2px;

      .star {
        font-size: 10px;
        line-height: 1;
      }
    }

    &__popularity {
      color: #fff;
      background-color: #595555;
      border-radius: 5px;
      padding: 0px 5px;
      font-size: 14px;
      line-height: 1;
      height: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding-top: 2px;

      .thumb-up {
        font-size: 10px;
        line-height: 1;
        margin-right: 2px;
      }
    }

    &__image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      display: block;
    }

    &__info {
      margin-top: -25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;
    }

    &__date {
      color: #fff;
      font-size: 12px;
      background-color: #2c3e50;
      border-radius: 2px;
      padding: 0 5px;
      line-height: 1.5;
    }

    &__title {
      color: #000;
      font-size: 16px;
      margin: 0;
      padding: 0 10px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &__add-to-cart {
      margin: 0;
      padding: 0 2px;
      box-shadow: none;
      background: rgba(0, 0, 0, 0.4);
      border: 0;
      cursor: pointer;
      border-radius: 2px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        color: #fff;
        font-size: 16px;
      }
    }
  }
</style>
