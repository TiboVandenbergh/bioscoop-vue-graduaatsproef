<template>
    <div>
      <iframe
        title="trailer"
        width="1330"
        height="715"
        :src="embedURL"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      trailerID: String,
    },
    computed: {
      embedURL() {
        if (!this.trailerID) {
          return '';
        }
        return `https://www.youtube.com/embed/${this.trailerID}`;
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  