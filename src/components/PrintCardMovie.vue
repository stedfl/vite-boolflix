<script>
import {langFlag} from '../data/data';
import { store } from '../data/store';
export default {
  name: 'PrintCardMovie',
  props: {
    movie: Object,
  },
  data() {
    return {
      store,
      langFlag,
      isFlag: false,
      isMoreInfo: false
    }
  },
  methods: {
    showFlag() {
      if (this.langFlag.includes(this.movie.original_language)) {
        this.isFlag = true;
      } else {
        this.isFlag = false;
      }
    },


  },
  computed: {
    getFlag() {
      if (this.langFlag.includes(this.movie.original_language)) {
        if (this.movie.original_language === 'en') {
          return 'gb'
        } else {
          return this.movie.original_language
        }
      }
    },
    getTitle() {
      if (store.categorySearch === 'tv') {
        return this.movie.name
      } else {
        return this.movie.title
      }
    },
    getOriginalTitle() {
      if (store.categorySearch === 'movie') {
        return this.movie.original_name
      } else {
        return this.movie.original_name
      }
    },
    getImage() {
      return `https://image.tmdb.org/t/p/w342${this.movie.poster_path}`
    },
    getStars() {
      let outputStars = '';
      let outputRating = null;
      if (this.movie.vote_average > 0) {
        outputRating = Math.ceil(this.movie.vote_average / 2);
      } else {
        outputRating = 1;
      }
      let i;
      for (i = 0; i < outputRating; i++) {
        outputStars += `<i class="fa-solid fa-star icon full-star"></i>`;
      }
      for (; i < 5; i++) {
        outputStars += `<i class="fa-solid fa-star icon empty-star"></i>`;
      }
      return outputStars;
    }
  },
  mounted() {
    this.showFlag();
  }

}
</script>

<template>
  <div class="card" @mouseenter="isMoreInfo=true" @mouseleave="isMoreInfo=false">
    <img v-if="!isMoreInfo" :src="getImage" :alt="getTitle">
    <div  v-else class="movie-info">
      <h3>Title: {{getTitle}}</h3>
      <h4 v-if="getOriginalTitle!=getTitle">Original Title: {{getOriginalTitle}}</h4>
      <div class="flag">
        <p v-if="isFlag"><span class="fi" :class="`fi-${getFlag}`"></span></p>
        <h5 v-else>Language: {{movie.original_language}}</h5>
      </div>
      <div class="rating">
        <p>Rating: </p>
        <div class="stars" v-html="getStars"></div>
      </div>
      <p class="overview">{{movie.overview}}</p>
    </div>
  </div>
</template>



<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
.card {
  width: calc(100% / 4 - 2rem);
  height: 460px;
  background-color:$primary-color;
  margin-bottom: 2rem;
  img {
    width: 100%;
    height: 100%;
  }
}

.movie-info {
  padding: 1rem;
  border: 1px solid white;
  width: 100%;
  height: 100%;
}

.rating {
  display: flex;
}

.stars:deep(.icon.full-star) {
  color: #ffbd00;
}

.stars:deep(.icon.empty-star)  {
  color: lighten($primary-color, 40%);
}
.overview {
  height: 300px;
  overflow: auto;
}

</style>