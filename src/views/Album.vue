<template>
  <div class="container">
    <div class="m-4" v-on:edit-album="setEditAlbum">
      <div class="box">
        <h1 class="title">{{ isAdd ? 'Agregar' : 'Editar' }} Album</h1>

        <b-field
          label="Banda"
          :label-position="labelPosition"
          :type="{ 'is-danger': !$v.album.band.required }"
          :message="{ 'El campo banda es requerido': !$v.album.band.required }"
        >
          <b-input
            placeholder="Nombre de la banda..."
            v-model.trim="$v.album.band.$model"
          />
        </b-field>

        <b-field
          label="Album"
          :label-position="labelPosition"
          :type="{ 'is-danger': !$v.album.name.required }"
          :message="{
            'El campo nombre del album es requerido': !$v.album.name.required,
          }"
        >
          <b-input
            placeholder="Nombre del album..."
            v-model.trim="$v.album.name.$model"
          ></b-input>
        </b-field>

        <b-field
          label="Formato"
          :label-position="labelPosition"
          :type="{ 'is-danger': !$v.album.format.required }"
          :message="{
            'El campo banda es requerido': !$v.album.format.required,
          }"
        >
          <b-select
            placeholder="Elegir formato..."
            v-model.trim="$v.album.format.$model"
            expanded
          >
            <option v-for="(format, i) in formats" :value="format" :key="i">
              {{ format }}
            </option>
          </b-select>
        </b-field>

        <b-field
          label="Categoria"
          :label-position="labelPosition"
          :type="{ 'is-danger': !$v.album.category.required }"
          :message="{
            'El campo banda es requerido': !$v.album.category.required,
          }"
        >
          <b-select
            placeholder="Elegir categoria..."
            v-model.trim="$v.album.category.$model"
            expanded
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

        <b-field
          label="Precio"
          :label-position="labelPosition"
          :type="{
            'is-danger': !$v.album.price.required,
            'is-danger': !$v.album.price.integer,
            'is-danger': !$v.album.price.minValue,
          }"
          :message="{
            'El campo precio es requerido': !$v.album.price.required,
            'El campo precio debe ser un valor decimal': !$v.album.price
              .integer,
            'El campo precio debe mayor a cero': !$v.album.price.minValue,
          }"
        >
          <b-input
            placeholder="Valor del album..."
            v-model.trim="$v.album.price.$model"
            type="number"
            icon="currency-usd"
          ></b-input>
        </b-field>

        <b-field>
          <b-checkbox v-model="album.haveDiscount">Oferta</b-checkbox>
        </b-field>

        <b-field
          label="Descuento"
          :label-position="labelPosition"
          v-if="album.haveDiscount"
          :type="{ 'is-danger': !$v.album.discount.required }"
          :message="{
            'El campo porcentaje de descuento es requerido': !$v.album.discount
              .required,
            'El campo porcentaje de descuento debe ser un valor decimal': !$v
              .album.discount.integer,
            'El campo porcentaje de descuento debe mayor o igual a cero': !$v
              .album.discount.minValue,
          }"
        >
          <b-input
            placeholder="Porcentaje de descuento..."
            v-model.trim="$v.album.discount.$model"
            type="number"
            icon="percent-outline"
          ></b-input>
        </b-field>

        <figure class="image is-128x128" v-if="!isAdd && !isDeletePhoto">
          <img :src="imgSrc" />
        </figure>

        <b-field v-if="!isAdd && !isDeletePhoto">
          <p class="control">
            <b-button
              @click="deletePhoto"
              label="Borrar imagen"
              type="is-info"
            />
          </p>
        </b-field>

        <b-field
          v-if="showFileInput"
          class="file"
          :class="{ 'has-name': !!album.file }"
          :type="{ 'is-danger': !$v.album.file.required }"
          :message="{
            'El campo imagen es requerido': !$v.album.file.required,
          }"
        >
          <b-upload v-model="album.file" class="file-label">
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Cargar imagen</span>
            </span>
            <span class="file-name" v-if="album.file">
              {{ album.file.name }}
            </span>
          </b-upload>
        </b-field>

        <b-field>
          <p class="control">
            <b-button
              v-on="isAdd ? { click: addAlbum } : { click: editAlbum }"
              :label="isAdd ? 'Agregar album' : 'Editar album'"
              type="is-primary"
              expanded
            />
          </p>
        </b-field>

        <b-notification type="is-danger" role="alert" v-if="submitStatus">
          {{ submitStatus }}
        </b-notification>
      </div>

      <div class="box">
        <b-table :data="albums">
          <b-table-column field="id" label="ID" v-slot="props" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="band" label="Banda" v-slot="props">
            {{ props.row.band }}
          </b-table-column>

          <b-table-column field="name" label="Album" v-slot="props">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="format" label="Formato" v-slot="props">
            {{ props.row.format }}
          </b-table-column>

          <b-table-column field="category" label="Categoria" v-slot="props">
            {{ props.row.category }}
          </b-table-column>

          <b-table-column field="price" label="Precio" v-slot="props" numeric>
            {{ props.row.price }}
          </b-table-column>

          <b-table-column
            field="discount"
            label="Descuento"
            v-slot="props"
            numeric
          >
            %{{ props.row.discount }}
          </b-table-column>

          <b-table-column field="imgSrc" label="Imagen" v-slot="props">
            <img :src="props.row.imgSrc" alt class="image is-64x64" />
          </b-table-column>

          <b-table-column label="Acciones" v-slot="props" numeric>
            <div class="buttons">
              <b-button
                size="is-small"
                type="is-info"
                icon-left="pencil"
                @click="setEditAlbum(props.row.id)"
              >
                Editar
              </b-button>

              <b-button
                size="is-small"
                type="is-danger"
                icon-left="delete"
                @click="deleteAlbum(props.row.id)"
              >
                Borrar
              </b-button>
            </div>
          </b-table-column>
        </b-table>
      </div>
      <Table />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  required,
  requiredIf,
  integer,
  minValue,
} from 'vuelidate/lib/validators';

