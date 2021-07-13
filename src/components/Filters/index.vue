<template>
  <div class="columns">
    <div class="column">
      <b-field label="Banda" :label-position="labelPosition">
        <b-select
          placeholder="Filtra por banda..."
          expanded
          v-model="filter.band"
          @input="onChange"
        >
          <option v-for="(band, i) in bandsForFilter" :value="band" :key="i">
            {{ band }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="column">
      <b-field label="Formato" :label-position="labelPosition">
        <b-select
          placeholder="Filtra por formato..."
          expanded
          v-model="filter.format"
          @input="onChange"
        >
          <option v-for="(format, i) in formats" :value="format" :key="i">
            {{ format }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="column">
      <b-field label="Categoria" :label-position="labelPosition">
        <b-select
          placeholder="Filtra por categoria..."
          expanded
          v-model="filter.category"
          @input="onChange"
        >
          <option
            v-for="(category, i) in categories"
            :value="category"
            :key="i"
          >
            {{ category }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="column">
      <b-field>
        <b-checkbox v-model="filter.withDiscount" @input="onChange">
          Tiene descuento
        </b-checkbox>
      </b-field>
    </div>
    <div class="column">
      <b-field>
        <b-button type="is-primary is-light" @click="clearFilters" expanded>
          Limpiar filtros
        </b-button>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Filters',
  data() {
    return {
      labelPosition: 'on-border',
      filter: { withDiscount: false },
    };
  },
  computed: {
    ...mapState(['categories', 'formats']),
    ...mapGetters(['bandsForFilter']),
  },
  methods: {
    ...mapActions(['filter_Albums']),
    clearFilters() {
      this.filter = { withDiscount: false };
      const { ...filter } = this.filter;
      this.filter_Albums(filter);
    },
    onChange() {
      const { ...filter } = this.filter;
      this.filter_Albums(filter);
    },
  },
};
</script>
