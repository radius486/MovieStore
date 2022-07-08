<template>
  <div id="new-releases" class="new-releases">
      <div class="new-releases__header">
        <h2 class="new-releases__title">
          <span class="material-icons today"></span>
          {{ title }}
        </h2>
      </div>
      <div class="new-releases__container">
        <button
          class="button-prev"
          :class="firstIndex === 0 && 'disabled'"
          @click.prevent="goPrev()">
          <span class="material-icons">
            arrow_back_ios
          </span>
        </button>
        <div class="new-releases__grid">
          <movie-card
            v-for="(movie, index) in filteredMovies"
            :movie="movie"
            :key="`new-release-item-${index}`">
          </movie-card>
        </div>
        <button
          class="button-next"
          :class="lastIndex === newMovies.length - 1 && 'disabled'"
          @click.prevent="goNext()">
          <span class="material-icons">
            <span class="material-icons">
              arrow_forward_ios
            </span>
          </span>
        </button>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
import axios from 'axios';
import { mapKeys, camelCase } from 'lodash';
import { Movie, SortDir } from '@/types';
import MovieCard from '@/components/movie-card.vue';
import { BASE_PATH, API_KEY } from '@/constants';

@Options({
  name: 'NewReleases',
  components: {
    MovieCard,
  },
})
export default class NewReleases extends Vue {
  SortDir = setup(() => SortDir)

  title = 'New Releases';

  newMovies: Movie[] = [];

  firstIndex = 0;

  windowWidth = 0;

  get maxItems(): number {
    let columnsCount = 6;

    if (this.windowWidth >= 1500) {
      columnsCount = 6;
    } else if (this.windowWidth < 1500 && this.windowWidth >= 1300) {
      columnsCount = 5;
    } else if (this.windowWidth < 1300 && this.windowWidth >= 1077) {
      columnsCount = 4;
    } else if (this.windowWidth < 1077 && this.windowWidth >= 856) {
      columnsCount = 2;
    } else {
      columnsCount = 1;
    }

    return columnsCount;
  }

  get lastIndex(): number {
    return this.firstIndex + this.maxItems - 1;
  }

  get filteredMovies(): Movie[] {
    return this.newMovies
      .filter(
        (movie, index) => index >= this.firstIndex && index <= this.lastIndex,
      );
  }

  goNext(): void {
    this.firstIndex += 1;
  }

  goPrev(): void {
    this.firstIndex -= 1;
  }

  onResize(): void {
    this.windowWidth = window.innerWidth;
  }

  snakeToCamel(str: string): string {
    // eslint-disable-next-line
    console.log(this.title);
    return str.toLowerCase()
      .replace(/([-_][a-z])/g, (group) => group
        .toUpperCase()
        .replace('-', '')
        .replace('_', ''));
  }

  async fetchNewReleases(): Promise<void> {
    const url = `${BASE_PATH}/popular?api_key=${API_KEY}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(url);
      this.newMovies = data.results.map(
        (result: Record<string, unknown>) => mapKeys(
          result, (value, key: string) => camelCase(key),
        ),
      );
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }

  created(): void {
    this.fetchNewReleases();
  }

  mounted(): void {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.onResize);
  }

  beforeUnmount(): void {
    window.removeEventListener('resize', this.onResize);
  }
}
</script>

<style scoped lang="scss">
  .new-releases {
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

      .today {
        font-size: 30px;
        margin-right: 5px;
      }
    }

    &__container {
      position: relative;
    }

    &__grid {
        display: grid;
        grid-auto-flow: row;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
        justify-content: center;
        // max-width: 1300px;
        // margin: 0 auto;
    }

    .button-prev,
    .button-next {
      user-select: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin: 0;
      padding: 0 14px;
      box-shadow: none;
      background: transparent;
      border: 0;
      cursor: pointer;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        color: #2c3e50;
        font-size: 40px;
      }

      &.disabled {
        pointer-events: none;
        opacity: 0.5;
      }
    }
    .button-prev{
      left: 0;
    }
    .button-next {
      right: 0;

      span {
        transform: translateX(5px);
      }
    }
  }

</style>
