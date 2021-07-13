<template>
  <div class="card has-text-centered ">
    <div class="card-image">
      <figure class="image is-square">
        <img :src="album.imgSrc" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5">{{ album.band }} - {{ album.name }}</p>
          <p class="subtitle is-6">{{ album.category }} | {{ album.format }}</p>
        </div>
      </div>
      <div class="content is-align-content-center	">
        <span :class="album.discount > 0 ? 'withDiscount' : 'withoutDiscount'">
          ${{ formatNumber(album.price) }}
        </span>
        <span>${{ formatNumber(albumPrice) }}</span>
        <b-field>
          <p class="control">
            <b-button
              label="Agregar"
              type="is-primary"
              expanded
              @click="addToCart(album.id)"
            />
          </p>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatNumber } from '@/helpers';

export default {
  name: 'Album',
  props: ['album'],
  computed: {
    albumPrice() {
      const { album } = this;
      return album.discount > 0
        ? album.price - (album.discount / 100) * album.price
        : album.price;
    },
  },
  methods: {
    ...mapActions(['add_To_Cart']),
    formatNumber,
    addToCart(id) {
      this.add_To_Cart(id);
    },
  },
};
</script>

<style>
.withDiscount {
  color: red;
  font-weight: 500;
  text-decoration: line-through;
  padding-right: 0.3rem;
  display: inline;
}

.withoutDiscount {
  display: none;
}
</style>
