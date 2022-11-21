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
    getApi(category) {
      axios.get(store.apiUrl + category, {
        params: {
          api_key: store.key,
          query: store.movieSerieSearch,
        }
      })
      .then((results) => {
        if(category === 'movie') {
          store.movieDataList = results.data.results;
        } else {
          store.tvDataList = results.data.results;
        }
      })
    },
    getList() {
      if(store.categorySearch === '') {
        this.getApi('movie');
        this.getApi('tv');
      } else {
        this.getApi(store.categorySearch);
        if (store.categorySearch === 'movie') {
          store.tvDataList = [];
        } else {
        store.movieDataList = [];
        }
      }
    }
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