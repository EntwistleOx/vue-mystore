<template>
  <div class="column is-one-quarter">
    <div class="box">
      <h2 class="title is-5">Total de compra</h2>
      <div class="is-flex is-justify-content-space-between">
        <strong> Subtotal </strong>
        <strong> ${{ formatNumber(total) }} </strong>
      </div>
      <div class="is-flex is-justify-content-space-between">
        <strong> Shipping </strong> <strong> Gratis </strong>
      </div>
      <hr />
      <div class="is-flex is-justify-content-space-between">
        <div class="title is-4">Total</div>
        <div class="title is-4">${{ formatNumber(total) }}</div>
      </div>
      <b-button type="is-primary" expanded>Confirmar Compra</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { formatNumber } from '@/helpers';

export default {
  name: 'Checkout',
  data() {
    return {};
  },
  methods: {
    formatNumber,
  },
  computed: {
    ...mapState(['cart']),
    total() {
      const { cart } = this;
      return cart.reduce((acc, value) => {
        const realPrice =
          value.discount > 0
            ? value.price - (value.discount / 100) * value.price
            : value.price;
        return acc + realPrice * value.quantity;
      }, 0);
    },
  },
};
</script>
