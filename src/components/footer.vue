<template>
  <footer class="footer">
    ©2022 MovieStore. All rights reserved
  </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'Footer',
})
export default class Footer extends Vue {
}
</script>

<style scoped lang="scss">
.footer {
  font-size: 16px;
  padding: 20px 40px;
  text-align: left;
  background-color: #595555;
  height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
