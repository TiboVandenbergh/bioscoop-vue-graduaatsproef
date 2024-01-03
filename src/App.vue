<template>
  <div>
    <router-view name="navbar" />
    <router-view />
    <router-view name="footer" />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import NavBar from './components/NavBar.vue';

export default {
  components: {
    Footer,
    NavBar,
},
};
</script>

<style lang="css">
body{
  background-color: #cfcfcf;
  height: 100vh;
  margin: 0;  
  font-family: 'Roboto', sans-serif;
}

</style>
