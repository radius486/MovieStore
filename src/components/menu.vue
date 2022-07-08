<template>
  <div class="menu">
    <a
      v-if="currentRoute === 'Homepage'"
      href="#featured"
      class="menu__link">
      Featured
    </a>
    <a
      v-if="currentRoute === 'Homepage'"
      href="#new-releases" class="menu__link">
      New releases
    </a>
    <router-link class="menu__link" to="/" v-if="currentRoute === 'Details'">
      <span class="material-icons">
        west
      </span>
      Homepage
    </router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

@Options({
  name: 'Menu',
})
export default class Menu extends Vue {
  currentRoute = setup(
    () => {
      const route = useRoute();
      return computed(() => route.name);
    },
  );
}
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
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;

      span {
        margin-right: 10px;;
      }
    }
  }
</style>
