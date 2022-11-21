<script>
import PrintCardMovie from './PrintCardMovie.vue'
import {store} from '../data/store';
export default {
  name: 'AppMain',
  components: {
    PrintCardMovie
  },
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
      <h3>{{store.categorySearch}}</h3>
      <PrintCardMovie v-for="movie in store.movieDataList" :key="movie.id" :movie="movie"/>
      <PrintCardMovie v-for="tvSeries in store.tvDataList" :key="tvSeries.id" :movie="tvSeries"/>
    </ul>
  </main>
 
</template>



<style lang="scss" scoped>
ul {
  color: white;
}



</style>