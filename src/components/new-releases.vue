<template>
  <div id="new-releases" class="new-releases">
      <div class="new-releases__header">
        <h2 class="new-releases__title">
          <span class="material-icons today"></span>
          {{ title }}
        </h2>
      </div>
      <div class="new-releases__container">
        <movie-card
          v-for="(movie, index) in newMovies"
          :movie="movie"
          :key="`new-release-item-${index}`">
        </movie-card>
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
      // eslint-disable-next-line
      this.newMovies = data.results.map((result: any) => mapKeys(result, (value: any, key: string) => camelCase(key)));
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }

  created(): void {
    this.fetchNewReleases();
  }
}
</script>

<style scoped lang="scss">
  .new-releases {
    background-color: #fff;
    border-bottom: 2px solid #595555;
    padding: 40px;

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

      .today {
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
  }
</style>
