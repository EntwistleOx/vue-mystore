<template>
  <div class="column ">
    <div class="box" v-for="item in cart" :key="item.id">
      <Item :item="item" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Item from '@/components/Items/Item';

export default {
  name: 'Items',
  components: {
    Item,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState(['cart']),
  },
};
</script>
