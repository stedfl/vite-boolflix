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
      outputRating: null,
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

    getFullStars() {
      let outputStars = '';
      if (this.movie.vote_average > 0) {
        this.outputRating = Math.ceil(this.movie.vote_average / 2);
      } else {
        this.outputRating = 1;
      }
      for (let i = 0; i < this.outputRating; i++) {
        outputStars += `<i class="fa-solid fa-star icon star-full"></i>`;
      }
      return outputStars;
    },
    getEmptyStars() {
      let outputStars = '';
      for (let i = this.outputRating; i < 5; i++) {
        outputStars += `<i class="fa-solid fa-star"></i>`;
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
    <div v-else class="movie-info">
      <h3>Title: {{getTitle}}</h3>
      <h4 v-if="getOriginalTitle!=getTitle">Original Title: {{getOriginalTitle}}</h4>
      <div class="flag">
        <p v-if="isFlag"><span class="fi" :class="`fi-${getFlag}`"></span></p>
        <h5 v-else>Language: {{movie.original_language}}</h5>
      </div>
      <div class="stars-rating">
        <span>Rating: </span>
        <span class="full-stars" v-html="getFullStars"></span>
        <span class="empty-stars" v-html="getEmptyStars"></span>
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
.full-stars {
  color:#ffbd00;
}
.empty-stars {
  color: gray;
}

.overview {
  height: 300px;
  overflow: auto;
}

</style>