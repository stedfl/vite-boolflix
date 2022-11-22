<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import axios from 'axios';
import {store} from './data/store.js';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      store
    }
  },
  methods: {
    getApiSearch(category) {
      axios.get(store.apiUrl + 'search/' + category, {
        params: {
          api_key: store.key,
          query: store.movieSerieSearch,
          language: 'it'
        }
      })
      .then((results) => {
        store.categories[category].dataList = results.data.results;
        this.getCastList(category);
        this.getGenreList(category);
      })
      .catch((error) => {
        store.categories[category].dataList = [];
      })
    },
  

    getCastList(category) {
      store.categories[category].castList = {};
      for (let item of store.categories[category].dataList) {
        axios.get(`${store.apiUrl}${category}/${item.id}/credits`, {
          params: {
          api_key: store.key,
          language: 'it'
        }
        })
        .then((results) => {
          store.categories[category].castList[item.id] = results.data.cast;
        })
      }
    },

    getGenreList(category) {
      store.categories[category].genreList = {};
      for (let item of store.categories[category].dataList) {
        axios.get(`${store.apiUrl}${category}/${item.id}`, {
          params: {
          api_key: store.key,
          language: 'it'
        }
        })
        .then((results) => {
          store.categories[category].genreList[item.id] = results.data.genres;
        })
      }
    },
    getList() {
      if(store.movieSerieSearch.length) {
        if(store.categorySearch === '') {
        for (let category in store.categories) {
          this.getApiSearch(category);
        }
      } else {
        for (let category in store.categories) {
          store.categories[category].dataList = [];
        }
        this.getApiSearch(store.categorySearch);
      }
      }
    },
    getApiTrending(category) {
      axios.get(`${store.apiUrl}trending/${category}/week`, {
        params: {
          api_key: store.key,
          language: 'it'
        }
      })
      .then((results) => {
        store.categories[category].dataList = results.data.results;
        this.getCastList(category);
        this.getGenreList(category);
      })
    },
    getPopularList() {
      for (let category in store.categories) {
        this.getApiTrending(category);
      } 
    }
  },
  mounted() {
    this.getPopularList();
  }
}
</script>
<template>
  <AppHeader @search="getList"/>
  <AppMain />
</template>

<style lang="scss">
@use './styles/general.scss';

</style>