import {reactive} from "vue";
export const store = reactive({
  apiUrl: 'https://api.themoviedb.org/3/',
  key: 'fe838e4a027ed777ef7c6ef5c1f324cc',
  movieSerieSearch: '',
  genreSearch: '',
  categories: {
    movie: {
      title: 'Film',
      dataList: [],
      castList: {},
      genreList: {},
      filteredByGenre: [],
      allGenres: []
    },
    tv: {
      title: 'Serie TV',
      dataList: [],
      castList: {},
      genreList: {},
      filteredByGenre: [],
      allGenres: []
    }
  },
  categorySearch: '',
  isJumbotron: true,
  isLoaded: false,
  mergedGenres: [],
  jumbotronTrending: []
});