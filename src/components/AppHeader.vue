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
  },
  computed: {
    printGenre() {
      let outputOptions = '<option value="">Scegli Genere </option>';
      if(store.categories.movie.allGenres && store.categories.tv.allGenres)
      store.mergedGenres = store.categories.movie.allGenres;
      store.categories.tv.allGenres.forEach((item) => {
        if (!store.mergedGenres.includes(item)) {
          store.mergedGenres.push(item);
        }
      })
      store.mergedGenres.forEach((item) => {
        outputOptions += `<option value="${item.id}}">${item.name}</option>`;
      })
      return outputOptions;
    }
  }
}
</script>

<template>
  <header>
    <div class="container">
      <h1>{{title}}</h1>
      <div class="search">
        <div class="search-bar">
          <i class="fa-solid fa-magnifying-glass icon search"></i>
          <input @keyup.enter="$emit('search')" v-model.trim="store.movieSerieSearch" type="text" placeholder="Cerca un film o una serie TV">
        </div>
        <select @change="$emit('search')" v-model='store.categorySearch' name="categories">
          <option value="">Tutti</option>
          <option 
          v-for="(category, index) in store.categories" :key="index" :value="index">
          {{category.title}}
          </option>
        </select>
        <select @change="$emit('search')" v-model="store.genreSearch" name="genre" v-html="printGenre">
          
        </select>

        <button @click="$emit('search')">Cerca</button>
     </div>
    </div>
  </header>
</template>


<style lang="scss" scoped>
@use '../styles/partials/mixin' as *;
@use '../styles/partials/variables' as *;

header {
  background-color: black;
}

.container {
  padding: 1rem 3rem;
  @include betweenFlex;
}

.search {
  display: flex;
}
.search > * {
  margin-left: 0.5rem;
}

h1 {
  color: red;
  text-transform: uppercase;
}

.search-bar {
  position: relative;
}

input {
  text-indent: 30px;
  width: 220px;
}

.icon.search {
  position: absolute ;
  left: 10px;
  top: 3px;
  color: lighten($primary-color, 20%);
}

select {
  padding: 0 1rem;
}

button {
  background-color: red;
  padding: 2px 10px;
  color: white;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: darken(red, 10%);
  }
  &:active {
    box-shadow: 2px 2px 5px rgb(135, 5, 5);
  }
}
</style>