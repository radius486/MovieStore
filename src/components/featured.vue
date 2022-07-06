<template>
  <div id="featured" class="featured">
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'Featured',
})
export default class Topbar extends Vue {}
</script>

<style scoped lang="scss">
  .featured {
    height: 400px;
    background-color: #fff;
    border-bottom: 2px solid #595555;
  }
</style>
