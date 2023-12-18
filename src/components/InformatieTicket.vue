<template>
    <div>
        
      <div class="infoTicket" ref="pdfRef">
        <h1>Informatie {{ zitplaatsenArray.length === 1 ? "Ticket" : "Tickets" }}</h1>
        <ul>
          <li>Te zien op: <b>{{ ticket.datum }}</b></li>
          <li>Begint om: <b>{{ ticket.tijd }}</b></li>
          <li>Zaal: <b>1</b></li>
          <li>Duur tijd: <b>120 minuten</b></li>
          <li>Aantal ticketen: <b>{{ ticket.aantalTickets }}</b></li>
          <li>Prijs: <b>€{{ ticket.totalePrijs }}</b></li>
          <h3>Uw {{ zitplaatsenArray.length === 1 ? "Zitplaats" : "Zitplaatsen" }}
            {{ zitplaatsenArray.length === 1 ? "is" : "zijn" }}</h3>
          <ul>
            <li v-for="(seat, index) in zitplaatsenArray" :key="index">
              <h3>Ticket {{ index + 1 }}:</h3>
              <ul>
                <li>Rij: <b>{{ getRij(seat) }}</b></li>
                <li>Stoel Nummer: <b>{{ seat }}</b></li>
              </ul>
            </li>
          </ul>
        </ul>
        <qrcode-vue :value="ticketUrl" :size="170" level="H" />
      </div>
      <div class="btnsInformatie">
        <h2>Overzicht van uw aankoop: zie profiel</h2>
        <button @click="naarProfiel">Naar Profiel</button>
        <button @click="downloadPDF">Download PDF</button>
      </div>
    </div>
  </template>
  
  <script>
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import { ref, onMounted, reactive, computed  } from 'vue';
  import QrcodeVue from 'qrcode.vue'
  import { getTicketById } from '@/api';
  import { useRouter   } from 'vue-router';

  export default {
    components: {
      QrcodeVue,      
    },
    props: {
    id: {
      type: String,
      required: true,
    },
  },
    setup(props) {
    const router= useRouter();
    const ticket = reactive({});
    const pdfRef = ref(null);
    const zitplaatsenArray = ref([]);

    const fetchTicket = async () => {
      const response = await getTicketById(props.id);
      Object.assign(ticket, response.data);

      zitplaatsenArray.value = ticket.zitplaatsen ? ticket.zitplaatsen.split(',') : [];
    };

    onMounted(() => {
      fetchTicket();
    });

  
      const getRij = (seat) => Math.ceil(seat / 10);
  
      const naarProfiel = () => {
        router.push('/profiel');
      };
  
      const downloadPDF = () => {
        const input = pdfRef.value;
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a5', true);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = 0;
          const imgY = 0;
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          pdf.save(`Ticket_${ticket.film}.pdf`);
        });
      };

      const ticketUrl = computed(() => `http://localhost:3000/ticket/${props.id}`);

      return {
        pdfRef,
        ticket,
        getRij,
        naarProfiel,
        zitplaatsenArray,
        downloadPDF,
        ticketUrl
      };
    }, 
  };
  </script>
  
  <style scoped>
 .infoTicket{
    padding: 20px;
    border: 2px solid navy;
    width: 500px;
    margin: 30px auto;
    text-align: center;    
    background-color: white;
}

.infoTicket ul{
    list-style-type: none;
    padding-left: 5px;  
   
}

.infoTicket ul li{
    margin-top: 10px;
}

.btnsInformatie{
    display: grid;
}

.btnsInformatie h2{
    text-align: center;
}

.btnsInformatie button{
    width: 120px; 
    margin: 10px auto;
    padding: 8px;
    color: white;
    background-color: #3498DB;
    cursor: pointer;
}
  </style>
  