<template>
  <div class="homepage">
    <Featured />
    <NewReleases />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Featured from '@/components/featured.vue';
import NewReleases from '@/components/new-releases.vue';

@Options({
  name: 'Homepage',
  components: {
    Featured,
    NewReleases,
  },
})
export default class Homepage extends Vue {}
</script>
