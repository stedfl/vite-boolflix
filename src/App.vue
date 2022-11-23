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
        this.getFilteredForGenre(category);
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
          this.getGenreOption(category);
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
    getFilteredForGenre(category) {
      if(store.categories[category].dataList.length) {
        store.categories[category].idForFilteredGenre = [];
        if(!(store.genreSearch === '')) {
          for (let item of store.categories[category].dataList) {
            for (let el in (store.categories[category].genreList[item.id])) {
              if(store.categories[category].genreList[item.id][el].name === store.genreSearch) {
                store.categories[category].idForFilteredGenre.push(item.id);
              }
            }
          }
          console.log("Lista id filtri" + category + store.categories[category].idForFilteredGenre);
          console.log("Lista data" + category + store.categories[category].dataList);
          if(store.categories[category].idForFilteredGenre.length) {
            store.categories[category].filtereList = store.categories[category].dataList.filter((item) => store.categories[category].idForFilteredGenre.includes(item.id));
          } else {
            store.categories[category].filtereList = [];
          }
          console.log("lista filtrata per quegli id"+category + store.categories[category].filtereList);


        } else {
          store.categories[category].filtereList = store.categories[category].dataList;
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
        this.getGenreOption(category);
      })
    },
    getPopularList() {
      for (let category in store.categories) {
        this.getApiTrending(category);
      } 
    },
    getGenreOption(category) {
      for (let item of store.categories[category].dataList) {
        for (let el in (store.categories[category].genreList[item.id])) {
         if(!store.genreOptions.includes(store.categories[category].genreList[item.id][el].name))
          store.genreOptions.push(store.categories[category].genreList[item.id][el].name);
        }
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