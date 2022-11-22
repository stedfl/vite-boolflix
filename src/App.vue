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
        }
      })
      .then((results) => {
        store.categories[category].dataList = results.data.results;
      })
    },
    getList() {
      if(store.categorySearch === '') {
        for (let category in store.categories) {
          this.getApiSearch(category);
        }
      } else {
        console.log(store.categorySearch);
        for (let category in store.categories) {
          store.categories[category].dataList = [];
        }
        this.getApiSearch(store.categorySearch);
      }
    },
    getApiTrending(category) {
      axios.get(`${store.apiUrl}trending/${category}/week`, {
        params: {
          api_key: store.key,
        }
      })
      .then((results) => {
        store.categories[category].dataList = results.data.results;
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