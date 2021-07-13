import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
    cart: [],
    categories: ['Synthwave', 'Doom Metal', 'Post Punk', 'Sludge'],
    formats: ['CD', 'Tape', 'Vinilo'],
    filter: {},
  },
  mutations: {
    GET_ALBUMS(state, albums) {
      state.albums = albums;
    },
    ADD_ALBUM(state, album) {
      state.albums.push(album);
      Vue.$toast.success('Album agregado!');
    },
    DELETE_ALBUM(state, id) {
      // borra album
      const albumIndex = state.albums.findIndex((item) => item.id === id);
      state.albums.splice(albumIndex, 1);

      // borra album del cart
      const cartIndex = state.cart.findIndex((item) => item.id === id);
      state.cart.splice(cartIndex, 1);
      Vue.$toast.success('Album eliminado!');
    },
    EDIT_ALBUM(state, albums) {
      state.albums = albums;
      Vue.$toast.success('Album editado!');
    },
    ADD_TO_CART(state, album) {
      const foundIndex = state.cart.findIndex((item) => item.id === album.id);
      if (foundIndex != -1) {
        const { ...albumToUpdate } = state.cart[foundIndex];
        albumToUpdate.quantity++;
        state.cart[foundIndex] = albumToUpdate;
      } else {
        state.cart.push(album);
      }
      Vue.$toast.success('Album agregado al carrito!');
    },
    UPDATE_CART_QUANTITY(state, updatedCart) {
      state.cart = updatedCart;
    },
    DELETE_FROM_CART(state, id) {
      const index = state.cart.findIndex((item) => item.id === id);
      state.cart.splice(index, 1);
    },
    ADD_FILTER(state, filter) {
      state.filter = filter;
    },
  },
  actions: {
    async fetch_Albums({ commit, state }) {
      // sobre el if, si el array es vacio hago el fetch
      // la idea es hacerlo solo una vez
      // que seria la primera vez que carga la info
      // luego se manipularia la info que queda persistida
      // incluyendo lo que agrego desde el CRUD
      // no se me ocurrio una forma mas elegante haha =/
      if (!state.albums.length) {
        try {
          const response = await fetch('/data.json');
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
          }
          const data = await response.json();
          commit('GET_ALBUMS', data);
        } catch (error) {
          Vue.$toast.error('Ha ocurrido un error! Intenta nuevamente.');
        }
      }
    },
    add_Album({ commit, state }, album) {
      const lastItem = state.albums.slice(-1)[0];
      album.id = lastItem.id + 1;
      album.imgSrc = `img/${album.file.name}`;
      const { file, ...fixedData } = album;
      commit('ADD_ALBUM', fixedData);
    },
    delete_Album({ commit }, id) {
      commit('DELETE_ALBUM', id);
    },
    edit_Album({ commit, state }, { id, album }) {
      if (album.file !== null) {
        album.imgSrc = `img/${album.file.name}`;
      }
      album.id = id;
      const { file, ...fixedData } = album;
      const index = state.albums.findIndex((item) => item.id === id);
      const albums = [...state.albums];
      albums[index] = fixedData;
      commit('EDIT_ALBUM', albums);
    },
    add_To_Cart({ commit, state }, id) {
      const album = state.albums.find((album) => album.id === id);
      album.quantity = 1;
      commit('ADD_TO_CART', album);
    },
    update_Cart_Quantity({ commit, state }, { id, quantity }) {
      if (quantity === 0) {
        commit('DELETE_FROM_CART', id);
      } else {
        const index = state.cart.findIndex((item) => item.id === id);
        const cart = [...state.cart];
        cart[index].quantity = quantity;
        commit('UPDATE_CART_QUANTITY', cart);
      }
    },
    delete_From_Cart({ commit }, id) {
      commit('DELETE_FROM_CART', id);
    },
    filter_Albums({ commit }, value) {
      let filter = {};
      Object.entries(value).forEach(([key, value]) => {
        filter = { ...filter, [key]: value };
      });
      commit('ADD_FILTER', filter);
    },
  },
  getters: {
    bandsForFilter: (state) =>
      state.albums
        .map((album) => album.band)
        .filter((album, index, albums) => albums.indexOf(album) === index),
    filteredAlbums: ({ albums, filter }) => {
      const { withDiscount, ...filterCopy } = filter;
      return albums
        .filter((album) => {
          for (let key in filterCopy) {
            if (album[key] !== filterCopy[key]) {
              return false;
            }
          }
          return true;
        })
        .filter((album) => {
          if (filter.withDiscount && album.discount > 0) {
            return true;
          } else if (!filter.withDiscount) {
            return true;
          }
          return false;
        });
    },
  },
  plugins: [createPersistedState()],
});
