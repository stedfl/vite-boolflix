<script>
import {store} from '../data/store.js';
import {title} from '../data/data.js';
export default {
  name: 'AppHeader',
  data() {
    return {
      store,
      title
    }
  }
}
</script>

<template>
  <header>
    <div class="container">
      <h1>{{title}}</h1>
      <div class="search-bar">
        <input v-model.trim="store.movieSerieSearch" type="text" placeholder="Cerca un film o una serie TV">
        <select v-model='store.categorySearch' name="categories">
          <option selected value="">Tutti</option>
          <option 
          v-for="(category, index) in store.categories" :key="index" :value="index">
          {{category.title}}
          </option>
        </select>
        <button @click="$emit('search')">Cerca</button>
     </div>
    </div>
  </header>
</template>


<style lang="scss" scoped>
@use '../styles/partials/mixin' as *;

header {
  background-color: black;
}

.container {
  padding: 1rem 3rem;
  @include betweenFlex;
}
h1 {
  color: red;
  text-transform: uppercase;
}

button {
  background-color: red;
  color: white;
  border: 1px solid black;
}

</style>