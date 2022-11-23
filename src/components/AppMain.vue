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
      store,
    }
  },
  computed: {
    imagesJumbo() {
      if(store.categories.movie.dataList && store.categories.movie.dataList.length) {
        let outputImages='';
      for (let i=0; i<10; i++) {
        outputImages += `<img src="https://image.tmdb.org/t/p/w342${store.categories.movie.dataList[i].poster_path}" alt="${store.categories.movie.dataList[i].title}">`
      }
      return outputImages;
      }
    }
  }
}
</script>

<template>
  <main>
    <div v-if="store.isLoaded" class="main-wrapper">
      <div v-if="store.isJumbotron" class="jumbotron">
        <h2>Film più popolari</h2>
        <div class="jumbo-wrap" v-html="imagesJumbo"></div>
      </div>
      <div class="container">
        <div v-if="store.categories.movie.dataList.length" class="movies-list">
          <h2>Film</h2>
          <div class="wrap movie">
            <PrintCardMovie 
              v-for="movie in store.categories.movie.dataList" 
              :key="movie.id" 
              :type="movie"
              :castList="store.categories.movie.castList[movie.id]"
              :genreList="store.categories.movie.genreList[movie.id]"
            />
          </div>
        </div>
        <div v-if="store.categories.tv.dataList.length" class="tv-list">
          <h2>Serie TV</h2>
          <div class="wrap tv">
            <PrintCardMovie  
              v-for="tvSerie in store.categories.tv.dataList" 
              :key="tvSerie.id" 
              :type="tvSerie"
              :castList="store.categories.tv.castList[tvSerie.id]"
              :genreList="store.categories.tv.genreList[tvSerie.id]"
            />
          </div>
        </div>
        <h2 v-if="!store.categories.movie.dataList.length && !store.categories.tv.dataList.length">Nessun risultato trovato</h2>
      </div>
    </div>
    <div v-else class="loading">
      <img src="/logo-boolflix.png" alt="logo-boolflix">
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

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.jumbotron {
  position: relative;
  h2 {
    position: absolute;
    top: 20px;
    color: white;
    left: 50%;
    transform: translate(-50%);
    font-size: 2rem;
    text-shadow: 5px 5px black;
  }
}

.jumbo-wrap {
  width: 100%;
  height: 500px;
}

.jumbo-wrap:deep(img) {
  width: calc(100% / 10);
  height: 100%;
  object-fit: cover;
}
.container {
  width: 70%;
  margin: 0 auto;
  height: 100%;
  color: white;
  h2 {
    margin: 2rem 0;
  }
}
.wrap {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  color: white;
}

@media screen and (max-width: 800px) {
  .container {
    width: 90%;
  }
}
</style>