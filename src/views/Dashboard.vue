<template>
  <div class="min-h-screen bg-white">
    <header class="bg-[#DA70D6] text-white p-4 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold">{{ $t('dashboard') }}</h1>
      </div>
      <div class="text-right">
        <p class="font-semibold">{{ user?.username || $t('guest') }}</p>
        <button @click="logout" class="mt-2 bg-white text-[#DA70D6] px-4 py-2 rounded">{{ $t('logout') }}</button>
      </div>
    </header>
    <main class="p-8">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">{{ mess?.name || $t('noMessYet') }}</h2>
      </div>

      <section>
        <h3 class="text-lg font-semibold mb-3">{{ $t('members') }}</h3>
        <div v-if="mess && mess.members && mess.members.length" class="space-y-4">
          <div v-for="member in mess.members" :key="member.ID || member.id" class="p-4 border rounded shadow-sm">
            <p class="font-semibold">{{ member.user?.username || member.user?.email || $t('unknownMember') }}</p>
            <p>{{ $t('role') }}: {{ member.role }}</p>
            <p>{{ $t('phoneNumber') }}: {{ member.user?.phone_number || '-' }}</p>
          </div>
        </div>
        <p v-else class="text-gray-600">{{ $t('noMembers') }}</p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const mess = computed(() => authStore.mess)

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>