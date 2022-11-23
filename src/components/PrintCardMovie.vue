<script>
import {langFlag} from '../data/data';
import { store } from '../data/store';
export default {
  name: 'PrintCardMovie',
  props: {
    type: Object,
    castList: Array,
    genreList: Array
  },
  data() {
    return {
      store,
      langFlag,
      isFlag: false,
      isAvailable: false,
      castMaxLength: 5,
      rateRange: 5
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
    getIsOriginal() {
      if ((this.type.original_name != this.type.name) || (this.type.original_title != this.type.title)) {
        return true
      }
    },
    getImage() {
      if(this.type.poster_path === null) {
        return 'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg'
      } else {
        this.isAvailable = true;
        return `https://image.tmdb.org/t/p/w342${this.type.poster_path}`
      }
      
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
      for (; i < this.rateRange; i++) {
        outputStars += `<i class="fa-solid fa-star icon empty-star"></i>`;
      }
      return outputStars;
    },
    getCastList() {
      let outputCastList = '';
      let comma = ', ';
      if (this.castList && this.castList.length) {
        for (let i = 0; i < this.castList.length && i < this.castMaxLength ; i++) {
          if (i === (this.castList.length - 1) || (i === this.castMaxLength - 1)) {
            comma = ''
          }
          outputCastList += `${this.castList[i].name}${comma}`
        }
      }
      return outputCastList;
    },
    getGenreList() {
      let outputGenreList = '';
      let comma = ', ';
      if (this.genreList && this.genreList.length) {
        for (let i = 0; i < this.genreList.length; i++) {
          if (i === (this.genreList.length - 1)) {
            comma = ''
          } 
          outputGenreList += `${this.genreList[i].name}${comma}`
        }
      }
      return outputGenreList
    }
  },
  mounted() {
    this.showFlag();
  }

}
</script>

<template>
  <div class="card" @mouseenter="isMoreInfo=true" @mouseleave="isMoreInfo=false">
    <div class="inner-card">
      <div  class="front-card">
        <h2 v-if="!isAvailable">{{this.type.name || this.type.original_title}}</h2>
        <img :src="getImage" :alt="this.type.name || this.type.original_title" :class="{'notavailable': !isAvailable}">
      </div>
       
      <div class="back-card">
        <h3 class="info">Titolo: <span>{{this.type.name || this.type.title}}</span></h3>
        <h3 v-if="getIsOriginal" class="info">Titolo originale: <span>{{this.type.original_name || this.type.original_title}}</span></h3>
        <div class="flag info">
          <p v-if="isFlag"><span class="fi" :class="`fi-${getFlag}`"></span></p>
          <h3 v-else>Lingua: {{type.original_language}}</h3>
        </div>
        <div class="rating info">
          <h3>Voto:</h3>
          <div class="stars" v-html="getStars"></div>
        </div>
        <div v-if="castList && castList.length" class="cast info">
          <span class="info-title">Cast: </span>
          <span>{{getCastList}}</span>         
        </div>
        <div v-if="genreList && genreList.length" class="genre info">
          <span class="info-title">Genere: </span>
          <span>{{getGenreList}}</span>
        </div>
        <p v-if="type.overview" class="overview info">'{{type.overview}}'</p>
      </div>
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
  perspective: 1000px;
  background-image: url(/logo-boolflix.png);
  background-size:80%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.inner-card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.front-card, .back-card {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.front-card {
  height: 100%;
  text-align: center;
  background-color: white;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  img.notavailable {
    height: 80%;
    width: 80%;
    object-fit: cover;
  }
  h2 {
    color: $primary-color;
    padding: 1rem;
  }
}

.back-card {
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  background-image: linear-gradient(
    black 0%,
    $primary-color 100%
  );
  padding: 1rem;
  border: 1px solid red;
  box-shadow: inset 0 0 40px 40px rgba(255, 1, 1, 0.1);
}

.card:hover .inner-card {
  transform: rotateY(180deg);
}

.info {
  margin-bottom: 0.5rem;
}

h2, h3, p, span {
  font-size: 1rem;
}

span {
  font-weight: 400;
}

.rating {
  display: flex;
}

.stars {
  margin-left: 10px;
}

.stars:deep(.icon.full-star) {
  color: #ffbd00;
}

.stars:deep(.icon.empty-star)  {
  color: lighten($primary-color, 40%);
}

.info-title {
  font-weight: bold;
}
.overview {
  height: 30%;
  overflow: auto;
  font-style: italic;
}

@media screen and (max-width: 1600px) {
  .card {
    width: calc(100% / 3 - 2rem);
  }
}

@media screen and (max-width: 1200px) {
  .card {
    width: calc(100% / 2 - 2rem);
  }
}

@media screen and (max-width: 800px) {
  .card {
    width: calc(100% - 2rem);
  }
}
</style>