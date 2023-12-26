<template>
    <div class="bodyMovieDetail">
      <BackButton />
      <img class="projector" :src="projector" alt="" />
      <div class="movieInfo-container">
        <div class="img">
          <img :src="selectedMovie.thumbnail" />
        </div>
        <div class="info">
          <h1>{{ selectedMovie.title }} - {{ selectedMovie.year }}</h1>
          <p>{{ selectedMovie.extract }}</p>
          <h2>Genres</h2>
          <p class="genres">{{ selectedMovie.genres ? selectedMovie.genres.join(', ') : '' }}</p>
          <h2>Cast</h2>
          <div class="castMembers">
            <p v-for="(castMember, index) in castMembers()" :key="index" @click="handleCastMemberClick(castMember)">
              {{ index === 0 ? '' : ', ' }}{{ castMember }}
            </p>
          </div>
          <h2>Datum</h2>
          <p class="currentDate">{{ currentDate() }}</p>
          <h2>Tijd</h2>
          <div class="time">
            <p v-for="(time, index) in timeArr" :key="index" @click="handleCheck(index)" :class="{ checked: index === checkedTime }">{{ time }}</p>
          </div>
          <div class="trailer">
            <Trailer v-if="isTrailerVisible" :trailerID="selectedMovie.trailerId" />
          </div>
        </div>
      </div>
      <div class="trailerBtnContainer">
        <button class="trailerBtn" @click="handleWatchTrailerClick">{{ isTrailerVisible ? 'Close Trailer' : 'Watch Trailer' }}</button>
      </div>
      <div class="infoSeats">
        <h2>Kies plaats(en)</h2>
      </div>
      <div>
        <div class="line"></div>
        <div class="seats">
          <div v-for="i in 60" :key="i" @click="handleSeatClick(i)"  :class="{ 'grid-item': true, selected: selectedSeatsByTime[checkedTime].includes(i) }">{{ i }}</div>
        </div>
      </div>
      <h2>Aantal Ticket(s): {{ numberOfTickets }}</h2>
      <h2 class="prijs">Prijs: €{{ price }}</h2>
      <button class="betaalBtn" @click="betaal">Betaal</button>
    </div>
  </template>
  
<script>
import Trailer from '@/components/Trailer';
import Notifications from '@/components/Notification.js';
import { useRouter   } from 'vue-router';
import { createTicket, getMovies } from '../api';
import BackButton from '../components/BackButton.vue';

export default {
  components: {
    Trailer,
    BackButton
  },
  data() {
    return {
      projector: require('../assets/projector.png'),
      router: useRouter(),
      title: this.$route.params.title,
      checkedTime: 0,
      numberOfTickets: 0,
      price: 0,
      timeArr: ["19:30", "20:30", "22:00"],
      selectedSeatsByTime: {
        0: [],
        1: [],
        2: [],
      },
      selectedMovie: {},
      isTrailerVisible: false,
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const response = await getMovies([]);
      const selectedMovies = response.data.find(movie => movie.title === this.title);
      this.selectedMovie = selectedMovies;
    },
    handleCheck(index) {
      if (index === this.checkedTime) {
        return;
      }
      this.numberOfTickets = 0;
      this.price = 0;
      this.selectedSeatsByTime[this.checkedTime] = [];
      this.checkedTime = index;
    },
    currentDate() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    castMembers() {
      return this.selectedMovie.cast ? this.selectedMovie.cast.slice(0, 6) : [];
    },
    handleSeatClick(seat) {
      const currentSelectedSeats = this.selectedSeatsByTime[this.checkedTime];
      const isSeatSelected = currentSelectedSeats.includes(seat);
      const newNumberOfTickets = isSeatSelected ? this.numberOfTickets - 1 : this.numberOfTickets + 1;
      this.numberOfTickets = newNumberOfTickets;
      const newPrice = newNumberOfTickets * 12;
      this.price = newPrice;
      const newSelectedSeats = isSeatSelected
        ? currentSelectedSeats.filter(selectedSeat => selectedSeat !== seat)
        : [...currentSelectedSeats, seat];
      this.selectedSeatsByTime[this.checkedTime] = newSelectedSeats;
    },
    handleCastMemberClick(castMember) {
      const searchUrl = `https://www.google.com/search?q=${castMember}`;
      window.open(searchUrl, '_blank');
    },
    betaal() {
      if (this.numberOfTickets === 0) {
        return Notifications({ tekst: 'U heeft geen stoel(en) geselecteerd!', type: 'error' });
      }
      if (this.selectedSeatsByTime[this.checkedTime].length === 0) {
        return Notifications({ tekst: 'U heeft geen stoelen gekozen voor het huidige tijdslot!', type: 'error' });
      }
      const confirm = window.confirm('Weet u zeker dat u wilt betalen?');
      if (!confirm) {
        return;
      }
    
      const data = this.getData();
      createTicket(data)
        .then(response => {
          Notifications({ tekst: 'Betaling Geslaagd!', type: 'success' });
          const ticketId = response.data.id;
          this.$router.push({
            name: 'betalingGeslaagd',
            params: { title: this.selectedMovie.title, id: ticketId },
          });
          window.scrollTo(0, 0);
        })
        .catch(error => {
          Notifications({ tekst: "Betaling mislukt - niet ingelogd", type: "error" })
          console.error('Error bij data doorsturen', error);
        });
    },
    getData() {
      const data = {
        time: this.timeArr[this.checkedTime],
        date: this.currentDate(),
        price: this.price,
        numberOfTickets: this.numberOfTickets,
        seats: this.selectedSeatsByTime[this.checkedTime],
        movie: this.selectedMovie.title,
        thumbnail: this.selectedMovie.thumbnail,
      };
      return data;
    },
    handleWatchTrailerClick() {
      this.isTrailerVisible = !this.isTrailerVisible;
    },
  },
};
</script>

