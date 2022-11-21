<script>
import {store} from '../data/store';
export default {
  name: 'AppMain',
  data() {
    return {
      store
    }
  }

}
</script>

<template>
  <main>
    <ul>
      <li v-for="movie in store.movieDataList" :key="movie.id">
        <h3>{{movie.title}}</h3>
        <h3>{{movie.original_title}}</h3>
        <h3>{{movie.original_language}}</h3>
        <h3>{{movie.vote_average}}</h3>
      </li>
    </ul>
  </main>
 
</template>



<style lang="scss" scoped>
ul {
  color: white;
}



</style>