<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated>
      <AppNavbar />
    </q-header>

    <!-- Page Container -->
    <q-page-container>
      <!-- Loading Indicator -->
      <div v-if="!isAuthReady" class="row items-center justify-center q-my-md">
        <q-spinner color="primary" />
        <span class="q-ml-sm">Loading...</span>
      </div>
      <!-- Router View -->
      <div v-else>
        <router-view />
      </div>
    </q-page-container>

    <!-- Footer (Bottom Navbar) -->
    <q-footer elevated>
      <q-tabs v-model="currentTab" align="justify" dense class="text-grey-8 bg-white" no-caps>
        <q-route-tab
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
          :label="tab.label"
          :icon="tab.icon"
          :to="tab.to"
          ripple
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import { useUserStore } from '../stores'

export default {
  name: 'MainLayout',
  components: {
    AppNavbar,
  },
  setup() {
    const userStore = useUserStore()
    const isAuthReady = computed(() => userStore.isAuthReady)
    const route = useRoute()
    const currentTab = ref(route.name || 'MyCollection')

    // Tabs data
    const tabs = [
      { name: 'MyCollection', label: 'Collection', icon: 'collections', to: '/MyCollection' },
      { name: 'WishlistUser', label: 'Wishlist', icon: 'favorite', to: '/wishlist' },
      { name: 'SetsUser', label: 'Sets', icon: 'card_membership', to: '/sets' },
      { name: 'ProfileUser', label: 'Profile', icon: 'person', to: '/profile' },
      { name: 'Scan', label: 'Scan', icon: 'camera_alt', to: '/scan' },
    ]

    // Opdater currentTab når ruten ændres
    watch(
      () => route.name,
      (newName) => {
        currentTab.value = newName
      },
    )

    return {
      isAuthReady,
      currentTab,
      tabs,
    }
  },
}
</script>

<style scoped>
/* Ingen custom CSS nødvendig; vi bruger kun Quasars eget design */
</style>
