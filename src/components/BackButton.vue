<template>
    <div style="margin-top: 10px;">
      <button
        v-bind="buttonProps"
        style="background-color: navy; color: white; width: 100px; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;"
        @click="navigateToHome"
      >
        Terug
      </button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToHome() {
        this.$router.push("/");
      },
    },
    props: {
      buttonProps: Object,
    },
  };
  </script>