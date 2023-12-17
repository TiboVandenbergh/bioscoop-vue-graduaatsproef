<template>
    <div class="footer-container">
      <footer class="footer">
        <div class="footer-content">
          <h4>NexusMovies</h4>
          <ul>
            <li><a href="http://localhost:5173/#">Alle Films</a></li>
            <li><a href="#">Over Ons</a></li>
          </ul>
        </div>
        <div class="footer-content">
          <h4>Volg ons</h4>
          <ul class="icons-list">
            <li><a href="#" target="_blank"><img :src="facebook" alt="facebookIcon" /></a></li>
            <li><a href="#" target="_blank"><img :src="instagram" alt="instagramIcon" /></a></li>
          </ul>
        </div>
        <div class="footer-content">
          <h4>Contacteer ons</h4>
          <ul>
            <li><a href="tel:+3293961130">+32 0499728615</a></li>
            <li><a href="mailto:info@allphi.be">info@nexusmovies.be</a></li>
          </ul>
        </div>
      </footer>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      facebook: require('../assets/Facebook.png'),
      instagram: require('../assets/instagram.png'),
    };
  },
};
</script>

<style scoped>
    .footer {
    background-color: rgb(13, 43, 68);
    display: grid;
    grid-template-columns: repeat(3, 1fr);   
    height: 155px;
    position: relative;
}

.footer-content {
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
}

ul {
    margin-bottom: 0px;
}

.footer-content h4 {
    font-size: 24px;
    margin-bottom: 0.5rem;
}

.footer-content ul {
    list-style: none;
    padding: 0;
}

.footer-content li {
    margin-bottom: 15px;
}

.footer-content li a {
    color: white;
    text-decoration: none;
}

.icons-list {
    display: flex;
    justify-content: center;
}

.icons-list img {
    width: 45px;
}

.icons-list img:hover {
    width: 50px;
}

.footer-content li a:hover {
    color: #629BF4;
    text-decoration: underline;
}
</style>