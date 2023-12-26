import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import MovieDetail from '../views/MovieDetail.vue'
import BetalingGeslaagd from '../views/BetalingGeslaagd.vue'
import Profiel from '../views/Profiel.vue'
import { verifyUser } from '@/api'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: HomeView,
      navbar: NavBar,
      footer: Footer,
    }, 
  },
  {
    path: '/movieDetail/:title',
    name: 'movieDetail',
    components: {
      default: MovieDetail,
      navbar: NavBar,
      footer: Footer,
    },
  },
  {
    path: '/movieDetail/:title/betalingGeslaagd/:id',
    name: 'betalingGeslaagd',
    components: {
      default: BetalingGeslaagd,
      navbar: NavBar,
      footer: Footer,
    },
  },
  {
    path: '/profiel',
    name: 'profiel',
    components: {
      default: Profiel,
      navbar: NavBar,
      footer: Footer,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
