<template>
  <div class="topbar">
    <div class="basket">{{ count }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'Topbar',
})
export default class Topbar extends Vue {
  count = 0;
}
</script>

<style scoped lang="scss">
  .topbar {
    height: 40px;
    background-color: #e7e3e3;
    padding: 5px 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .basket {
    min-width: 30px;
    height: 20px;
    border: 2px solid #595555;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
  }
</style>