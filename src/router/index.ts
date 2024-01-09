import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SiteDetails from '../components/Sites/SiteDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/site/:id',
      name: 'SiteDetails',
      component: SiteDetails,
      props: true
    }
  ]
})

export default router
