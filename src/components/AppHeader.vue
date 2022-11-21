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
  <div class="container">
    <h1>{{title}}</h1>
    <div class="search-bar">
    <input @keyup.enter="$emit('search')" v-model="store.movieSerieSearch" type="text">
    <select v-model='store.categorySearch' name="categories">
      <option selected value="movie">Select Category</option>
      <option 
      v-for="(category, index) in store.categories" :key="index" :value="category.categoryApi">
        {{category.title}}
      </option>
    </select>
  </div>
  </div>

</template>


<style lang="scss" scoped>
@use '../styles/partials/mixin' as *;

.container {
  padding: 1rem 3rem;
  @include betweenFlex;
}
h1 {
  color: red;
  text-transform: uppercase;
}

</style>