<script>
import {langFlag} from '../data/data';
import { store } from '../data/store';
export default {
  name: 'PrintCardMovie',
  props: {
    type: Object,
    category: String
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
      if (this.langFlag.includes(this.type.original_language)) {
        this.isFlag = true;
      } else {
        this.isFlag = false;
      }
    },


  },
  computed: {
    getFlag() {
      if (this.langFlag.includes(this.type.original_language)) {
        if (this.type.original_language === 'en') {
          return 'gb'
        } else {
          return this.type.original_language
        }
      }
    },
    getTitle() {
      if (this.category === 'tv') {
        return `Titolo: ${this.type.name}`
      } else {
        return `Titolo: ${this.type.title}`
      }
    },
    getOriginalTitle() {
      if((this.type.original_name === this.type.name) && (this.type.original_title === this.type.title)) {
        return '';
      } else {
        if (this.category === 'tv') {
          return `Titolo originale: ${this.type.original_name}`;
        } else {
          return `Titolo originale: ${this.type.original_title}`;
        }
      }
    },
    getImage() {
      return `https://image.tmdb.org/t/p/w342${this.type.poster_path}`
    },
    getStars() {
      let outputStars = '';
      let outputRating = null;
      if (this.type.vote_average > 0) {
        outputRating = Math.ceil(this.type.vote_average / 2);
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
      <h3>{{getTitle}}</h3>
      <h3>{{getOriginalTitle}}</h3>
      <div class="flag">
        <p v-if="isFlag"><span class="fi" :class="`fi-${getFlag}`"></span></p>
        <h5 v-else>Lingua: {{type.original_language}}</h5>
      </div>
      <div class="rating">
        <p>Voto: </p>
        <div class="stars" v-html="getStars"></div>
      </div>
      <p class="overview">{{type.overview}}</p>
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