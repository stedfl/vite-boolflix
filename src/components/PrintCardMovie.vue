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
      outputRating: null
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
    getRating() {
      if (this.movie.vote_average > 0) {
        this.outputRating = Math.ceil(this.movie.vote_average / 2);
      } else {
        this.outputRating = 1;
      }
      return this.outputRating;
    },
    getFullStars() {
      let outputStars = '';
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
  <div class="card">
    <li>
      <h3>{{getTitle}}</h3>
      <h3 v-if="getOriginalTitle!=getTitle">{{getOriginalTitle}}</h3>
      <img :src="getImage" :alt="getTitle">
      <div class="flag">
        <h3 v-if="isFlag"><span class="fi" :class="`fi-${getFlag}`"></span></h3>
        <h3 v-else>{{movie.original_language}}</h3>
      </div>
      <h3>{{getRating}}</h3>
      <div class="stars-rating">
        <span class="full-stars" v-html="getFullStars"></span>
        <span class="empty-stars" v-html="getEmptyStars"></span>
      </div>
    </li>
  </div>
</template>



<style lang="scss" scoped>
.full-stars {
  color:#ffbd00;
}
.empty-stars {
  color: gray;
}

</style>