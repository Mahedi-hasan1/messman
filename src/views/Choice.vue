<template>
  <div class="flex items-center justify-center min-h-screen bg-[#DA70D6]">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <h1 class="text-2xl font-bold mb-6">{{ $t('welcome') }}</h1>
      <button @click="joinMess" class="block w-full bg-[#DA70D6] text-white py-3 rounded mb-4 hover:bg-purple-600">{{ $t('joinMess') }}</button>
      <button @click="createMess" class="block w-full bg-[#DA70D6] text-white py-3 rounded hover:bg-purple-600">{{ $t('createMess') }}</button>
      <div class="mt-6">
        <button @click="toggleLanguage" class="text-gray-600">{{ $t('language') }}: {{ currentLang }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const router = useRouter()

const joinMess = () => {
  // For now, go to dashboard
  router.push('/dashboard')
}

const createMess = () => {
  // For now, go to dashboard
  router.push('/dashboard')
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'bn' : 'en'
}

const currentLang = computed(() => locale.value === 'en' ? t('english') : t('bangla'))
</script>