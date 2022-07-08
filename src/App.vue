<template>
    <Header />
    <router-view/>
    <Footer />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';

@Options({
  name: 'Homepage',
  components: {
    Header,
    Footer,
  },
})
export default class Homepage extends Vue {}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
