<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import axios from "axios";
import { store } from "./data/store.js";

export default {
  name: "App",
  components: {
    AppHeader,
    AppMain,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getApiSearch(category) {
      store.isLoaded = false;
      axios
        .get(store.apiUrl + "search/" + category, {
          params: {
            api_key: store.key,
            query: store.movieSerieSearch,
            language: "it",
          },
        })
        .then((results) => {
          store.categories[category].dataList = results.data.results;
          this.filterByGenre(category)
          this.getCastList(category);
          this.getGenreList(category);
          store.isLoaded = true;
        })
        .catch((error) => {
          store.categories[category].dataList = [];
        });
    },

    filterByGenre(category) {
      store.categories[category].filteredByGenre = [];
      if(store.categories[category].dataList.length) {
        if(store.genreSearch !== '') {
          store.categories[category].filteredByGenre = store.categories[category].dataList.filter((item) => {
            return item.genre_ids.includes(store.genreSearch);
          })

        } else {
          store.categories[category].filteredByGenre = store.categories[category].dataList;
        }
      }

    },
    getCastList(category) {
      for (let item of store.categories[category].dataList) {
        axios
          .get(`${store.apiUrl}${category}/${item.id}/credits`, {
            params: {
              api_key: store.key,
              language: "it",
            },
          })
          .then((results) => {
            store.categories[category].castList[item.id] = results.data.cast;
          });
      }
    },

    getGenreList(category) {
      for (let item of store.categories[category].dataList) {
        axios
          .get(`${store.apiUrl}${category}/${item.id}`, {
            params: {
              api_key: store.key,
              language: "it",
            },
          })
          .then((results) => {
            store.categories[category].genreList[item.id] = results.data.genres;
          });
      }
    },
    getList() {
      if (store.movieSerieSearch.length) {
        store.isJumbotron = false;
        if (store.categorySearch === "") {
          for (let category in store.categories) {
            this.getApiSearch(category);
          }
        } else {
          for (let category in store.categories) {
            store.categories[category].dataList = [];
            store.categories[category].filteredByGenre = [];
            store.categories[category].genreList = {};
            store.categories[category].castList = {};
          }
          this.getApiSearch(store.categorySearch);
        }
      }
    },
    getCategoryGenre(category) {
      axios
        .get(`${store.apiUrl}genre/${category}/list`, {
          params: {
            api_key: store.key,
            language: "it",
          },
        })
        .then((results) => {
          store.categories[category].allGenres = results.data.genres;
          console.log(store.categories[category].allGenres);
        });
    },
    getAllGenre() {
      for (let category in store.categories) {
        this.getCategoryGenre(category);
        
      }
    },
    getApiTrending(category) {
      axios
        .get(`${store.apiUrl}trending/${category}/week`, {
          params: {
            api_key: store.key,
            language: "it",
          },
        })
        .then((results) => {
          store.categories[category].dataList = results.data.results;
          store.categories[category].filteredByGenre = store.categories[category].dataList;
          this.getJumbotronList();
          store.isLoaded = true;
          this.getCastList(category);
          this.getGenreList(category);
        });
    },
    getPopularList() {
      for (let category in store.categories) {
        this.getApiTrending(category);
      }
    },
    getJumbotronList() {
      axios
        .get(`${store.apiUrl}trending/all/day`, {
          params: {
            api_key: store.key,
            language: "it",
          },
        })
        .then((results) => {
          store.jumbotronTrending = results.data.results;
        });
    },
  },
  mounted() {
    this.getPopularList();
    this.getAllGenre();
  },
};
</script>
<template>
  <AppHeader @search="getList" />
  <AppMain />
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
