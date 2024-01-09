<template>
  <section class="wrapper">
    <div class="site-content">
      <h1>Sites</h1>
      <input v-model="filter" type="text" placeholder="Filter sites..." class="filter-input" />
      <div class="site-list" @scroll="handleScroll">
        <div
          v-for="site in displayedSites"
          :key="site.id"
          class="site-card"
          @click="goToSite(site.id)"
        >
          <img :src="site.images[0]" alt="" class="site-image" />
          <div class="site-info">
            <h3 class="site-name">{{ site.title }}</h3>
            <p class="site-address">
              <span>Address:</span> {{ site.address.city }}, {{ site.address.country }}
            </p>
            <p class="site-contact">
              <span>Main contact:</span> {{ site.contacts.main.firstName }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import SiteService from '../../services/SiteService'
import { useRouter } from 'vue-router'

interface Site {
  id: number
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
  tags: string[]
}

export default defineComponent({
  name: 'SitesList',

  setup() {
    const allSites = ref<Site[]>([])
    const currentPage = ref(1)
    const pageSize = 21
    const filter = ref('')

    const router = useRouter()

    const goToSite = (id: number) => {
      router.push({ name: 'SiteDetails', params: { id } })
    }

    const fetchSites = async () => {
      try {
        const fetchedSites = await SiteService.fetchSites()
        allSites.value = fetchedSites
      } catch (error) {
        console.error('Failed to fetch sites:', error)
      }
    }

    onMounted(fetchSites)

    const filteredSites = computed(() => {
      if (!filter.value) {
        return allSites.value
      }
      return allSites.value.filter(
        (site) =>
          site.title.toLowerCase().includes(filter.value.toLowerCase()) ||
          site.address.city.toLowerCase().includes(filter.value.toLowerCase()) ||
          site.tags.some((tag) => tag.toLowerCase().includes(filter.value.toLowerCase()))
      )
    })

    const displayedSites = computed(() => {
      const endIndex = currentPage.value * pageSize
      return filteredSites.value.slice(0, endIndex)
    })

    const handleScroll = (event: Event) => {
      const element = event.target as HTMLElement
      if (element.scrollHeight - element.scrollTop <= element.clientHeight + 5) {
        if (currentPage.value * pageSize < filteredSites.value.length) {
          currentPage.value++
        }
      }
    }

    return { displayedSites, handleScroll, filter, goToSite }
  }
})
</script>

<style scoped>
.site-content {
  padding: 10px;
}
.site-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  max-height: calc(100vh - 210px);
  margin-top: 50px;
  overflow-y: auto;
}

.site-card {
  cursor: pointer;
  width: calc(33% - 20px);
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
}

.site-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.site-info {
  padding: 15px;
}

.site-name {
  font-size: 1.2em;
  margin: 0 0 10px 0;
}

.filter-input {
  width: 40%;
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1em;
}

.span {
  font-weight: bold;
}

.site-address,
.site-contact {
  font-size: 1em;
  margin: 0;
}

@media (max-width: 768px) {
  .site-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .site-card {
    width: 100%;
  }
}
</style>
