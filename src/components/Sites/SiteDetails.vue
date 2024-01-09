<template>
  <section>
    <div v-if="siteDetails">
      <button class="back-button" @click="goBack">Back to Sites</button>
      <h2>Site Details for {{ siteDetails.title }}</h2>
      <p>Title: {{ siteDetails.title }}</p>
      <p>Address: {{ siteDetails.address.city }}, {{ siteDetails.address.country }}</p>
      <p>Main contact: {{ siteDetails.contacts.main.firstName }}</p>
    </div>
    <div v-else>
      <p>Loading site details...</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteService from '../../services/SiteService'

interface Site {
  id: string
  title: string
  images: string[]
  address: {
    city: string
    country: string
  }
  contacts: {
    main: {
      firstName: string
    }
  }
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const siteDetails = ref<Site | null>(null)

    onMounted(async () => {
      const siteId = route.params.id as string
      try {
        siteDetails.value = await SiteService.getSite(siteId)
      } catch (error) {
        console.error('Failed to fetch site details:', error)
      }
    })

    const goBack = () => {
      router.back()
    }

    return { siteDetails, goBack }
  }
})
</script>

<style>
.back-button {
  padding: 10px 15px;
  margin-top: 20px;
  margin-bottom: 15px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #e0e0e0;
}
</style>
