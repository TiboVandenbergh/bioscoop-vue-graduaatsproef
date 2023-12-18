<template>
    <div class="ticket-detail">
      <div class="ticket-detail-content">
        <span class="closeBtn" @click="closeTicketDetail">&times;</span>
        <div>
          <p class="label">Film:</p>
          <b>{{ ticket.film }}</b>
        </div>
        <div>
          <p class="label">Datum:</p>
          <b>{{ ticket.datum }}</b>
        </div>
        <div>
          <p class="label">Tijd:</p>
          <b>{{ ticket.tijd }}</b>
        </div>
        <div>
          <p class="label">Duur:</p>
          <b>{{ ticket.speeltijd }} minuten</b>
        </div>
        <div>
          <p class="label">Prijs:</p>
          <b>€{{ ticket.totalePrijs }}</b>
        </div>
        <div>
          <p class="label">Zaal:</p>
          <b>{{ ticket.zaal }}</b>
        </div>
        <div>
          <p class="label">Aantal Tickets:</p>
          <b>{{ ticket.aantalTickets }}</b>
        </div>
        <div>
          <p class="label">Rij:</p>
          <b>{{ getRij(ticket.zitplaatsen) }}</b>
        </div>
        <div>
          <p class="label">Zitplaatsen:</p>
          <b>{{ ticket.zitplaatsen }}</b>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      ticket: Object,
      onClose: Function,
    },
    methods: {
      getRij(zitplaatsen) {
        return Math.ceil(parseInt(zitplaatsen) / 10);
      },
      closeTicketDetail() {
      this.$emit('onClose');
    },
    },
  };
  </script>
  
  <style scoped>
.ticket-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
 
 .ticket-detail-content {
  background: #fff;
  width: 450px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  background-color: white;
  color: black;
}
 
.closeBtn {
 position: absolute;
 top: 10px;
 right: 10px;
 cursor: pointer;
 font-size: 34px;
 color: #2F87C1;
}

.ticket-detail p {
  margin-bottom: 8px;
}

.ticket-detail-content .label {
  display: inline-block;
  width: 150px; 
  color: #132A9E;
  font-weight: bold;
}

  </style>
  