import {reactive} from "vue";
export const store = reactive({
  apiUrl: 'https://api.themoviedb.org/3/search/',
  key: 'fe838e4a027ed777ef7c6ef5c1f324cc',
  movieDataList: [],
  tvDataList: [],
  movieSerieSearch: '',
  categories: [
    {
      title: 'Movie',
      categoryApi: 'movie'
    },
    {
      title: 'TV Series',
      categoryApi: 'tv'
    }
  ],
  categorySearch: ''
});