<template>
  <div class="flex items-center justify-center min-h-screen bg-[#DA70D6]">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">{{ $t('login') }}</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('email') }}</label>
          <input v-model="email" type="email" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('password') }}</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 border rounded" required>
        </div>
        <button type="submit" class="w-full bg-[#DA70D6] text-white py-2 rounded hover:bg-purple-600">{{ $t('login') }}</button>
      </form>
      <p class="text-center mt-4">
        {{ $t('noAccount') }} <router-link to="/signup" class="text-[#DA70D6]">{{ $t('signup') }}</router-link>
      </p>
      <div class="text-center mt-4">
        <button @click="toggleLanguage" class="text-gray-600">{{ $t('language') }}: {{ currentLang }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'

const { t, locale } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  const usernameFromEmail = email.value.split('@')[0] || email.value
  authStore.login({ username: usernameFromEmail, email: email.value }, 'dummy-token')
  router.push('/dashboard')
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'bn' : 'en'
}

const currentLang = computed(() => locale.value === 'en' ? t('english') : t('bangla'))
</script>