<style scoped>
.bodyMovieDetail{
    margin-left: 80px;
    margin-right: 50px;
}

.bodyMovieDetail h1, .bodyMovieDetail h2 {
    color: #132a9e;;
}

.movieInfo-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 16px; 
    background-color: white;
    margin-top: 20px;
    margin-bottom: 20px;
}

.projector{
    position: absolute;
    margin-left: 1328px;
    top: 14.5%;
    width: 490px;
    height: 729.3px;
}

.info{
    margin-left: 30px;
    width: 800px;
}

.info h2{
    margin: 0;
}

.img img {   
    border: 3px solid navy;
    height: 700px; 
    width: 470px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1.7);
    /* border-radius: 4%; */
}

.castMembers{
    display: flex;  
}
.castMembers p{
    cursor: pointer;
}

.castMembers p:hover{
    text-decoration: underline;
}

.currentDate {
    margin-top: 20px; 
    background-color: #3498db; 
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold; 
    text-align: center; 
    width: 100px;
}
  
.time {
    display: flex;
    gap: 15px;
}
  
.time p {
    border: 1px solid #ccc; 
    background-color: #f5f5f5; 
    padding: 10px; 
    cursor: pointer;
    border-radius: 5px; 
}
  
.time p.checked {
    background-color: #3498db;
    color: white;
    font-weight: bold;
}

/* :not zorgt ervoor dat als het checked is dat de hover niet wordt toegepast */
.time p:not(.checked):hover {
    background-color: #ddd;
}

.infoSeats{
    grid-column: span 4;  
}

.line{
    width: 70%;
    margin: 15px auto;
    height: 10px;
    background: black;
    border-radius: 9px;
}

.seats {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 10px;
    margin: 100px 200px;  
}
  
.grid-item {
    cursor: pointer;
    /* background-color: #ddd; */
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    width: 60px;
    text-align: center;
    justify-self: center;
}

.grid-item.selected {
    background: #3498db;
    color: white;
}

.betaalBtn{
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    color: white;
    font-weight: 700;
    font-size: 20px;
    background-color: #3498db;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}


.trailer{
    position: absolute;
    margin-left: -525px;
    margin-top: -530px;
}

.trailerBtnContainer{
    display: flex;
    justify-content: center;
}

.trailerBtn{
    cursor: pointer;
    width: 48%;
    margin-left: 29px;
    padding: 10px;
    color: white;
    background-color: #3498db;
    font-weight: 700;
    font-size: 20px;
    border: none;
    border-radius: 5px;
}

/* voor op laptop */
@media (max-width: 1540px) {
    .bodyMovieDetail{
        margin-left: 30px;
        margin-right: 45px;
    }
    .bodyMovieDetail p {
        font-size: 14px;
    }
    .movieInfo-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .projector{
        top: 18.7%;
        width: 370px;
        margin-left: 1078px;
        height: 646px;
    }

    .info{
        width: 600px;
    }

    .img img {   
        height: 620px; 
        width: 400px;
    }
}
</style>

