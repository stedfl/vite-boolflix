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
    getApi() {
      console.log(store.categorySearch);
      console.log(store.movieDataList);
      axios.get(store.apiUrl + store.categorySearch, {
        params: {
          api_key: store.key,
          query: store.movieSerieSearch,
        }
      })
      .then((results) => {
        store.movieDataList = results.data.results;
      })
      
    }
  }

}
</script>
<template>
  <AppHeader @search="getApi"/>
  <AppMain />
  
</template>



<style lang="scss">
@use './styles/general.scss';

</style>