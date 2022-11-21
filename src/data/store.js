import {reactive} from "vue";
export const store = reactive({
  apiUrl: 'https://api.themoviedb.org/3/search/movie',
  key: 'fe838e4a027ed777ef7c6ef5c1f324cc',
  movieDataList: [],
  movieSerieSearch: '',
  categories: [
    {
      title: 'Film',
      apiQuery: 'movie'
    },
    {
      title: 'Serie Tv',
      apiQuery: 'tv'
    }
  ],
  categorySearch: ''
});