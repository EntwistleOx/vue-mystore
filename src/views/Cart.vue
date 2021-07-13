<template>
  <div class="container">
    <div class="m-4">
      <div class="">
        <h1 class="title">Carrito</h1>

        <div class="box" v-if="!cart.length">
          El carrito esta vacio.
        </div>

        <div class="columns" v-if="cart.length">
          <Items />
          <Checkout />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Items from '@/components/Items';
import Checkout from '@/components/Checkout';

export default {
  name: 'Home',
  components: {
    Items,
    Checkout,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['cart']),
  },
};
</script>
