<template>
  <div class="flex items-center justify-center min-h-screen bg-[#DA70D6]">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">{{ $t('signup') }}</h1>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('name') }}</label>
          <input v-model="name" type="text" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('email') }}</label>
          <input v-model="email" type="email" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('password') }}</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 border rounded" required>
        </div>
        <button type="submit" class="w-full bg-[#DA70D6] text-white py-2 rounded hover:bg-purple-600">{{ $t('signup') }}</button>
      </form>
      <p class="text-center mt-4">
        {{ $t('haveAccount') }} <router-link to="/login" class="text-[#DA70D6]">{{ $t('login') }}</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')

const handleSignup = () => {
  // Mock signup
  authStore.login({ name: name.value, email: email.value })
  router.push('/choice')
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'bn' : 'en'
}

const currentLang = computed(() => locale.value === 'en' ? t('english') : t('bangla'))
</script>