<template>
     <div className="navBar-container">
      <div className="navBar">
        <div className="logo-container">
          <img :src="logo" alt="logo" class="logo" />
        </div>
        <div className="navBar-links">
         <a href="/">Home</a>
        </div>
       <DropdownMenu/>
      </div>
    </div>
</template>

<script>
    import DropdownMenu from './DropdownMenu.vue';
    export default {
        data() {
            return {
                logo: require('../assets/logo.png'),
            };
        },
        components: {
            DropdownMenu,
        },
    };
</script>

<style scoped>
.navBar-container {
    background-color: #0D2B44; 
    color: #fff; 
  }
  
  .navBar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo {
    height: 50px;
    width: 200px;
    margin-left: 10px;
  }

  .navBar-links{
    display: flex;
    align-items: center;
  }

  .navBar-links a{
    color: white;
    text-decoration: none;
    font-size: 24px;
  }

  .navBar-links a:hover{
    text-decoration: underline;
  }

</style>