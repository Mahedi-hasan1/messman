<template>
  <div class="flex items-center justify-center min-h-screen bg-[#DA70D6]">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">{{ $t('signup') }}</h1>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('username') }} *</label>
          <input v-model="username" type="text" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('email') }}</label>
          <input v-model="email" type="email" class="w-full px-3 py-2 border rounded" :class="{ 'border-red-500': email && !isValidEmail }">
          <div v-if="email && !isValidEmail" class="text-red-500 text-sm mt-1">{{ $t('invalidEmail') }}</div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('phoneNumber') }}</label>
          <input v-model="phoneNumber" type="text" class="w-full px-3 py-2 border rounded" :class="{ 'border-red-500': phoneNumber && !isValidPhoneNumber }">
          <div v-if="phoneNumber && !isValidPhoneNumber" class="text-red-500 text-sm mt-1">{{ $t('invalidPhoneNumber') }}</div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('password') }} *</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 border rounded" required>
        </div>
         <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>
        <button type="submit" :disabled="loading || !isFormValid" class="w-full bg-[#DA70D6] text-white py-2 rounded hover:bg-purple-600 disabled:opacity-50">
          {{ loading ? $t('signingUp') : $t('signup') }}
        </button>
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

const username = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

const isValidPhoneNumber = computed(() => {
  const phoneRegex = /^\d{11}$/
  return phoneRegex.test(phoneNumber.value)
})

const isFormValid = computed(() => {
  // Username and password are required
  if (!username.value.trim() || !password.value.trim()) {
    return false
  }
  
  // If email is provided, it must be valid
  if (email.value && !isValidEmail.value) {
    return false
  }
  
  // If phone number is provided, it must be valid
  if (phoneNumber.value && !isValidPhoneNumber.value) {
    return false
  }
  
  return true
})

const handleSignup = async () => {
  if (!isFormValid.value) {
    return
  }
  
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('http://0.0.0.0:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value.trim(),
        email: email.value || null,
        phone_number: phoneNumber.value || null,
        password: password.value
      })
    })

    const data = await response.json()

    if (response.ok) {
      authStore.login(data.user, data.token)
      // Success - redirect to choice page
      router.push('/choice')
    } else {
      // Error
      error.value = data.error || 'Signup failed'
    }
  } catch (err) {
    error.value = 'Network error. Please try again.'
  } finally {
    loading.value = false
  }
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'bn' : 'en'
}

const currentLang = computed(() => locale.value === 'en' ? t('english') : t('bangla'))
</script>