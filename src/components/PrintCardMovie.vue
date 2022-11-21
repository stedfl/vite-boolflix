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
      <div class="flag">
        <h3 v-if="isFlag"><span class="fi" :class="`fi-${getFlag}`"></span></h3>
        <h3 v-else>{{movie.original_language}}</h3>
      </div>
      <h3>{{movie.vote_average}}</h3>
    </li>
  </div>
</template>



<style lang="scss" scoped>
ul {
  color: white;
}



</style>