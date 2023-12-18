<template>
    <div class="bodyProfiel">
      <BackButton />
      <h1>Tickets van user:</h1>
      <div class="ticket-container" style="margin-bottom: 138.5px;">
        <div v-if="userTickets.length === 0" class="noTicketResults">
          Geen Tickets gevonden
        </div>
        <div v-else v-for="ticket in userTickets" :key="ticket.id" class="ticket" @click="handleTicketClick(ticket)">
          <p class="cirkelLinks"></p>
          <p class="cirkelRechts"></p>
          <img class="ticket-image" :src="ticket.thumbnail" />
          <p>{{ ticket.film }}</p>
          <p>{{ ticket.datum }} om {{ ticket.tijd }}</p>
          <p>Zaal: {{ ticket.zaal }} - {{ ticket.zitplaatsen }}</p>
        </div>
      </div>
      <TicketDetail v-if="selectedTicket" :ticket="selectedTicket" @onClose="handleTicketClose" />
    </div>
  </template>
  
  <script>
 import BackButton from '../components/BackButton.vue';
  import TicketDetail from '../components/TicketDetail.vue';
  import { ref, onMounted } from 'vue';
  import { getTickets } from '../api';

  
  export default {
    components: {
      BackButton,
      TicketDetail,
    },
    setup() {
      const userTickets = ref([]);
      const selectedTicket = ref(null);
  
      const fetchTickets = async () => {
        const tickets = await getTickets([]);
        userTickets.value = tickets.data;
      };
  
      const handleTicketClick = (ticket) => {
        selectedTicket.value = ticket;
      };
  
      const handleTicketClose = () => {
        selectedTicket.value = null;
      };
  
      onMounted(() => {
        fetchTickets();
      });
  
      return {
        userTickets,
        selectedTicket,
        handleTicketClick,
        handleTicketClose,
      };
    },
  };
  </script>
  
  <style scoped>
.ticket-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 50px;
    gap: 100px;
}

 .ticket {
    border-radius: 2%;
    width: 300px;
    height: 400px;
    margin-bottom: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: #1A1110;
    color: white;
    text-align: center;
    border-radius: 10%;
    cursor: pointer;
} 

.ticket-image {
    height: 275px;
    width: 100%;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
}

.cirkelLinks, .cirkelRechts{
    position: absolute;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: #cfcfcf;
    margin-top: 112px;
    cursor: auto;
}

.cirkelLinks{
    margin-left: -70px;
}

.cirkelRechts{
    margin-left: 265px;
}

.noTicketResults {
    font-size: 48px;
    grid-column: span 4;
    text-align: center; 
    margin: 173.5px auto;
}  

.bodyProfiel{
    margin-left: 50px;
}


/* voor op laptop */
@media (max-width: 1540px) {
    .ticket-container {
        grid-template-columns: repeat(3, 1fr);
        margin-left: 60px;
    }

    .noTicketResults {
        margin: 74.8px auto;
        font-size: 36px;
    }
}
  </style>
  