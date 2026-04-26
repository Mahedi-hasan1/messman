<template>
  <div class="min-h-screen bg-white">
    <header class="bg-[#DA70D6] text-white p-4">
      <h1 class="text-xl font-bold">{{ $t('dashboard') }}</h1>
      <button @click="logout" class="float-right bg-white text-[#DA70D6] px-4 py-2 rounded">Logout</button>
    </header>
    <main class="p-8">
      <p>{{ $t('welcomeDashboard') }}</p>
      <!-- Dashboard content will be added later -->
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>