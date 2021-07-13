<template>
  <div class="container">
    <div class="m-4">
      <Filters />
      <Albums :albums="albums" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Albums from '@/components/Albums';
import Filters from '@/components/Filters';

export default {
  name: 'Home',
  components: {
    Albums,
    Filters,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['filteredAlbums']),
    albums() {
      return this.filteredAlbums;
    },
  },
  created() {
    this.getAlbums();
  },
  methods: {
    ...mapActions(['fetch_Albums']),
    getAlbums() {
      this.fetch_Albums();
    },
  },
};
</script>