export default {
  name: 'Nuevo-Album',
  data() {
    return {
      album: {
        band: '',
        name: '',
        format: null,
        category: null,
        price: '',
        haveDiscount: false,
        discount: 0,
        file: null,
      },
      labelPosition: 'on-border',
      submitStatus: null,
      isAdd: true,
      imgSrc: '',
      albumIdToEdit: '',
      showFileInput: true,
      isDeletePhoto: false,
    };
  },
  validations: {
    album: {
      band: {
        required,
      },
      name: {
        required,
      },
      format: {
        required,
      },
      category: {
        required,
      },
      price: {
        required,
        integer,
        minValue: (price) => price > 0,
      },
      file: {
        required: requiredIf(function() {
          if (this.isAdd) {
            return true;
          } else {
            if (this.isDeletePhoto) {
              return true;
            } else {
              return false;
            }
          }
        }),
      },
      discount: {
        required: requiredIf(function(model) {
          return model.haveDiscount;
        }),
        integer,
        minValue: (price) => price >= 0,
      },
    },
  },
  computed: {
    ...mapState(['albums', 'categories', 'formats']),
  },
  methods: {
    ...mapActions(['add_Album', 'delete_Album', 'edit_Album']),
    clearAlbum() {
      const { album } = this;
      album.band = '';
      album.name = '';
      album.format = null;
      album.category = null;
      album.price = '';
      album.haveDiscount = false;
      album.discount = 0;
      album.file = null;
    },
    addAlbum() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus =
          'Hay campos invalidos en el formulario, debes revisar e intentar nuevamente.';
      } else {
        const { haveDiscount, ...album } = this.album;
        album.price = Number(album.price);
        album.discount = Number(album.discount);
        this.add_Album(album);
        this.submitStatus = null;
        this.clearAlbum();
      }
    },
    deleteAlbum(id) {
      this.delete_Album(id);
    },
    setEditAlbum(id) {
      console.log(id);
      const { album } = this;
      this.isAdd = false;
      this.showFileInput = false;

      const { ...findedAlbum } = this.albums.find((album) => album.id === id);

      album.band = findedAlbum.band;
      album.name = findedAlbum.name;
      album.format = findedAlbum.format;
      album.category = findedAlbum.category;
      album.price = findedAlbum.price;
      album.haveDiscount = findedAlbum.discount > 0 ? true : false;
      album.discount = findedAlbum.discount;
      this.imgSrc = findedAlbum.imgSrc;
      this.albumIdToEdit = id;
    },
    deletePhoto() {
      this.showFileInput = true;
      this.isDeletePhoto = true;
    },
    editAlbum() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus =
          'Hay campos invalidos en el formulario, debes revisar e intentar nuevamente.';
      } else {
        const { haveDiscount, ...album } = this.album;
        album.price = Number(album.price);
        album.discount = Number(album.discount);
        album.imgSrc = this.imgSrc;
        const data = { id: this.albumIdToEdit, album };
        this.edit_Album(data);
        this.submitStatus = null;
        this.isAdd = true;
        this.imgSrc = '';
        this.showFileInput = true;
        this.isDeletePhoto = false;
        this.albumIdToEdit = '';
        this.clearAlbum();
      }
    },
  },
};
</script>
