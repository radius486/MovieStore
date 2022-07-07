<template>
  <div class="homepage">
    <Header />
    <Featured />
    <NewReleases />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';
import Featured from '@/components/featured.vue';
import NewReleases from '@/components/new-releases.vue';

@Options({
  name: 'Homepage',
  components: {
    Header,
    Footer,
    Featured,
    NewReleases,
  },
})
export default class Homepage extends Vue {}
</script>
