<template>
  <div class="media">
    <figure class="media-left">
      <p class="image is-96x96">
        <img :src="item.imgSrc" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <div class="columns">
          <div class="column">
            <strong> {{ item.band }} - {{ item.name }} </strong>
            <br />
            <small>{{ item.format }}</small>
          </div>
          <div class="column">
            {{ item.quantity }}
            <b-field label="Cantidad">
              <b-numberinput
                controls-position="compact"
                size="is-small"
                :min="0"
                v-model="inputValue"
                @input="changeQuantity"
              ></b-numberinput>
            </b-field>
          </div>
          <div class="column has-text-right	">
            <strong>
              Total item: ${{ formatNumber(itemPrice * item.quantity) }}
            </strong>
          </div>
          <div class="column has-text-right	">
            <b-button type="is-danger" @click="deleteItem">Borrar</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatNumber } from '@/helpers';

export default {
  name: 'Item',
  props: ['item'],
  data() {
    return {
      inputValue: this.item.quantity,
    };
  },
  methods: {
    ...mapActions(['update_Cart_Quantity', 'delete_From_Cart']),
    formatNumber,
    changeQuantity() {
      const data = {
        id: this.item.id,
        quantity: this.inputValue,
      };
      this.update_Cart_Quantity(data);
    },
    deleteItem() {
      this.delete_From_Cart(this.item.id);
    },
  },
  computed: {
    itemPrice() {
      const { item } = this;
      return item.discount > 0
        ? item.price - (item.discount / 100) * item.price
        : item.price;
    },
  },
};
</script>

<style scoped>
.media-content {
  align-items: center;
}
</style>
