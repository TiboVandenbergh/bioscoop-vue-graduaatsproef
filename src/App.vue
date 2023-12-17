<template>
  <NavBar />
  <nav>
    <router-link to="/">Home</router-link> |
    <!-- <router-link to="/about">About</router-link> -->
  </nav>
  <router-view/>
<Footer />
</template>

<script>
import Footer from '@/components/Footer.vue';
import NavBar from './components/NavBar.vue';

export default {
  components: {
    Footer,
    NavBar
},
};
</script>

<style lang="scss">
body{
  /* background: white; */
  background-color: #cfcfcf;
  height: 100vh;
  margin: 0;  
  font-family: 'Roboto', sans-serif;
}

</style>
