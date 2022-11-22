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
        store.categories[category].idsList = [];
        for (let item of store.categories[category].dataList) {
        store.categories[category].idsList.push(item.id);
        }
        this.getCastList(category);
      })
      .catch((error) => {
        store.categories[category].dataList = [];
      })
    },

    getCastList(category) {
      for (let id of store.categories[category].idsList) {
        axios.get(`${store.apiUrl}${category}/${id}/credits`, {
          params: {
          api_key: store.key,
          language: 'it'
        }
        })
        .then((results) => {
          store.categories[category].castList.push(results.data.cast);
        })
      }
      console.log(store.categories[category].castList);
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
    getId(category) {
      for (let item of store.categories[category].dataList) {
        store.categories[category].idsList.push(item);
      }
      console.log(store.categories[category].dataList);
      console.log( store.categories[category].idsList);
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
      })
    },
    getPopularList() {
      for (let category in store.categories) {
        this.getApiTrending(category);
        store.categorySearch = category;
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