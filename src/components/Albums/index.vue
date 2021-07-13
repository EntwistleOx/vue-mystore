<template>
  <div class="columns is-multiline">
    <div class="column is-one-quarter" v-for="album in albums" :key="album.id">
      <Album :album="album" />
    </div>
  </div>
</template>

<script>
import Album from '@/components/Albums/Album';

export default {
  name: 'Albums',
  components: {
    Album,
  },
  props: ['albums'],
};
</script>

<style></style>
