<template>
  <div id="featured" class="featured">
      <div class="featured__header">
        <h2 class="featured__title">
          <span class="material-icons stars"></span>
          {{ title }}
        </h2>
        <div class="featured__actions">
          <button
            class="featured__button"
            :class="sortBy === 'popularity' && 'active'"
            @click.prevent="changeSorter('popularity', SortDir.DESC)">
            Most Popular
          </button>
          <button
            class="featured__button"
            :class="sortBy === 'voteCount' && 'active'"
            @click.prevent="changeSorter('voteCount', SortDir.DESC)">
            Top Rated
          </button>
        </div>
      </div>
      <div class="featured__container">
        <movie-card
          v-for="(movie, index) in sortedMovies"
          :movie="movie"
          :key="`featured-item-${index}`">
        </movie-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
import { orderBy } from 'lodash';
import { useMoviesStore } from '@/stores/movies';
import { Movie, SortDir } from '@/types';
import MovieCard from '@/components/movie-card.vue';

@Options({
  name: 'Featured',
  components: {
    MovieCard,
  },
})
export default class Featured extends Vue {
  SortDir = setup(() => SortDir)

  movies = setup(() => useMoviesStore())

  title = 'Featured Movies';

  featuredMovies: Movie[] = [];

  sortBy: string | null = null;

  sortDir: SortDir = SortDir.ASC;

  get sortedMovies(): Movie[] {
    const sortedMovies = this.sortBy
      ? orderBy(this.featuredMovies, [this.sortBy], [this.sortDir])
      : this.featuredMovies;
    return sortedMovies.filter((movie, index) => index < 12);
  }

  changeSorter(sortBy: string, sortDir: SortDir): void {
    this.sortBy = this.sortBy !== sortBy ? sortBy : null;
    this.sortDir = this.sortBy !== null ? sortDir : SortDir.ASC;
  }

  async init(): Promise<void> {
    await this.movies.fetchFeatured();
    const featuredMovies = this.movies.getFeaturedMovies;
    Object.assign(this, { featuredMovies });
  }

  created(): void {
    this.init();
  }

  beforeUnmount(): void {
    this.movies.resetFeatured();
  }
}
</script>

<style scoped lang="scss">
  .featured {
    background-color: #fff;
    border-bottom: 2px solid #595555;
    padding: 40px;
    max-width: 1600px;
    margin: 0 auto;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    &__title {
      display: flex;
      align-items: center;
      margin: 0;
      user-select: none;

      .stars {
        font-size: 30px;
        margin-right: 5px;
      }
    }

    &__container {
        display: grid;
        grid-auto-flow: row;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
        justify-content: center;
    }

    &__actions {
      display: grid;
      gap: 10px;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
    }

    &__button {
      margin: 0;
      padding: 0 20px;
      box-shadow: none;
      background: #595555;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      border: 0;
      cursor: pointer;
      border-radius: 5px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;

      &.active {
        background: #f60;
      }
    }
  }
</style>
