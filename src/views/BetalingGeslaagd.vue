<template>
    <div>
      <h1 style="text-align: center; margin-top: 40px">
        Betaling geslaagd voor de film: {{ $route.params.title }}
      </h1>
      <InformatieTicket :id="$route.params.id" />
      <h1 style="text-align: center">Veel Kijkplezier!</h1>
    </div>
  </template>
  
  <script>
  import InformatieTicket from '@/components/InformatieTicket';
  
  export default {
    components: {
      InformatieTicket,    
    },
  };
  </script>
  