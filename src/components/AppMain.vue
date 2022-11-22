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
    <div class="container">
      <div v-if="store.categories.movie.dataList.length" class="movies-list">
        <h2>Movies</h2>
        <div class="wrap movie">
          <PrintCardMovie v-for="movie in store.categories.movie.dataList" :key="movie.id" :movie="movie"/>
        </div>
      </div>
      <div  v-if="store.categories.tv.dataList.length" class="tv-list">
        <h2>TV Series</h2>
        <div class="wrap tv">
          <PrintCardMovie  v-for="tvSeries in store.categories.tv.dataList" :key="tvSeries.id" :movie="tvSeries"/>
        </div>
      </div>
    </div>
  </main>
</template>



<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

main {
  min-height: calc(100vh - 71px);
  height: calc(100vh - 71px);
  overflow: auto;
  background-image: linear-gradient(
    black 0%,
    $primary-color 100%
  );
}
.container {
  width: 70%;
  margin: 0 auto;
  height: 100%;
  color: white;
}
.wrap {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  color: white;
}

h2 {
  margin: 2rem 0;
}
</style>