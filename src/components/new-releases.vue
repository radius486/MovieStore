<template>
  <div id="new-releases" class="new-releases">
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'NewReleases',
})
export default class Topbar extends Vue {}
</script>

<style scoped lang="scss">
  .new-releases {
    height: 400px;
    background-color: #fff;
    border-bottom: 2px solid #595555;
  }
</style>
