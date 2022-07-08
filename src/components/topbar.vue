<template>
  <div class="topbar">
    <span class="material-icons basket-icon">
      shopping_cart
    </span>
    <div class="basket">
      {{ totalPrice }}
      <div class="cart-list">
        <p
          v-for="(movie, index) in shoppingCartFormatted"
          :key="`cart-item-${index}`"
          class="cart-item">
          <span>{{ movie.title }}:</span>
          <b>{{ movie.formattedPrice }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
import { useStore } from 'vuex';
import { Movie } from '@/types';
import formatter from '@/formatters/currency';

@Options({
  name: 'Topbar',
})
export default class Topbar extends Vue {
  store = setup(() => useStore());

  formatter = setup(() => formatter);

  get shoppingCart(): Partial<Movie>[] {
    return this.store.getters.getShoppingCart;
  }

  get shoppingCartFormatted(): Partial<Movie>[] {
    // eslint-disable-next-line
    return this.shoppingCart.map((item) => {
      return {
        ...item,
        formattedPrice: formatter.format(item.voteAverage as number),
      };
    });
  }

  get totalPrice(): string {
    const totalPrice = this.shoppingCart
      .reduce(
        (accumulator: number, item: Partial<Movie>) => {
          if (item.voteAverage) {
            return accumulator + item.voteAverage;
          }

          return accumulator;
        }, 0,
      );

    return formatter.format(totalPrice);
  }
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
    height: 20px;
    border: 2px solid #595555;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin-left: 5px;
    position: relative;

    &:hover .cart-list {
      display: block;
    }
  }

  .basket-icon {
      font-size: 30px;
  }

  .cart-list {
    display: none;
    position: absolute;
    top: 20px;
    right: 0px;
    width: 400px;
    padding: 10px;
    border: 1px solid #595555;
    background: #fff;
    text-align: left;
  }

  .cart-item {
    margin: 0 0 5px;
    display: grid;
    gap: 20px;
    grid-auto-flow: column;
    justify-items: start;
    align-items: end;
    justify-content: space-between;

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
