<template>
    <div>
      <template v-if="isLoggedIn">
        <div class="dropdown" @mouseleave="handleMouseLeave">
          <button @click="toggleDropdown" class="dropdownBtn">
            {{ userInitials  }}
          </button>
          <template v-if="showDropdown">
            <div class="dropdown-content">
              <p @click="goToProfile">Profiel</p>
              <p @click="handleLogout">Logout</p>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <button class="loginBtn" @click="handleLogin">Log In</button>
      </template>
    </div>
  </template>
  
  <script>
  import Notifications from './Notification.js';
  import { logoutUser } from '@/api';
  export default {
    computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    userInitials() {
      return this.$store.state.userInitials;
    },
  },
  data() {
    return {
      user: {},
      showDropdown: false,
    };
  },
    methods: {
      handleLogin() {
        this.$router.push('/login');
      },
      async handleLogout() {
        const confirmatie = window.confirm("Ben je zeker dat je wilt uitloggen?");
        if (!confirmatie) {
          return;
        }

        try {
        const response = await logoutUser();

        if (response.status === 200) {
            Notifications({ tekst: "Succesvol uitgelogd", type: "success" });
            this.$store.commit('setLoggedIn', false);
            this.$router.push('/');

        }else{
            Notifications({ tekst: "Uitloggen mislukt", type: "error" });
        }
 
      } catch (error) {
        console.error("Fout bij uitloggen:", error);
      }
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      handleMouseLeave() {
        this.showDropdown = false;
      },
      goToProfile() {
        this.$router.push('/profiel');
      },
    },
  };
  </script>
  
  <style scoped>
  /* login btn */
   
  .loginBtn {
    padding: 10px;
  }
    
  .loginBtn:hover {
    background-color: white;
    color: #3498DB;
  }

  /* gezamelijke css */

  .loginBtn, .dropdownBtn{
    color: #fff; 
    background-color: #3498DB; 
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    border-radius: 10%;
  }


  /* dropdownbox */  
  .dropdownBtn {
    padding: 12px 34.5px; 
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: white;   
    border: 1px solid navy;
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
    z-index: 1;
  }
  
  .dropdown-content p {
    padding: 0 18px;
    text-align: center;   
    text-decoration: none;
    color: #3498DB;
    font-weight: 700;
    cursor: pointer;
  }

  .dropdown-content p:hover{
    text-decoration: underline;
  }

  .dropdownBtn:hover {
    background: #2f87c1;
  }
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
  </style>
  