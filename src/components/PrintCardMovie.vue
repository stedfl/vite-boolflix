<script>
import {langFlag} from '../data/data';
import { store } from '../data/store';
export default {
  name: 'PrintCardMovie',
  props: {
    type: Object,
  },
  data() {
    return {
      store,
      langFlag,
      isFlag: false,
      isMoreInfo: false,
      isAvailable: false
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
    <div v-if="!isMoreInfo" class="front-card">
      <h2 v-if="!isAvailable">{{this.type.name || this.type.original_title}}</h2>
      <img :src="getImage" :alt="getTitle" :class="{'notavailable': !isAvailable}">
    </div>
       
    <div v-else class="back-card">
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
      <p v-if="type.overview" class="overview info">"{{type.overview}}"</p>
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
}

.front-card {
  height: 100%;
  text-align: center;
  background-color: white;
  img {
    width: 100%;
    height: 100%;
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
  padding: 1rem;
  border: 1px solid white;
  width: 100%;
  height: 100%;
}

.info {
  margin-bottom: 0.5rem;
}

h2, h3, p {
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

.overview {
  height: 300px;
  overflow: auto;
  font-style: italic;
}
</style>