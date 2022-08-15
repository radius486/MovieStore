<template>
  <div class="details">
    <h1 class="details__title">{{ title }}</h1>
    <img class="details__image" :src="imageUrl" :alt="movie.originalTitle">
    <p class="details__description">{{ movie.overview }}</p>
    <p class="details__info-line"><span>Budget:</span> {{ movie.budget }}</p>
    <p class="details__info-line">
      <span>Genres:</span>
      <span>
        <span
          class="genre"
          v-for="(genre, index) in movie.genres"
          :key="`genre-item-${index}`">
          {{ genre.name }}
        </span>
      </span>
    </p>
    <p class="details__info-line">
      <span>Homepage:</span>
      <a :href=" movie.homepage">{{ movie.homepage }}</a>
    </p>
    <p class="details__info-line"><span>Original Title:</span> {{ movie.originalTitle }}</p>
    <p class="details__info-line"><span>Popularity:</span> {{ movie.popularity }}</p>
    <p class="details__info-line"><span>Release Date:</span> {{ movie.releaseDate }}</p>
    <p class="details__info-line"><span>Revenue:</span> {{ movie.revenue }}</p>
    <p class="details__info-line"><span>Status:</span> {{ movie.status }}</p>
    <p class="details__info-line"><span>Tagline:</span> {{ movie.tagline }}</p>
    <p class="details__info-line"><span>Vote Average:</span> {{ movie.voteAverage }}</p>
    <p class="details__info-line"><span>Vote Count:</span> {{ movie.voteCount }}</p>
    <p class="details__info-line">
      <span>Price:</span>
      <span class="details__price">
        {{ price }}
      </span>
    </p>
    <button class="details__add-to-cart" v-if="inShoppingCart" @click="addToCart(movie)">
      Remove From Cart
      <span class="material-icons">
        remove_shopping_cart
      </span>
    </button>
    <button class="details__add-to-cart" v-if="!inShoppingCart" @click="addToCart(movie)">
      Add To Cart
      <span class="material-icons">
        add_shopping_cart
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
// import { useStore } from 'vuex';
import { useCartStore } from '@/stores/cart';
import { mapKeys, camelCase } from 'lodash';
import axios from 'axios';
import { MovieDetaild, Movie } from '@/types';
import { BASE_PATH, IMAGES_PATH, API_KEY } from '@/constants';
import formatter from '@/formatters/currency';

@Options({
  name: 'Details',
  props: {
    movieId: Number,
  },
})
export default class Details extends Vue {
  movieId!: number;

  // store = setup(() => useStore());

  cart = setup(() => useCartStore())

  get title(): string {
    return this.movie.title;
  }

  get imageUrl(): string {
    return this.movie.posterPath ? `${IMAGES_PATH}/${this.movie.posterPath}` : '';
  }

  get price(): string {
    return formatter.format(this.movie.voteAverage);
  }

  get shoppingCart(): Partial<Movie>[] {
    return this.cart.getShoppingCart;
  }

  get inShoppingCart(): boolean {
    return !!this.shoppingCart.find((item) => item.id === this.movie.id);
  }

  movie = {} as MovieDetaild;

  snakeToCamel(str: string): string {
    // eslint-disable-next-line
    console.log(this.title);
    return str.toLowerCase()
      .replace(/([-_][a-z])/g, (group) => group
        .toUpperCase()
        .replace('-', '')
        .replace('_', ''));
  }

  async fetchDetails(): Promise<void> {
    const url = `${BASE_PATH}/${this.movieId}?api_key=${API_KEY}&language=en-US`;

    try {
      const { data } = await axios.get(url);
      const movie = mapKeys(data, (value, key: string) => camelCase(key));
      Object.assign(this.movie, movie);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }

  addToCart({ id, title, voteAverage }: Partial<Movie>): void {
    const movie = {
      id,
      title,
      voteAverage,
    };

    this.cart.addToCart(movie);
  }

  created(): void {
    this.fetchDetails();
  }
}
</script>

<style scoped lang="scss">
  .details {
    padding: 20px 40px;

    &__title {
      text-align: left;
    }

    &__description {
      max-width: 700px;
      text-align: left;
    }

    &__image {
      width: 300px;
      height: auto;
      display: block;
      margin-bottom: 20px;
    }

    &__info-line {
      border-bottom: 1px solid #667;
      max-width: 700px;
      display: grid;
      gap: 10px;
      grid-auto-flow: column;
      justify-items: start;
      align-items: center;
      grid-template-columns: 150px 1fr;
      margin: 0;
      min-height: 30px;

      a {
        color: rgb(0, 0, 238);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      .genre {
        font-weight: normal;

        &:after {
          content: ', ';
        }

        &:last-child::after {
          content: '';
        }
      }

      span {
        font-weight: bold;
      }
    }

    &__price {
      font-weight: bold;
      color: #3bb33b;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &__add-to-cart {
      color: #3bb33b;
      margin: 20px 0 0;
      padding: 0 2px;
      box-shadow: none;
      border: 0;
      cursor: pointer;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: none;
      border: 2px solid #3bb33b;
      font-weight: bold;
      font-size: 20px;
      height: 40px;
      padding: 0 20px;

      span {
        font-size: 30px;
        margin-left: 10px;
      }
    }
  }
</style>
