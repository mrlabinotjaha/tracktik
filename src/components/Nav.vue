<template>
  <nav>
    <ul>
      <li v-for="item in navItems" :key="item.id">
        <a :href="item.url">{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NavComponent',
  setup() {
    const navItems = ref([
      { id: 1, label: 'Home', url: '/' },
      { id: 2, label: 'About', url: '/about' },
      { id: 3, label: 'Contact', url: '/contact' }
    ])

    return { navItems }
  }
})
</script>

<style scoped>
nav {
  background-color: #f0f0f0;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #333;
}
</style>
