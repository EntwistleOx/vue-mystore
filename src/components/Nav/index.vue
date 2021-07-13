<template>
  <div>
    <b-navbar class="is-black">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          <img src="logo.png" alt="Music Store Logo" />
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Carrito' }">
          Carrito
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Nuevo Album' }">
          Gestion de Albumes
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Nav',
};
</script>
