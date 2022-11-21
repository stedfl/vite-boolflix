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
  }

}
</script>
<template>
  <AppHeader/>
  <AppMain />
  
</template>



<style lang="scss">
@use './styles/general.scss';

</style>