<template>
  <div class="flex items-center justify-center min-h-screen bg-[#DA70D6]">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <h1 class="text-2xl font-bold mb-6">{{ $t('welcome') }}</h1>
      <div class="mb-4">
        <button @click="selectJoinMess" class="block w-full bg-[#DA70D6] text-white py-3 rounded mb-4 hover:bg-purple-600">{{ $t('joinMess') }}</button>
        <div v-if="selectedAction === 'join'" class="mt-4">
          <div class="mb-4">
            <label class="block text-gray-700">{{ inputLabel }}</label>
            <input v-model="inputValue" type="text" class="w-full px-3 py-2 border rounded" :placeholder="inputPlaceholder" required>
          </div>
          <button @click="handleSubmit" :disabled="!inputValue.trim()" class="w-full bg-[#DA70D6] text-white py-2 rounded hover:bg-purple-600 disabled:opacity-50">{{ $t('ok') }}</button>
          <div v-if="error && selectedAction === 'join'" class="mt-2 text-red-500">{{ error }}</div>
        </div>
      </div>

      <div class="mb-4">
        <button @click="selectCreateMess" class="block w-full bg-[#DA70D6] text-white py-3 rounded hover:bg-purple-600">{{ $t('createMess') }}</button>
        <div v-if="selectedAction === 'create'" class="mt-4">
          <div class="mb-4">
            <label class="block text-gray-700">{{ inputLabel }}</label>
            <input v-model="inputValue" type="text" class="w-full px-3 py-2 border rounded" :placeholder="inputPlaceholder" required>
          </div>
          <button @click="handleSubmit" :disabled="!inputValue.trim()" class="w-full bg-[#DA70D6] text-white py-2 rounded hover:bg-purple-600 disabled:opacity-50">{{ $t('ok') }}</button>
          <div v-if="error && selectedAction === 'create'" class="mt-2 text-red-500">{{ error }}</div>
        </div>
      </div>

      <div class="mt-6">
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

const selectedAction = ref('')
const inputValue = ref('')
const inputLabel = ref('')
const inputPlaceholder = ref('')
const error = ref('')
const loading = ref(false)

const selectJoinMess = () => {
  error.value = ''
  selectedAction.value = 'join'
  inputValue.value = ''
  inputLabel.value = t('joinCode')
  inputPlaceholder.value = t('enterJoinCode')
}

const selectCreateMess = () => {
  error.value = ''
  selectedAction.value = 'create'
  inputValue.value = ''
  inputLabel.value = t('messName')
  inputPlaceholder.value = t('enterMessName')
}

const handleSubmit = async () => {
  if (!inputValue.value.trim()) {
    error.value = t('requiredField')
    return
  }

  if (selectedAction.value === 'create') {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch('http://0.0.0.0:8080/messes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`
        },
        body: JSON.stringify({
          name: inputValue.value.trim()
        })
      })

      const data = await response.json()
      if (response.ok) {
        authStore.setMess(data)
        router.push('/dashboard')
      } else {
        error.value = data.error || t('createMessFailed')
      }
    } catch (err) {
      error.value = t('networkError')
    } finally {
      loading.value = false
    }
  } else {
    // TODO: Implement join mess API when available
    router.push('/dashboard')
  }
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'bn' : 'en'
}

const currentLang = computed(() => locale.value === 'en' ? t('english') : t('bangla'))
</script>