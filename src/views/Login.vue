<template>
    <div class="outerContainer">
      <form class="container" @submit.prevent="handleSubmit">
        <div class="header">
          <div class="text">{{ action }}</div>
        </div>
        <div class="inputs">
          <template v-if="action === 'Registreer'">
            <div>
              <div class="input">
                <img :src="person" alt="" />
                <input v-model="form.naam" type="text" placeholder="Naam" />
              </div>
              <p v-if="errors.naam" class="error">{{ errors.naam }}</p>
            </div>
          </template>
          <template v-if="action === 'Registreer'">
            <div>
            <div class="input">
              <img :src="person" alt="" />
              <input v-model="form.voorNaam" type="text" placeholder="Voornaam" />
            </div>
            <p v-if="errors.voorNaam" class="error">{{ errors.voorNaam }}</p>
          </div>
          </template>        
          <div>
            <div class="input">
              <img :src="email" alt="" />
              <input v-model="form.email" type="email" placeholder="Email" />
            </div>
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>
          <div>
            <div class="input">
                <img :src="password" alt="" />
              <input v-model="form.wachtwoord" type="password" placeholder="Wachtwoord" />
            </div>
            <p v-if="errors.wachtwoord" class="error">{{ errors.wachtwoord }}</p>
          </div>
        </div>
        <div class="toggle" @click="handleToggleAction">
          {{ action === 'Registreer' ? 'Al een account? Klik Hier' : 'Nog geen account? Klik Hier' }}
        </div>
        <div class="submitContainer">
          <button class="submit" type="submit">{{ action }}</button>
        </div>
      </form>
    </div>
  </template>

<script>
import * as Yup from 'yup';
import { createUser, loginUser } from '@/api';
import Notifications from '@/components/Notification.js';

export default {
  data() {
    return {
      password: require('../assets/password.png'),
      email: require('../assets/email.png'),
      person: require('../assets/person.png'),
      action: 'Login',
      showRegisterForm: false,
      form: {
        naam: '',
        voorNaam: '',
        email: '',
        wachtwoord: '',
      },
      errors: {},
      isLoggedIn: false,
      user: {},
    };
  },

  methods: {
    async handleSubmit() {
      const validationSchema = this.getValidationSchema();
      try {
        await validationSchema.validate(this.form, { abortEarly: false });

        // If valid, call the appropriate method based on the action
        if (this.action === 'Registreer') {
          await this.handleRegister();
        } else {
          await this.handleLogin();
        }
      } catch (errors) {
        // Update errors object
        this.errors = errors.errors.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
      }
    },
    getValidationSchema() {
      return Yup.object().shape({
        ...(this.showRegisterForm && {
          naam: Yup.string().required('Vul een naam in').trim(),
          voorNaam: Yup.string().required('Vul een voornaam in').trim(),
        }),
        email: Yup.string()
          .email('Vul een geldig e-mailadres in')
          .required('Vul een e-mailadres in')
          .trim()
          .lowercase(),
        wachtwoord: Yup.string().required('Vul een wachtwoord in').trim().min(4),
      });
    },
    async handleLogin() {
      try {
        const response = await loginUser(this.form);

        if (response.status === 201) {
          const userInitials = this.form.email.charAt(0) + this.form.email.charAt(1);
          this.$store.commit('setLoggedIn', true);
          this.$store.commit('setUserInitials', userInitials);

          Notifications({ tekst: "Login succesvol!", type: "success" })
          this.$router.push('/');
        }else {
          Notifications({ tekst: "Login mislukt", type: "error" })
      }
      } catch (error) {
        console.error('Error bij login', error);
      }
    },
    async handleRegister() {
        try {
        const response = await createUser(this.form);

        if (response.status === 201) {
          Notifications({ tekst: 'Registratie succesvol!', type: 'success' });
          this.handleToggleAction(); 
        }
        if(response.status === 409) {
          Notifications({ tekst: 'Registratie mislukt - Email al gebruikt', type: 'error' });
        }
      } catch (error) {
        console.error('Error bij registratie', error);
      }
    },
    handleToggleAction() {
      this.action = this.action === 'Registreer' ? 'Login' : 'Registreer';
      this.showRegisterForm = !this.showRegisterForm;
    },
  },
};
</script>

<style scoped>
.outerContainer {
    background-image: url(/src/assets/logoBackgound.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    height: 100vh;
}

.container {
    background: white;
    margin: auto;
    width: 600px;
    border-radius: 2%;
}

.header{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: -30px;
}

.text{
    color: blue;
    font-size: 48px;
    font-weight: bold;
}

.inputs{
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.input{
    display: flex;
    align-items: center;
    margin: auto;
    width: 480px;
    height: 80px;
    background-color: lightgray;
    border-radius: 6px;
}

.input img{
    margin: 0px 30px;   
}

.input input{
    height: 50px;
    width: 400px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 19px;
}

.toggle{
    padding-left: 62px;
    margin-top: 27px;
    color: chocolate;
    font-size: 18px;  
}

.toggle span{
    color: navy;
    cursor: pointer;
}

.submit{
    margin: 30px auto;  
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 60px;
    color: white;
    background: navy;
    border-radius: 50px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
}

.submitContainer{
    display: flex;
    justify-content: center;
    align-items: center;   
}


.link{
    text-decoration: none;
    /* width toevoegen zorgt ervoor dat als je alleen op de knop klikt dat het u doorstuurt naar de homepage en niet de area er rond (geen idee waarom but it works) */
    width: 0px;  
}

.error {
    position: absolute;
    margin-left: 547px;
    margin-top: -65px;
    background-color: crimson;
    color: white;
    padding: 15px;
    border: 1px solid white;
    border-radius: 5px;
  }
  
  /* pointer */
  .error::before {
    content: '';
    position: absolute;
    right: 100%;
    border-width: 10px;
    border-style: solid;
    border-color: transparent crimson transparent transparent;
  }
</style>