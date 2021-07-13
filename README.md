# Music Store 💿

Desafio Final para el modulo de VueJS. Se uso VueJS, Vuex, Vue Router, Vuelidate y Buefy.

## Setup ⚙️

```
npm install
```

### Compilar para development 🛠️

```
npm run serve
```

### Tareas

- [x] Crear el proyecto
- [x] Crear rutas correspondientes a formulario, catalogo, carrito
- [x] Crear estados base
- En la vista del formulario:

  - [x] Inputs enlazados a un atributo en el estado
  - [x] Agregar producto
    - [x] Cargar selects con formato y categoria del state vuex
    - [x] Campo descuento se muestra si checkbox oferta es true
    - [x] Validacion de campos del form
    - [x] Limpiar form
  - [x] Listado de productos agregados
  - [x] Borrar producto por id
  - [x] Editar producto por id
    - [x] Setear producto a editar en el formulario
    - [x] Limpiar form

- En Home

  - [x] Fetch de los productos del state
  - [x] Ocupar un v-for para recorrer el arreglo productos y renderizarlos en la vista con un botón "añadir al carrito"
  - [x] Agregar al carrito pasando como argumento el id del producto
  - [x] Filtrar productos por banda, formato, categoria y por si tiene descuento
  - [x] Limpiar filtros

- En la vista del Carrito:

  - [x] Renderizar productos del carrito del state
  - [x] Borrar del carrito
  - [x] Modificar cantidad del producto en el carrito, si es cero eliminar del carrito
  - [x] Si tiene descuento calcular precio con descuento
  - [x] Incluir el total por producto y un total general

- [x] Mostar notificaciones
