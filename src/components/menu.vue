<template>
  <div class="menu">
    <a href="#featured" class="menu__link">Featured</a>
    <a href="#new-releases" class="menu__link">New releases</a>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'Menu',
})
export default class Menu extends Vue {}
</script>

<style scoped lang="scss">
  .menu {
    height: 40px;
    background-color: #595555;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 40px;

    &__link {
      margin-right: 20px;
      color: #fff;
      text-decoration: none;
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>
