<template>
  <header class="header">
      <Topbar />
      <div class="logo-block">MovieStore</div>
      <Menu />
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Topbar from '@/components/topbar.vue';
import Menu from '@/components/menu.vue';

@Options({
  name: 'Header',
  components: {
    Topbar,
    Menu,
  },
})
export default class Header extends Vue {
}
</script>

<style scoped lang="scss">
.logo-block {
  font-size: 36px;
  padding: 20px 40px;
  text-align: left;
}
</style>
