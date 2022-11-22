import {reactive} from "vue";
export const store = reactive({
  apiUrl: 'https://api.themoviedb.org/3/',
  key: 'fe838e4a027ed777ef7c6ef5c1f324cc',
  movieSerieSearch: '',
  categories: {
    movie: {
      title: 'Movie',
      dataList: [],
    },
    tv: {
      title: 'TV Series',
      dataList: [],
    }
  },
  categorySearch: ''
});